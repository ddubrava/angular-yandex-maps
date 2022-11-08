import { InjectionToken } from '@angular/core';

import { YaConfig } from '../models/ya-config';

/**
 * Injection token to specify configuration.
 *
 * ```ts
 *  NgModule({
 *   providers: [
 *     {
 *       provide: YA_CONFIG,
 *       useValue: {
 *         apikey: null,
 *         lang: 'ru_RU',
 *       },
 *     },
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
export const YA_CONFIG = new InjectionToken<YaConfig>('YA_CONFIG');
