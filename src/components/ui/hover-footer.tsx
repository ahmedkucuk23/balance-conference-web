"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
  isHovered,
  shouldAnimate,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  isHovered?: boolean;
  shouldAnimate?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {isHovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-balance-400 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: isHovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#4D2AA0] font-[helvetica] text-7xl font-bold 
        dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={shouldAnimate ? {
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        } : {
          strokeDashoffset: 1000,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.1"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 0%, rgba(15, 15, 17, 0.4) 50%, rgba(60, 162, 250, 0.2) 100%)",
      }}
    />
  );
};

export const HoverFooter = () => {
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Conferences", href: "/conferences" },
    { label: "Speakers", href: "/speakers" },
    { label: "Contact", href: "/contact" },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <footer 
      className="w-full relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[#0A031B] z-0" />
      <FooterBackgroundGradient />
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-balance-200 text-3xl font-extrabold">
                &hearts;
              </span>
              <span className="text-white text-3xl font-bold">Balance</span>
            </div>
            <p className="text-sm text-balance-100 leading-relaxed">
              The first BiH conference dedicated to living in balance.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-balance-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tickets"
                  className="text-balance-100 hover:text-white transition-colors"
                >
                  Get Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="text-balance-100 hover:text-white transition-colors"
                >
                  Speakers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact
            </h4>
            <p className="text-balance-100 text-sm leading-relaxed">
              Join us for the first BiH conference dedicated to living in balance.
            </p>
          </div>
        </div>

      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-48 -mb-40">
        <TextHoverEffect 
          text="BALANCE" 
          className="z-50" 
          isHovered={isHovered}
          shouldAnimate={hasAnimated}
        />
      </div>
    </footer>
  );
};

