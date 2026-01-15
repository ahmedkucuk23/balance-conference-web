'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ROTATION_RANGE = 5;
const PERSPECTIVE = 400;

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 30,
};

interface WigglyCardProps {
  children: ReactNode;
  className?: string;
  rotationRange?: number;
  perspective?: number;
}

export const WigglyCard = ({
  children,
  className,
  rotationRange = ROTATION_RANGE,
  perspective = PERSPECTIVE,
}: WigglyCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [rotationRange, -rotationRange]);
  const rotateY = useTransform(x, [-50, 50], [-rotationRange, rotationRange]);

  const handleMove = (
    clientX: number,
    clientY: number,
    currentTarget: HTMLElement,
  ) => {
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMove(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY, event.currentTarget);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
      onMouseLeave={handleLeave}
      style={{ perspective }}
      className={cn("relative touch-none", className)}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={springTransition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

