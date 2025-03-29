import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/ui/animations/FadeIn';

export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  date: string;
  content: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0 }) => {
  // Funkcja sprawdzająca, czy projekt jest aktywny (czy data końcowa jest w przyszłości)
  const checkActive = () => {
    const parts = project.date.split('-').map(part => part.trim());
    if (parts.length < 2) return false;
    const endDateStr = parts[1];
    if (endDateStr.toLowerCase() === 'present') {
      return true;
    }
    const endDate = new Date(endDateStr);
    return endDate > new Date();
  };

  const isActive = checkActive();

  return (
    <FadeIn delay={delay}>
      <Link to={`/projects/${project.id}`}>
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
            isActive ? 'border-2 border-foundation-green' : ''
          }`}
        >
          {project.images && project.images.length > 0 && (
            <div className="relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              {isActive && (
                <span className="absolute top-2 left-2 bg-foundation-green text-white text-xs font-bold px-2 py-1 rounded">
                  Aktywny
                </span>
              )}
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2 text-foundation-brown dark:text-foundation-brown">
              {project.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {project.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.date}</p>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};

export default ProjectCard;
