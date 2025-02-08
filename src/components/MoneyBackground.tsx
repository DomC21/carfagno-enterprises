import { useEffect, useState } from 'react';
import { cn } from "../lib/utils";
import { DollarIcon, GraphIcon, ArrowUpIcon, ChartIcon } from '../assets/backgrounds/money-icons';
import { CirclePattern, GridPattern } from '../assets/backgrounds/pattern-elements';
import { CandlestickPattern, TrendLines } from '../assets/backgrounds/financial-elements';
import { StockTicker, CountingNumber, DataFlow } from '../assets/backgrounds/stock-elements';

// Define background element positions
import { AnimationElement } from '../types/animation'
type BackgroundElement = AnimationElement;

// Define background elements with mobile-friendly positioning
const backgroundElements: BackgroundElement[] = [
  // Core elements (shown on all devices)
  { Component: DollarIcon, positions: ['15,25', '85,35', '45,75'], priority: 'high', scale: 1 },
  { Component: GraphIcon, positions: ['25,45', '75,55', '35,15'], priority: 'high', scale: 1 },
  { Component: ArrowUpIcon, positions: ['45,15', '55,85', '15,65'], priority: 'high', scale: 1 },
  { Component: ChartIcon, positions: ['35,65', '65,35', '85,85'], priority: 'high', scale: 1 },
  { Component: StockTicker, positions: ['10,30', '70,70'], priority: 'high', scale: 0.8, customClass: 'animate-ticker' },
  { Component: CountingNumber, positions: ['20,60', '80,20'], priority: 'high', scale: 0.9, customClass: 'animate-counting' },
  
  // Desktop-only decorative elements
  { Component: CirclePattern, positions: ['5,10', '95,20', '50,95'], priority: 'low', scale: 0.7 },
  { Component: GridPattern, positions: ['35,25', '65,55', '15,85'], priority: 'low', scale: 0.8 },
  { Component: CandlestickPattern, positions: ['55,15', '35,45', '75,75'], priority: 'low', scale: 0.9 },
  { Component: TrendLines, positions: ['65,25', '25,55', '45,95'], priority: 'low', scale: 0.8 },
  { Component: DataFlow, positions: ['40,40', '60,80', '20,90'], priority: 'low', scale: 0.7, customClass: 'animate-flow' },
];

interface MoneyBackgroundProps {
  className?: string;
}

export function MoneyBackground({ className = '' }: MoneyBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    setIsMounted(true);
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => {
      setIsMounted(false);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMounted) return null;
  
  // Filter elements based on device and priority
  const visibleElements = isMobile ? 
    backgroundElements.filter(el => el.priority === 'high') : 
    backgroundElements;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        "pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-slate-900/40 mix-blend-overlay"></div>
      </div>

      {/* Financial elements */}
      {visibleElements.map(({ Component, positions }, elementIndex) => (
        positions.map((position, posIndex) => {
          const [x, y] = position.split(',').map(Number);
          const delay = ((elementIndex * positions.length) + posIndex) * 0.1;
          
          return (
            <div
              key={`${elementIndex}-${posIndex}`}
              className={cn(
                "absolute transform",
                visibleElements[elementIndex].customClass || (
                  elementIndex % 3 === 0 ? `animate-float ${isMobile ? 'opacity-5' : 'opacity-10'}` :
                  elementIndex % 3 === 1 ? `animate-drift ${isMobile ? 'opacity-8' : 'opacity-15'}` :
                  `animate-shimmer ${isMobile ? 'opacity-10' : 'opacity-20'}`
                ),
                visibleElements[elementIndex].priority === 'low' ? 'hidden md:block' : '',
                "transition-all duration-1000",
                elementIndex % 2 === 0 ? "text-teal-400" : "text-blue-400"
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${delay}s`,
                transform: `scale(${(visibleElements[elementIndex].scale || 1) * (0.9 + Math.random() * 0.2)})`,
              }}
            >
              <Component />
            </div>
          );
        })
      ))}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
