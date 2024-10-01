import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface ConfidenceProps {
  onChange: (value: number) => void;
}

export default function Confidence({ onChange }: ConfidenceProps) {
  const [confidenceValue, setConfidenceValue] = useState(100);
  const springValue = useSpring(100, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = springValue.onChange((v) => {
      const scaledValue = Math.round(v);
      setConfidenceValue(scaledValue);
      onChange(scaledValue);
    });

    return () => unsubscribe();
  }, [springValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    springValue.set(newValue);
  };

  const handleMouseUp = () => {
    springValue.set(100);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.input
        type="range"
        min={0}
        max={100}
        value={confidenceValue}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="w-full h-4 bg-white rounded-full appearance-none cursor-pointer accent-white"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          outline: "none",
        }}
      />
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 50px;
          height: 50px;
          background: white;
          border: 5px solid black;
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 50px;
          height: 50px;
          background: white;
          border: 5px solid black;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
