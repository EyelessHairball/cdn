const f = document.getElementById("fileInput"),
  g = document.getElementById("generateBtn"),
  u = document.getElementById("generatedUrl"),
  c = document.getElementById("fileContent"),
  MAX = 40 * 1024;
const p = new URLSearchParams(window.location.search),
  d = p.get("data"),
  n = p.get("filename") || "file.txt";
if (d) {
  try {
    c.textContent = LZString.decompressFromEncodedURIComponent(d);
  } catch (e) {
    c.textContent = "Error decoding file: " + e.message;
  }
}
g.onclick = () => {
  const e = f.files[0];
  if (!e) return alert("Select a file first!");
  if (e.size > MAX) return alert(`File too large! Max ${MAX / 1024} KB.`);
  const r = new FileReader();
  (r.onload = () => {
    const t = r.result,
      s = LZString.compressToEncodedURIComponent(t),
      l = `${window.location.origin}${
        window.location.pathname
      }?data=${s}&filename=${encodeURIComponent(e.name)}`;
    u.innerHTML = `<a href="${l}" target="_blank">Copy / Open URL</a>`;
    console.log(l);
  }),
    r.readAsText(e);
};