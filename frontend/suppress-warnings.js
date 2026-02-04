// Suppress SafeAreaView deprecation warning that crashes NativeWind
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('SafeAreaView has been deprecated')) {
    return;
  }
  originalWarn.apply(console, args);
};
