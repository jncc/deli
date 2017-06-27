
/** This file gets overwritten in a production build with one of the
 *  tenant-specific data files in this directory */

import { ProductCollection } from './../handlers/products/models'

// feel free to change the below import to switch between tenant data at dev time
import { collections as c } from './data.lidar'

export const collections: ProductCollection[] = c
