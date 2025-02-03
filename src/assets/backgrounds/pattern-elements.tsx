export const CirclePattern = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05"/>
    <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05"/>
    <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05"/>
  </svg>
);

export const GridPattern = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20H100M0 40H100M0 60H100M0 80H100M20 0V100M40 0V100M60 0V100M80 0V100" 
      stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.03"/>
  </svg>
);

export const WavePattern = () => (
  <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20C50 20 50 35 100 35C150 35 150 5 200 5" 
      stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" fill="none"/>
    <path d="M0 25C50 25 50 40 100 40C150 40 150 10 200 10" 
      stroke="currentColor" strokeWidth="1" strokeOpacity="0.03" fill="none"/>
  </svg>
);

export const HexagonPattern = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 5L55 20V40L30 55L5 40V20L30 5Z" 
      stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" fill="none"/>
  </svg>
);
