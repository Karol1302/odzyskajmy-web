// src/pages/ProjectDetail.tsx

import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Mail } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { projectsData } from '@/data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Szukamy aktualnego projektu
  const currentProject = projectsData.find(project => project.id === Number(id));

  // Lista 3 innych projektów do sekcji "Inne projekty"
  const relatedProjects = currentProject
    ? projectsData.filter(p => p.id !== currentProject.id).slice(0, 3)
    : [];

  // Po zmianie id przewijamy do góry
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Funkcja sprawdzająca aktywność
  const checkActive = (dateStr: string) => {
    const lowerCaseDate = dateStr.toLowerCase();

    // 1. "zakończony" / "ended"
    if (lowerCaseDate.includes('zakończony') || lowerCaseDate.includes('ended')) {
      return false;
    }
    // 2. "present" / "ciągły"
    if (lowerCaseDate.includes('present') || lowerCaseDate.includes('ciągły')) {
      return true;
    }
    // 3. Parsowanie daty dd.mm.yyyy (opcjonalne)
    if (/\d{2}\.\d{2}\.\d{4}/.test(dateStr)) {
      const parts = dateStr.split('.');
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);
      const dateObj = new Date(year, month, day);
      return dateObj.getTime() > Date.now();
    }
    // Domyślnie true
    return true;
  };

  if (!currentProject) {
    return (
      <SectionContainer className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Nie znaleziono projektu</h2>
          <p className="mb-6">Projekt którego szukasz nie istnieje lub został usunięty.</p>
          <Link to="/projects">
            <Button>Wróć do projektów</Button>
          </Link>
        </div>
      </SectionContainer>
    );
  }

  const isActive = checkActive(currentProject.date);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <FadeIn>
            <Link
              to="/projects"
              className="inline-flex items-center text-white mb-8 hover:text-foundation-light transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Wróć do projektów
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{currentProject.title}</h1>
            <div className="flex items-center text-foundation-light mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{currentProject.date}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Content */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <FadeIn>
              {/* Image Gallery */}
              <div className="mb-8">
                <img
                  src={currentProject.images[0]}
                  alt={currentProject.title}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                {currentProject.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {currentProject.images.slice(1).map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`${currentProject.title} - image ${idx + 2}`}
                        className="w-full h-32 object-cover rounded-md shadow-sm"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Full Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {currentProject.content.split('\n\n').map((paragraph, index) => (
                  <div key={index}>
                    {paragraph.startsWith('- ') ? (
                      <ul className="list-disc pl-5 mb-4">
                        {paragraph.split('\n- ').map((item, itemIndex) => (
                          <li key={itemIndex}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-4">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Share buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Udostępnij:</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" aria-label="Share on Facebook">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share via email">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn delay={200}>
              <div className="bg-foundation-light dark:bg-gray-800 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Szczegóły projektu</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Data</h4>
                    <p>{currentProject.date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Kontakt</h4>
                    <p>Po więcej informacji o tym projekcie zapraszamy do kontaktu:</p>
                    <a
                      href="mailto:kontakt@odzyskajmy.pl"
                      className="text-foundation-green hover:underline"
                    >
                      kontakt@odzyskajmy.pl
                    </a>
                  </div>
                  <div className="pt-4">
                    {/* Przycisk zapisu wyszarzony, jeśli projekt nieaktywny */}
                    <Button
                      className="w-full"
                      disabled={!isActive}
                      onClick={() => navigate(`/projects/${currentProject.id}/subscribe`)}
                    >
                      Dołącz do projektu
                    </Button>
                    {!isActive && (
                      <p className="text-xs mt-2 text-red-600 dark:text-red-400">
                        Ten projekt jest już zakończony – nie można się zapisać.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionContainer>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <SectionContainer bgColor="bg-foundation-light dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-8">Inne projekty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 100} />
            ))}
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default ProjectDetail;
