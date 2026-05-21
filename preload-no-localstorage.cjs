// Node 22+ exposes a partial `localStorage` global. @typescript/vfs sees
// `typeof localStorage !== "undefined"` and then calls `localStorage.getItem`,
// which throws because the methods aren't usable without --localstorage-file.
// Strip it before any module loads.
try { delete globalThis.localStorage; } catch {}
try { delete globalThis.sessionStorage; } catch {}
