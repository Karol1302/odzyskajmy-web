
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../ui/animations/FadeIn';
import { Button } from '@/components/ui/button';

export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  date: string;
  content?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
  featured?: boolean;
}

const ProjectCard = ({ project, delay = 0, featured = false }: ProjectCardProps) => {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className={`card h-full flex flex-col ${featured ? 'border-2 border-foundation-purple' : ''}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-0 right-0 bg-foundation-purple text-white px-3 py-1 text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2 text-sm text-gray-500">{project.date}</div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
          <Link to={`/projects/${project.id}`} className="mt-auto">
            <Button className="w-full flex items-center justify-center">
              <span>Read More</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </FadeIn>
  );
};

export default ProjectCard;
