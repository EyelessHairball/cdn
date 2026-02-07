const f = document.getElementById("fileInput"),
  g = document.getElementById("generateBtn"),
  u = document.getElementById("generatedUrl"),
  p = document.getElementById("preview");
const MAX = 40 * 1024;
const params = new URLSearchParams(window.location.search),
  d = params.get("data"),
  n = params.get("filename") || "file.bin";

if (d) {
  try {
    const decoded = LZString.decompressFromEncodedURIComponent(d);
    const dataUrl = `data:application/octet-stream;base64,${decoded}`;
    if (
      n.endsWith(".png") ||
      n.endsWith(".jpg") ||
      n.endsWith(".jpeg") ||
      n.endsWith(".gif")
    ) {
      p.src = dataUrl;
    } else {
      u.textContent = decoded;
    }
  } catch (e) {
    u.textContent = "Error decoding file: " + e.message;
  }
}

g.onclick = () => {
  const file = f.files[0];
  if (!file) return alert("Select a file first!");
  if (file.size > MAX) return alert(`File too large! Max ${MAX / 1024} KB.`);
  const r = new FileReader();
  r.onload = () => {
    const base64 = btoa(
      r.result
        .split("")
        .map((c) => String.fromCharCode(c.charCodeAt(0) & 0xff))
        .join("")
    );
    const compressed = LZString.compressToEncodedURIComponent(base64);
    const url = `${window.location.origin}${
      window.location.pathname
    }?data=${compressed}&filename=${encodeURIComponent(file.name)}`;
    u.innerHTML = `<a href="${url}" target="_blank">Copy / Open URL</a>`;
  };
  r.readAsBinaryString(file);
};
