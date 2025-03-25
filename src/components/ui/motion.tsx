
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | 'fade-in'
    | 'slide-in-from-left'
    | 'slide-in-from-right'
    | 'slide-in-from-top'
    | 'slide-in-from-bottom'
    | 'float';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
};

export const Motion = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  once = true,
}: MotionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : 'opacity-0',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};
