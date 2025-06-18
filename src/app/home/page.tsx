import Gallery from "@/app/components/Gallery";

// Canonical landing route. Lives off the basePath root so the toolbar's "Home"
// link navigates client-side without hitting GitHub Pages' root 301 redirect.
export default function Page() {
  return <Gallery />;
}
