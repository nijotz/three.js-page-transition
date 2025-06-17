import { HtmlPortalNode, OutPortal } from 'react-reverse-portal';
import { motion } from "framer-motion";
import { ColorOption, ColorValue } from '@/app/types';
import { useAppStore } from "@/app/store";

const colors: ColorOption[] = [
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
];

const CubeColor = ({
  id,
  color: selectedColor,
  setColor,
  handleAction,
  handleSelect,
  portalNode
}: {
  id: number,
  color: ColorValue,
  setColor: (color: ColorValue) => void,
  handleAction: () => void,
  handleSelect: () => void,
  portalNode: HtmlPortalNode,
}) => {
  const { setTransition } = useAppStore();

  return (
    <div className={`flex flex-col items-center p-2`} onClick={handleSelect} >
      <div className="flex-grow min-h-0 flex p-4 gap-4 items-center">
        <div className="w-64 h-64 rounded-lg">
          <motion.div
            key={id}
            className="h-full w-full motion"
            layoutId={`canvas-${id}`}
            layout
            transition={{ duration: 0.4 }}
            onLayoutAnimationStart={() => setTransition(true)}
            onLayoutAnimationComplete={() => setTransition(false)}
          >
            {portalNode && <OutPortal node={portalNode} />}
          </motion.div>
        </div>

        <div className="p-6 border rounded-xl h-auto flex flex-col gap-2">
          <h2 className="font-medium">Cube Color</h2>
          {colors.map((color) => (
            <label key={color.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`color-${id}`}
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

      <div>
        <button
          className="outline rounded px-4 py-2 text-white cursor-pointer bg-blue-500"
          onClick={handleAction}
        >
          Select
        </button>
      </div>
    </div >
  );
}

export default CubeColor;
