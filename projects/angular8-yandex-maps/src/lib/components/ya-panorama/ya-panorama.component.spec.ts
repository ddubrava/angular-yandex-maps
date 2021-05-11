import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { YaPanoramaComponent } from './ya-panorama.component';
import { ScriptService } from '../../services/script/script.service';

describe('YaPanoramaComponent', () => {
  let component: YaPanoramaComponent;
  let fixture: ComponentFixture<YaPanoramaComponent>;

  beforeEach(async () => {
    const scriptServiceStub = {
      initScript: () => new Observable((s) => s.next()),
    };

    await TestBed.configureTestingModule({
      declarations: [YaPanoramaComponent],
      providers: [{ provide: ScriptService, useValue: scriptServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YaPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
