
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className,
  prefix = '',
  suffix = '',
  formatter = (val) => val.toString()
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const animateValue = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const runtime = timestamp - startTimeRef.current;
      const progress = Math.min(runtime / duration, 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (runtime < duration) {
        frameRef.current = requestAnimationFrame(animateValue);
      }
    };

    frameRef.current = requestAnimationFrame(animateValue);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration, isInView]);

  return (
    <span ref={elementRef} className={cn("tabular-nums", className)}>
      {prefix}{formatter(displayValue)}{suffix}
    </span>
  );
};

export default AnimatedNumber;
