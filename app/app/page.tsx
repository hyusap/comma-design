"use client";

import Image from "next/image";
import comma from "@/public/comma.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import Steering from "@/components/steering";
import Pedals from "@/components/pedals";
import Confidence from "@/components/confidence";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (value: number) => ({
    pathLength: value / 100,
    opacity: 1,
    transition: {
      pathLength: { duration: 0 },
      opacity: { duration: 0 },
    },
  }),
};

export default function Home() {
  const [steeringValue, setSteeringValue] = useState(50);
  const [confidenceValue, setConfidenceValue] = useState(100);
  const [brakeValue, setBrakeValue] = useState(0);
  const [accelerateValue, setAccelerateValue] = useState(0);
  const [isBraking, setIsBraking] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isTurningLeft, setIsTurningLeft] = useState(false);
  const [isTurningRight, setIsTurningRight] = useState(false);

  useEffect(() => {
    setIsTurningLeft(steeringValue < 50);
    setIsTurningRight(steeringValue > 50);
  }, [steeringValue]);

  return (
    <main className="flex flex-col bg-black w-full h-full">
      <motion.div
        className="min-h-screen w-full flex flex-col items-center justify-between p-10 lg:p-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {" "}
        <motion.svg
          viewBox="0 0 1286 643"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-lg overflow-hidden w-[80vw]"
        >
          <g clip-path="url(#clip0_6_18)">
            <rect x="-1" width="1286" height="643" fill="url(#pattern0_6_18)" />

            <motion.path
              d="M643 9V634"
              stroke="#188644"
              strokeWidth="18"
              fill="none"
            />
            <motion.path
              d="M643 321.5V13"
              stroke="#8B0000"
              strokeWidth="18"
              fill="none"
              initial="hidden"
              animate="visible"
              variants={draw}
              custom={100 - confidenceValue}
            />
            <motion.path
              d="M643 321.5V630"
              stroke="#8B0000"
              strokeWidth="18"
              fill="none"
              initial="hidden"
              animate="visible"
              variants={draw}
              custom={100 - confidenceValue}
            />
            <motion.path
              d="M9 9H1277V634H9V9Z"
              stroke="#188644"
              strokeWidth="18"
              fill="none"
            />

            <motion.path
              d="M643 9H9V634H643"
              initial="hidden"
              animate={isBraking ? "visible" : "hidden"}
              variants={draw}
              custom={brakeValue}
              stroke="#8B0000"
              strokeWidth="18"
            />
            <motion.path
              d="M643 9H1277V634H643"
              initial="hidden"
              animate={isBraking ? "visible" : "hidden"}
              variants={draw}
              custom={brakeValue}
              stroke="#8B0000"
              strokeWidth="18"
            />
            <motion.path
              d="M643 634H9V9H643"
              initial="hidden"
              animate={isAccelerating ? "visible" : "hidden"}
              variants={draw}
              custom={accelerateValue}
              stroke="#FF8C00"
              strokeWidth="18"
            />
            <motion.path
              d="M643 634H1277V9H643"
              initial="hidden"
              animate={isAccelerating ? "visible" : "hidden"}
              variants={draw}
              custom={accelerateValue}
              stroke="#FF8C00"
              strokeWidth="18"
            />
            <motion.path
              d="M1277 321.5H1277V9H9V321.5"
              initial="hidden"
              animate={isTurningLeft ? "visible" : "hidden"}
              variants={draw}
              custom={Math.abs(50 - steeringValue) * 2}
              stroke="#00FF00"
              strokeWidth="18"
            />
            <motion.path
              d="M1277 321.5H1277V634H9V321.5"
              initial="hidden"
              animate={isTurningLeft ? "visible" : "hidden"}
              variants={draw}
              custom={Math.abs(50 - steeringValue) * 2}
              stroke="#00FF00"
              strokeWidth="18"
            />
            <motion.path
              d="M9 321.5H9V9H1277V321.5"
              initial="hidden"
              animate={isTurningRight ? "visible" : "hidden"}
              variants={draw}
              custom={Math.abs(50 - steeringValue) * 2}
              stroke="#00FF00"
              strokeWidth="18"
            />
            <motion.path
              d="M9 321.5H9V634H1277V321.5"
              initial="hidden"
              animate={isTurningRight ? "visible" : "hidden"}
              variants={draw}
              custom={Math.abs(50 - steeringValue) * 2}
              stroke="#00FF00"
              strokeWidth="18"
            />
          </g>
          <defs>
            <pattern
              id="pattern0_6_18"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                href="#image0_6_18"
                transform="scale(0.000777605 0.00155521)"
              />
            </pattern>
            <clipPath id="clip0_6_18">
              <rect width="1286" height="643" fill="white" />
            </clipPath>
            <image
              id="image0_6_18"
              width="1286"
              height="643"
              href="/comma.png"
            />
          </defs>
        </motion.svg>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center mt-8 w-full">
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-white text-2xl font-bold text-center">
              Steering
            </h2>
            <Steering
              onChange={(value) => {
                console.log("Steering value changed:", value);
                setSteeringValue(value);
              }}
            />
            <h2 className="text-white text-2xl font-bold text-center">
              Confidence
            </h2>
            <Confidence
              onChange={(value) => {
                console.log("Confidence value changed:", value);
                setConfidenceValue(value);
              }}
            />
          </div>
          <div className="w-full">
            <Pedals
              onBrake={(value) => {
                setBrakeValue(value);
                setIsBraking(value > 0);
              }}
              onAccelerate={(value) => {
                setAccelerateValue(value);
                setIsAccelerating(value > 0);
              }}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
