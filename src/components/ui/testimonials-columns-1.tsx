"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={cn("overflow-hidden", props.className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border shadow-lg max-w-md w-full backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(10, 3, 27, 0.6)',
                    borderColor: 'rgba(77, 42, 160, 0.2)',
                    boxShadow: '0 10px 30px rgba(77, 42, 160, 0.1)',
                  }}
                  key={`${index}-${i}`}
                >
                  <div className="text-balance-100">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-balance-300/30"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight text-balance-200">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

