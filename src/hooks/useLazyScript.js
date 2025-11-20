// Simple lazy script loader. Returns a Promise that resolves when loaded.
export default function useLazyScript(src, id) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    if (id && document.getElementById(id)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    if (id) s.id = id;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}
