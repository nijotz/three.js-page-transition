'use client';

import Scene from '@/app/components/Scene';

export default function Sub() {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-2">
        <h1 className="text-4xl font-bold text-gray-900">Sub Page</h1>
      </div>
      <div className="flex-1">
        <div className="w-full h-full bg-gray-100 overflow-hidden">
          <Scene />
        </div>
      </div>
    </div>
  );
}
