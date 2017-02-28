
// allow compilation of window.fetch until polyfilled
// https://github.com/Microsoft/TypeScript/issues/4948
declare function fetch(any): any;

// @typings/query-string type definitions are currently incorrect (too restrictive)
declare module "query-string";
