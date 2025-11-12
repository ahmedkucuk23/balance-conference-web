'use client'

import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from: any, steps: any) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s: any) => Object.keys(s))]);

  const keyframes: any = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map((s: any) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  segments,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete = undefined,
  stepDuration = 0.35
}) => {
  // Group letters by words when animating by letters to prevent word breaking
  const processElements = useMemo(() => {
    const textSegments = segments || [{ text, color: undefined, lineBreak: false }];
    const result = [];
    let globalIndex = 0;
    let globalLetterIndex = 0;

    textSegments.forEach((segment, segmentIdx) => {
      if (segment.lineBreak && result.length > 0) {
        result.push({ type: 'break' });
      }

      if (animateBy === 'words') {
        const words = segment.text.split(' ');
        words.forEach((word, wordIdx) => {
          result.push({
            type: 'word',
            content: word,
            index: globalIndex++,
            color: segment.color
          });
        });
      } else {
        const words = segment.text.split(' ');
        words.forEach((word, wordIndex) => {
          const letters = word.split('');
          result.push({
            type: 'word-group',
            letters: letters.map((letter, letterIndex) => ({
              content: letter,
              globalIndex: globalLetterIndex++
            })),
            wordIndex: globalIndex++,
            color: segment.color
          });
          if (wordIndex < words.length - 1) {
            result.push({ type: 'space', content: ' ' });
          }
        });
      }
    });

    return result;
  }, [text, segments, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Calculate total elements for onAnimationComplete
  const totalElements = animateBy === 'words' 
    ? processElements.length 
    : processElements.filter(e => e.type === 'word-group').reduce((sum, e) => sum + e.letters.length, 0);

  // Check if text-center or text-right is in className and add appropriate flex justification
  const isCentered = className.includes('text-center');
  const isRightAligned = className.includes('text-right');
  const flexStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    ...(isCentered && { justifyContent: 'center' }),
    ...(isRightAligned && { justifyContent: 'flex-end' })
  };

  return (
    <p ref={ref} className={className} style={flexStyle}>
      {processElements.map((element, index) => {
        // Handle line breaks
        if (element.type === 'break') {
          return <br key={`break-${index}`} />;
        }

        if (animateBy === 'words') {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
          const spanTransition = {
            duration: totalDuration,
            times,
            delay: (element.index * delay) / 1000
          };
          spanTransition.ease = easing;

          return (
            <motion.span
              className="inline-block will-change-[transform,filter,opacity] whitespace-nowrap"
              key={element.index}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              style={element.color ? { color: element.color } : undefined}
              onAnimationComplete={element.index === processElements.length - 1 ? onAnimationComplete : undefined}
            >
              {element.content}
              {element.index < processElements.length - 1 && '\u00A0'}
            </motion.span>
          );
        } else {
          // Letter animation - group by words
          if (element.type === 'space') {
            return <span key={`space-${index}`} className="whitespace-pre"> </span>;
          }

          if (element.type === 'word-group') {
            let letterCount = 0;
            processElements.forEach((e, idx) => {
              if (idx < index && e.type === 'word-group') {
                letterCount += e.letters.length;
              }
            });

            return (
              <span key={`word-${element.wordIndex}`} className="inline-block whitespace-nowrap" style={element.color ? { color: element.color } : undefined}>
                {element.letters.map((letter, letterIdx) => {
                  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
                  const globalLetterIndex = letterCount + letterIdx;
                  const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (globalLetterIndex * delay) / 1000
                  };
                  spanTransition.ease = easing;
                  const isLast = globalLetterIndex === totalElements - 1;

                  return (
                    <motion.span
                      className="inline-block will-change-[transform,filter,opacity]"
                      key={`word-${element.wordIndex}-letter-${letterIdx}`}
                      initial={fromSnapshot}
                      animate={inView ? animateKeyframes : fromSnapshot}
                      transition={spanTransition}
                      onAnimationComplete={isLast ? onAnimationComplete : undefined}
                    >
                      {letter.content}
                    </motion.span>
                  );
                })}
              </span>
            );
          }
        }
        return null;
      })}
    </p>
  );
};

export default BlurText;
