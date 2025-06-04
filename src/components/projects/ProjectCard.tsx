// src/components/projects/ProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/ui/animations/FadeIn';
import type { Project } from '@/data/projectsData';

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0 }) => {
  /**
   * Sprawdza, czy projekt jest aktywny.
   * Reguły:
   * 0. Jeśli istnieje projekt.forceActive === true → AKTYWNY
   * 1. Jeśli w date występuje 'zakończony' lub 'ended' → NIEAKTYWNY
   * 2. Jeśli zawiera 'present' lub 'ciągły' → AKTYWNY
   * 3. Jeśli data ma format dd.mm.yyyy → aktywny, gdy data >= dzisiejsza (start dnia)
   * 4. W przeciwnym razie → AKTYWNY
   */
  const checkActive = (): boolean => {
    // 0. forceActive → zawsze aktywny
    if (project.forceActive) {
      return true;
    }

    const lower = project.date.toLowerCase();

    // 1. Zakończony
    if (lower.includes('zakończony') || lower.includes('ended')) {
      return false;
    }

    // 2. Ciągły / present
    if (lower.includes('present') || lower.includes('ciągły')) {
      return true;
    }

    // 3. Parsowanie dd.mm.yyyy
    const match = project.date.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (match) {
      const [, dd, mm, yyyy] = match.map(Number);
      const dateObj = new Date(yyyy, mm - 1, dd);

      // Początek dzisiejszego dnia
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Aktywny jeśli data projektu >= początek dzisiejszego dnia
      return dateObj.getTime() >= today.getTime();
    }

    // 4. Domyślnie aktywny
    return true;
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
            <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
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
