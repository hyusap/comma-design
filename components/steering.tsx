import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface SteeringProps {
  onChange: (value: number) => void;
}

export default function Steering({ onChange }: SteeringProps) {
  const [steeringValue, setSteeringValue] = useState(5000);
  const springValue = useSpring(50, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = springValue.onChange((v) => {
      const scaledValue = Math.round((v / 100) * 10000);
      setSteeringValue(scaledValue);
      onChange(v);
    });

    return () => unsubscribe();
  }, [springValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    const scaledValue = (newValue / 10000) * 100;
    springValue.set(scaledValue);
  };

  const handleMouseUp = () => {
    springValue.set(50);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.input
        type="range"
        min={0}
        max={10000}
        value={steeringValue}
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
