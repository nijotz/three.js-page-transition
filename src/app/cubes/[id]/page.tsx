import CubePage from './CubePage';

// The cubes are hard-coded to ids 1, 2 and 3 in the root layout, so emit a
// static page for each when exporting for GitHub Pages.
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function Page() {
  return <CubePage />;
}
