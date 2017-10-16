import { Modal } from 'semantic-ui-react';


//import * as L from 'leaflet';


//    new L.Control.Fullscreen({ position: 'topright' }).addTo(map)

// declare my own types for leaflet-fullscreen plugin
// declare namespace L {
//   // class FullscreenControl {
//   //   constructor(options?: any);
//   // }
//   // export interface Control {
//   //   blah(): any
//   //   Fullscreen(options?: any): Control
//   // }


//   namespace Control {
//     export interface ZoomStatic2 extends ControlStatic {
//         new (options?: any): number;
//     }
//   }
// }


// declare my own types for leaflet-fullscreen plugin
// declare namespace L {
//   namespace Control {
//       export interface Fullscreen {
//           constructor(options?: any): Control
//       }
//   }
// }

declare namespace L {
  export interface Control {
  }
}

// declare module L {
//   export class MyControl extends Control{
//     foo: () => {}
//     bindLabel(name: string, options: any): CircleMarker;
//   }
// }


declare module L {

  namespace Map {
    interface MapOptions {
        blah?: boolean;
    }
}

}

