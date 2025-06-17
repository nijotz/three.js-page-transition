'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/app/store';
import { useEffect, useRef, useState } from 'react';

export default function Toolbar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { cubes, selectedCube, setSelectedCube } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCubeSelect = (id: number) => {
    setSelectedCube(id);
    setIsDropdownOpen(false);
    router.push(`/cubes/${id}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Portals
              </Link>
            </div>
            <div className="ml-6 flex space-x-8 items-center">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname.startsWith('/cubes/')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Cube
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {cubes.map((cube) => (
                        <button
                          key={cube.id}
                          onClick={() => handleCubeSelect(cube.id)}
                          className={`block w-full text-left px-4 py-2 text-sm ${selectedCube?.id === cube.id
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          role="menuitem"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-${cube.color}-500`} />
                            <span>Cube {cube.id}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
