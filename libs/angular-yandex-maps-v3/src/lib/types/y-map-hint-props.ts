import type { YMapFeature, YMapHotspot, YMapMarker } from '@yandex/ymaps3-types/imperative';

/**
 * Typings do not export this type, but it's used in a YMapHint component.
 * For now, define it here. Maybe later they will export it.
 * @internal
 */
export type YMapHintProps = {
  hint: (object: YMapFeature | YMapMarker | YMapHotspot | undefined) => unknown;
};
