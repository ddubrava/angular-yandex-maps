import { InjectionToken } from '@angular/core';

import { YaConfig } from '../models/ya-config';

/**
 * Injection token to specify configuration.
 */
export const YA_CONFIG = new InjectionToken<YaConfig>('YA_CONFIG');
