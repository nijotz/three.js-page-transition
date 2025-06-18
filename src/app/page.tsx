import Gallery from "@/app/components/Gallery";

// The toolbar links to /home, not the bare basePath root: GitHub Pages
// 301-redirects the extension-less root (/three.js-page-transition ->
// /three.js-page-transition/) and that redirect forces a full page reload that
// breaks the persistent-canvas transitions. The root still renders the gallery
// so the shared URL shows content; navigation between views always targets
// /home and /cubes/<id>, which are flat .html files served without a redirect.
export default function Page() {
  return <Gallery />;
}
