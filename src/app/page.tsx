'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading scene...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>

      <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
        <Scene />
      </div>
    </div>
  );
}
