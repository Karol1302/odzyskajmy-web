
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  bgColor?: string;
}

export const SectionContainer = ({
  children,
  className,
  id,
  as: Component = 'section',
  bgColor = 'bg-white dark:bg-gray-900',
}: SectionContainerProps) => {
  return (
    <Component
      id={id}
      className={cn(
        'py-12 md:py-16 px-4',
        bgColor,
        className
      )}
    >
      <div className="container-custom">{children}</div>
    </Component>
  );
};

export const SectionTitle = ({
  children,
  className,
  centered = true,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) => {
  return (
    <h2
      className={cn(
        'text-3xl md:text-4xl font-bold mb-8 relative pb-4',
        centered && 'text-center',
        className
      )}
    >
      {children}
      <span className={cn(
        'absolute bottom-0 left-0 h-1 w-20 bg-foundation-green', 
        centered && 'left-1/2 transform -translate-x-1/2'
      )} />
    </h2>
  );
};
