import { NgZone } from '@angular/core';
import { EventManager } from './event-manager';

/** Imitates a Yandex Maps event target and keeps track of the registered events. */
class TestEventTarget {
  currentEvents = new Map<string, Set<() => void>>();

  events = {
    add: jasmine.createSpy('add').and.callFake((name: string, listener: () => void) => {
      if (!this.currentEvents.has(name)) {
        this.currentEvents.set(name, new Set());
      }

      this.currentEvents.get(name)!.add(listener);

      return { remove: () => this.currentEvents.get(name)!.delete(listener) };
    }),
  } as any;

  triggerListeners(name: string) {
    const listeners = this.currentEvents.get(name);

    if (!listeners) {
      throw Error(`No listeners registered for "${name}" event.`);
    }

    listeners.forEach((listener) => listener());
  }
}

describe('EventManager', () => {
  let dummyZone: NgZone;
  let manager: EventManager;
  let target: TestEventTarget;

  beforeEach(() => {
    dummyZone = {
      run: jasmine.createSpy('NgZone.run').and.callFake((callback: () => void) => callback()),
    } as unknown as NgZone;

    target = new TestEventTarget();
    manager = new EventManager(dummyZone);

    // Need to define window.ymaps as we return it in YaEvent
    (window.ymaps as any) = {};
  });

  afterEach(() => {
    manager.destroy();
    (window.ymaps as any) = undefined;
  });

  it('should register a listener when subscribing to an event', () => {
    expect(target.events.add).not.toHaveBeenCalled();

    manager.setTarget(target);
    const stream = manager.getLazyEmitter('click');

    expect(target.events.add).not.toHaveBeenCalled();
    expect(target.currentEvents.get('click')).toBeFalsy();

    const subscription = stream.subscribe();
    expect(target.events.add).toHaveBeenCalledTimes(1);
    expect(target.currentEvents.get('click')?.size).toBe(1);
    subscription.unsubscribe();
  });

  it('should register a listener if the subscription happened before there was a target', () => {
    const stream = manager.getLazyEmitter('click');
    const subscription = stream.subscribe();

    expect(target.events.add).not.toHaveBeenCalled();
    expect(target.currentEvents.get('click')).toBeFalsy();

    manager.setTarget(target);

    expect(target.events.add).toHaveBeenCalledTimes(1);
    expect(target.currentEvents.get('click')?.size).toBe(1);
    subscription.unsubscribe();
  });

  it('should remove the listener when unsubscribing', () => {
    const stream = manager.getLazyEmitter('click');
    const subscription = stream.subscribe();
    manager.setTarget(target);
    expect(target.currentEvents.get('click')?.size).toBe(1);

    subscription.unsubscribe();
    expect(target.currentEvents.get('click')?.size).toBe(0);
  });

  it('should remove the listener when the manager is destroyed', () => {
    const stream = manager.getLazyEmitter('click');
    stream.subscribe();
    manager.setTarget(target);
    expect(target.currentEvents.get('click')?.size).toBe(1);

    manager.destroy();
    expect(target.currentEvents.get('click')?.size).toBe(0);
  });

  it('should remove the listener when the target is changed', () => {
    const stream = manager.getLazyEmitter('click');
    stream.subscribe();
    manager.setTarget(target);
    expect(target.currentEvents.get('click')?.size).toBe(1);

    manager.setTarget(undefined!);
    expect(target.currentEvents.get('click')?.size).toBe(0);
  });

  it('should trigger the subscription to an event', () => {
    const spy = jasmine.createSpy('subscription');
    const stream = manager.getLazyEmitter('click');
    stream.subscribe(spy);
    manager.setTarget(target);
    expect(spy).not.toHaveBeenCalled();

    target.triggerListeners('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to register multiple listeners to the same event', () => {
    const firstSpy = jasmine.createSpy('subscription one');
    const secondSpy = jasmine.createSpy('subscription two');
    const stream = manager.getLazyEmitter('click');
    manager.setTarget(target);
    stream.subscribe(firstSpy);
    stream.subscribe(secondSpy);
    expect(firstSpy).not.toHaveBeenCalled();
    expect(secondSpy).not.toHaveBeenCalled();
    expect(target.currentEvents.get('click')?.size).toBe(2);

    target.triggerListeners('click');
    expect(firstSpy).toHaveBeenCalledTimes(1);
    expect(secondSpy).toHaveBeenCalledTimes(1);
  });

  it('should run listeners inside the NgZone', () => {
    const spy = jasmine.createSpy('subscription');
    const stream = manager.getLazyEmitter('click');
    stream.subscribe(spy);
    manager.setTarget(target);
    expect(dummyZone.run).not.toHaveBeenCalled();

    target.triggerListeners('click');
    expect(dummyZone.run).toHaveBeenCalledTimes(1);
  });

  it('should maintain subscriptions when swapping out targets', () => {
    const spy = jasmine.createSpy('subscription');
    const stream = manager.getLazyEmitter('click');
    stream.subscribe(spy);
    manager.setTarget(target);
    expect(spy).not.toHaveBeenCalled();

    target.triggerListeners('click');
    expect(spy).toHaveBeenCalledTimes(1);

    const alternateTarget = new TestEventTarget();
    manager.setTarget(alternateTarget);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(target.currentEvents.get('click')?.size).toBe(0);
    expect(alternateTarget.currentEvents.get('click')?.size).toBe(1);

    alternateTarget.triggerListeners('click');
    expect(spy).toHaveBeenCalledTimes(2);

    manager.setTarget(undefined!);
    expect(alternateTarget.currentEvents.get('click')?.size).toBe(0);

    alternateTarget.triggerListeners('click');
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
