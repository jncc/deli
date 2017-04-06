
declare module "random-key";

// declare my own types for leaflet-editable plugin
// @types/leaflet-editable currently causes compile errors
declare namespace L {
    interface MapOptions {
        editable: boolean;
    }
    interface Rectangle {
        enableEdit();
    }
}
