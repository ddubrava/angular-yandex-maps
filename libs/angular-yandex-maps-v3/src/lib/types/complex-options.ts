import { GenericEntity, GenericRootEntity } from '@yandex/ymaps3-types/imperative/Entities';

/**
 * Typings do not export this type but use it in many places.
 * For now, define it here. Maybe later they will export it.
 * @internal
 */
export interface ComplexOptions<
  Root extends GenericRootEntity<unknown> = GenericRootEntity<unknown>,
> {
  children?: GenericEntity<unknown, object, Root>[];
  container?: boolean;
}
