// lucide-react 1.16.0 declares a "typings" entry that is not shipped in the
// package, so TypeScript cannot resolve its types. This ambient declaration
// keeps the build type-checking; the icons remain fully functional at runtime.
declare module "lucide-react";
