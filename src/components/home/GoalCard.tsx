
import { ReactNode } from 'react';
import FadeIn from '../ui/animations/FadeIn';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  delay?: number;
  className?: string;
}

const GoalCard = ({
  title,
  description,
  icon,
  image,
  delay = 0,
  className,
}: GoalCardProps) => {
  return (
    <FadeIn 
      delay={delay}
      className={cn('h-full', className)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center mb-3 text-foundation-purple">
            {icon}
          </div>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </FadeIn>
  );
};

export default GoalCard;
