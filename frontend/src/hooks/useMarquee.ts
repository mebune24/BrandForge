import { useState, useCallback } from 'react';

interface UseMarqueeOptions {
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export function useMarquee(options: UseMarqueeOptions = {}) {
  const { speed = 50, direction = 'left', pauseOnHover = true } = options;
  const [isPaused, setIsPaused] = useState(false);

  const animationStyle = {
    animationDuration: `${speed}s`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal' as const,
    animationPlayState: isPaused ? 'paused' : 'running' as const,
  };

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return {
    animationStyle,
    isPaused,
    handleMouseEnter,
    handleMouseLeave,
  };
}
