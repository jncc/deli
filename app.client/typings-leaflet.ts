
// we seem to currently need a separate typings file to satisfy typescript

import * as L from 'leaflet'

declare module 'leaflet' {

  interface ControlStatic {
    Fullscreen: any
  }
}
