// src/components/projects/ProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/ui/animations/FadeIn';

export interface Project {
  id: number;
  title: string;
  description: string; // krótki opis
  content: string;     // pełny opis
  images: string[];
  date: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0 }) => {
  /**
   * Sprawdza, czy projekt jest aktywny.
   * Zasady:
   * 1. Jeśli w date występuje 'Zakończony' (małe/duże litery) lub 'Ended' => NIEAKTYWNY
   * 2. Jeśli zawiera 'Present' lub 'ciągły' => AKTYWNY
   * 3. W przeciwnym razie — spróbujmy sparsować ostatnią część daty i sprawdzić, czy jest w przyszłości
   *    (opcjonalne, zależy czy chcesz taką logikę).
   */
  const checkActive = () => {
    const lowerCaseDate = project.date.toLowerCase();

    // 1. Sprawdzamy słowo "zakończony" lub "ended"
    if (lowerCaseDate.includes('zakończony') || lowerCaseDate.includes('ended')) {
      return false;
    }

    // 2. Sprawdzamy słowo "present" lub "ciągły"
    if (lowerCaseDate.includes('present') || lowerCaseDate.includes('ciągły')) {
      return true;
    }

    // 3. Parsowanie na wypadek, gdy data ma format np. "21.12.2024" (przyszłość -> aktywne)
    //    Jest to opcjonalne — jeśli wolisz prostsze reguły, możesz to usunąć.
    //    Załóżmy, że format to np. "21.12.2024" => spróbujmy sparsować:
    if (/\d{2}\.\d{2}\.\d{4}/.test(project.date)) {
      // np. "21.12.2024"
      const parts = project.date.split('.');
      // parts[0] = 21, parts[1] = 12, parts[2] = 2024
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1; // JS liczy miesiące od 0
      const year = Number(parts[2]);
      const dateObj = new Date(year, month, day);

      // Jeśli data w przyszłości -> aktywny
      if (dateObj.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    }

    // Jeśli żadna reguła nie pasuje — domyślnie aktywny (lub false, zależnie od Twoich preferencji)
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
