import "@testing-library/jest-dom";

globalThis.__CBT_STATE__ = globalThis.__CBT_STATE__ ?? {
  users: new Map(),
  tokens: new Map()
};

export {};
