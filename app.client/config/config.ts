
/** This file gets overwritten in a production build with one of the
 *  tenant-specific config in this directory */

import { ClientConfig } from './ClientConfig'

// feel free to change the below import to switch between tenant configs at dev time
import { config as c}  from './config.lidar'

export const config: ClientConfig = c
