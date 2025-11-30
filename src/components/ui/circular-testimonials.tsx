"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  slug?: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  className?: string;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: .99,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(5deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        filter: "blur(4px)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: .99,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-5deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        filter: "blur(4px)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={cn("w-full max-w-6xl p-8", className)}>
      <div className="grid md:grid-cols-2 gap-8 md:gap-28 ">
        {/* Images */}
        <div
          className="relative w-full h-96 perspective-1000"
          ref={imageContainerRef}
          style={{ perspective: "900px" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((testimonial, index) => {
            const ImageElement = (
              <img
                key={testimonial.src}
                src={testimonial.src}
                alt={testimonial.name}
                className="absolute w-full h-full object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                data-index={index}
                style={getImageStyle(index)}
              />
            );

            return testimonial.slug ? (
              <Link
                key={testimonial.src}
                href={`/speakers/${testimonial.slug}`}
                className="absolute w-full h-full"
                style={getImageStyle(index)}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-full h-full object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-shadow"
                  data-index={index}
                />
              </Link>
            ) : (
              ImageElement
            );
          })}
        </div>
        {/* Content */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2
                className="font-bold mb-1 leading-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h2>
              <p
                className="mb-8"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <div className="relative">
                {/* Opening quotation mark */}
                <span 
                  className="absolute -top-4 -left-2 md:-top-6 md:-left-4 text-balance-400 pointer-events-none select-none"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 8rem)',
                    lineHeight: 1,
                    fontFamily: 'serif',
                    opacity: 0.3,
                  }}
                  aria-hidden="true"
                >
                  "
                </span>
                {/* Closing quotation mark */}
                <span 
                  className="absolute -bottom-8 -right-2 md:-bottom-12 md:-right-4 text-balance-400 pointer-events-none select-none"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 8rem)',
                    lineHeight: 1,
                    fontFamily: 'serif',
                    opacity: 0.3,
                  }}
                  aria-hidden="true"
                >
                  "
                </span>
                <motion.p
                  className="leading-[1.75] relative z-10"
                  style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                >
                  {activeTestimonial.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.22,
                        ease: "easeInOut",
                        delay: 0.025 * i,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-6 pt-12 md:pt-4">
            <button
              className="w-[4rem] h-[4rem] rounded-full flex items-center justify-center cursor-pointer transition-colors"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} color={colorArrowFg} />
            </button>
            <button
              className="w-[4rem] h-[4rem] rounded-full flex items-center justify-center cursor-pointer transition-colors"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;

