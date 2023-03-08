import {InjectionToken} from '@angular/core';

import {YaConfig} from '../interfaces/ya-config';

/**
 * An injection token to specify a configuration.
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
