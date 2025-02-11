export const breakpoints = {
  sm: 'max-w-sm',   // 640px
  md: 'max-w-md',   // 768px
  lg: 'max-w-lg',   // 1024px
  xl: 'max-w-xl'    // 1280px
};

export const container = {
  default: `container mx-auto px-4 ${breakpoints.xl}`,
  fluid: 'w-full px-4'
};

export const text = {
  h1: {
    base: 'text-4xl',
    sm: 'sm:text-5xl',
    md: 'md:text-6xl',
    lg: 'lg:text-7xl'
  },
  h2: {
    base: 'text-2xl',
    sm: 'sm:text-3xl',
    md: 'md:text-4xl',
    lg: 'lg:text-5xl'
  },
  body: {
    base: 'text-base',
    sm: 'sm:text-lg',
    md: 'md:text-xl'
  }
};

export const spacing = {
  section: {
    base: 'py-12',
    sm: 'sm:py-16',
    md: 'md:py-20',
    lg: 'lg:py-24'
  },
  container: {
    base: 'px-4',
    sm: 'sm:px-6',
    lg: 'lg:px-8'
  }
};

export const grid = {
  cols: {
    base: 'grid-cols-1',
    sm: 'sm:grid-cols-2',
    md: 'md:grid-cols-3',
    lg: 'lg:grid-cols-4'
  },
  gap: {
    base: 'gap-4',
    sm: 'sm:gap-6',
    md: 'md:gap-8',
    lg: 'lg:gap-10'
  }
};
