import { motion, useSpring } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

interface PedalsProps {
  onBrake: (value: number) => void;
  onAccelerate: (value: number) => void;
}

export default function Pedals({ onBrake, onAccelerate }: PedalsProps) {
  const [brakePressed, setBrakePressed] = useState(false);
  const [acceleratePressed, setAcceleratePressed] = useState(false);
  const [brakeValue, setBrakeValue] = useState(0);
  const [accelerateValue, setAccelerateValue] = useState(0);

  const lastUpdateTime = useRef(performance.now());

  const brakeSpring = useSpring(0, { stiffness: 100, damping: 30 });
  const accelerateSpring = useSpring(0, { stiffness: 100, damping: 30 });

  const updateValues = useCallback(() => {
    const now = performance.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000; // Convert to seconds
    lastUpdateTime.current = now;

    const changeRate = 100; // Units per second

    setBrakeValue((prev) => {
      const newValue = brakePressed
        ? Math.min(prev + changeRate * deltaTime, 100)
        : Math.max(prev - changeRate * deltaTime, 0);
      brakeSpring.set(newValue);
      return newValue;
    });

    setAccelerateValue((prev) => {
      const newValue = acceleratePressed
        ? Math.min(prev + changeRate * deltaTime, 100)
        : Math.max(prev - changeRate * deltaTime, 0);
      accelerateSpring.set(newValue);
      return newValue;
    });
  }, [brakePressed, acceleratePressed, brakeSpring, accelerateSpring]);

  useEffect(() => {
    const unsubscribeBrake = brakeSpring.onChange((v) => {
      onBrake(v);
    });

    const unsubscribeAccelerate = accelerateSpring.onChange((v) => {
      onAccelerate(v);
    });

    return () => {
      unsubscribeBrake();
      unsubscribeAccelerate();
    };
  }, [brakeSpring, accelerateSpring, onBrake, onAccelerate]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      updateValues();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateValues]);

  return (
    <div className="flex justify-center space-x-8">
      <motion.button
        className="w-32 h-48 bg-white text-black font-bold text-4xl border-8 border-black rounded-2xl focus:outline-none"
        onMouseDown={() => setBrakePressed(true)}
        onMouseUp={() => setBrakePressed(false)}
        onTouchStart={() => setBrakePressed(true)}
        onTouchEnd={() => setBrakePressed(false)}
        animate={{
          scale: brakePressed ? 0.95 : 1,
          backgroundColor: brakePressed ? "#e0e0e0" : "#ffffff",
          rotateX: brakePressed ? 20 : 0, // Rotate around bottom edge
          transformOrigin: "bottom", // Set rotation origin to bottom
        }}
        transition={{ duration: 0.1 }}
      >
        B
      </motion.button>
      <motion.button
        className="w-32 h-48 bg-white text-black font-bold text-4xl border-8 border-black rounded-2xl focus:outline-none"
        onMouseDown={() => setAcceleratePressed(true)}
        onMouseUp={() => setAcceleratePressed(false)}
        onTouchStart={() => setAcceleratePressed(true)}
        onTouchEnd={() => setAcceleratePressed(false)}
        animate={{
          scale: acceleratePressed ? 0.95 : 1,
          backgroundColor: acceleratePressed ? "#e0e0e0" : "#ffffff",
          rotateX: acceleratePressed ? 20 : 0, // Rotate around bottom edge
          transformOrigin: "bottom", // Set rotation origin to bottom
        }}
        transition={{ duration: 0.1 }}
      >
        A
      </motion.button>
    </div>
  );
}
