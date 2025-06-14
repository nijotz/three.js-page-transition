'use client'

import { OutPortal } from 'react-reverse-portal'
import { motion } from 'framer-motion';
import { useAppStore } from "@/app/store";
import { ColorOption, ColorValue } from './types';

export default function Home() {
  const { portalNode, color: selectedColor, setColor, setTransition } = useAppStore();

  const colors: ColorOption[] = [
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>
      <div className="flex-grow min-h-0 overflow-auto flex p-8 gap-8">
        <motion.div
          className="w-64 h-64 rounded-lg overflow-hidden"
          layoutId="canvas"
          transition={{ duration: 0.4 }}
          onLayoutAnimationStart={() => setTransition(true)}
          onLayoutAnimationComplete={() => setTransition(false)}
        >
          {portalNode && <OutPortal node={portalNode} />}
        </motion.div>
        <div className="p-8 border rounded-2xl h-auto self-start">
          <h2 className="text-xl">Controls</h2>
          <div className="space-y-4 mt-4 px-4">
            <h3 className="font-medium">Cube Color</h3>
            {colors.map((color) => (
              <label key={color.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={(e) => setColor(e.target.value as ColorValue)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="flex items-center">
                  <span className={`w-4 h-4 rounded-full ${color.color} mr-2`}></span>
                  {color.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
