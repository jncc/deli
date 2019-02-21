
/** This file gets overwritten in a production build with one of the
 *  tenant-specific config files in this directory */

// (The tenant style config could be slightly simpler if
// we could get webpack / less @imports working - for now,
// it works by swapping the tenant typescript file for this one)

// feel free to change the below import to switch between tenant configs at dev time
import './config.lidar.less'
