"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Lander() {
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();
  const textControls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/app");
  }, [router]);

  const handleClick = async () => {
    setIsClicked(true);
    await textControls.start({
      opacity: 0,
      transition: { duration: 0.5 },
    });
    await controls.start({
      scale: 100,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    });
    router.push("/app");
  };

  return (
    <div className="w-screen h-screen bg-[#51ff00] flex-col justify-center items-center text-black overflow-hidden">
      <div className="flex flex-col max-w-[850px] mx-auto py-10 gap-4 lg:gap-6 h-full px-5">
        <h1 className="font-semibold text-4xl lg:text-6xl">
          openpilot limit gauge proposal.
        </h1>
        <p className="text-lg lg:text-2xl">
          designed by ayush paul. an attempt at the comma.ai design challenge.
          see the design process{" "}
          <a
            className="underline"
            href="https://www.figma.com/board/jkHa1ldchhLdjCgSkrmw94/Untitled?node-id=0-1&t=8E72mS09NmOgQCWy-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . see the code{" "}
          <a
            className="underline"
            href="https://github.com/hyusap/comma-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
          <br />
          <br />
          in this demo, YOU are comma. try controlling the vehicle and see what
          the user will see as you do.
        </p>
        <div className="flex-1"></div>
        <motion.button
          className="flex bg-black text-white p-6 font-semibold text-center text-xl lg:text-3xl justify-center items-center tracking-wide mt-auto"
          animate={controls}
          onClick={handleClick}
        >
          <motion.span className="z-10" animate={textControls}>
            ENTER NOW
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
