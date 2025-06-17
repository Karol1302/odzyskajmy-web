import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Facebook } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { SectionContainer } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchProjects, fetchProject, Project } from '@/data/projectsData';
import { cn } from '@/lib/utils';
import ImageLightbox from '@/components/projects/ImageLightbox';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Pobranie projektu
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isPortrait, setIsPortrait] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    fetchProject(Number(id)).then(setCurrentProject);
    fetchProjects().then((all) => {
      setRelatedProjects(all.filter(p => p.id !== Number(id)).slice(0, 3));
    });
  }, [id]);

  useEffect(() => {
    if (!currentProject) return;
    const img = new Image();
    img.onload = () => {
      setIsPortrait(img.naturalHeight > img.naturalWidth);
    };
    img.src = currentProject.images[0];
  }, [currentProject]);

  // Jeśli brak projektu
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

  // Sprawdzenie czy data jest dziś lub później (inclusive)
  const isActive = (() => {
    if (currentProject.forceActive) {
      return true;
    }
    const ds = currentProject.date.toLowerCase();
    if (ds.includes('zakończony') || ds.includes('ended')) return false;
    if (ds.includes('present') || ds.includes('ciągły')) return true;

    const match = ds.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (match) {
      const [_, dd, mm, yyyy] = match;
      const projDate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return projDate.getTime() >= today.getTime();
    }
    return true;
  })();

  // Czy w ogóle włączone zapisy (z danych)
  const canSubscribe = !!currentProject.allowSubscription && isActive;
  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank'
    );
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Skopiowano do schowka' });
  };

  const handleCloseLightbox = () => setLightboxIndex(null);

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
              <div className="mb-8">
                <img
                  src={currentProject.images[0]}
                  alt={currentProject.title}
                  onClick={() => setLightboxIndex(0)}
                  className={cn(
                    'h-auto rounded-lg shadow-md mb-4 cursor-zoom-in',
                    isPortrait ? 'w-1/2 mx-auto' : 'w-full'
                  )}
                />
                {currentProject.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {currentProject.images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${currentProject.title} - ${i + 2}`}
                        onClick={() => setLightboxIndex(i + 1)}
                        className="w-full h-32 object-cover rounded-md shadow-sm cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                {currentProject.content.split('\n\n').map((p, idx) => (
                  <div key={idx}>
                    {p.startsWith('- ') ? (
                      <ul className="list-disc pl-5 mb-4">
                        {p.split('\n- ').map((item, j) => (
                          <li key={j}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-4">{p}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Udostępnij:</span>
                  <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Udostępnij na Facebooku"
                        onClick={handleShareFacebook}
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                        <Button
                        variant="outline"
                        size="icon"
                        aria-label="Kopiuj link"
                        onClick={handleCopyLink}
                      >
                      <Share2 className="h-4 w-4" />
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
                    <a href="mailto:kontakt@odzyskajmy.pl" className="text-foundation-green hover:underline">
                      kontakt@odzyskajmy.pl
                    </a>
                  </div>

                  {/* Tylko jeśli allowSubscription i jest aktywny */}
                  {canSubscribe && (
                    <div className="pt-4">
                      <Button
                        className="w-full"
                        onClick={() => navigate(`/projects/${currentProject.id}/subscribe`)}
                      >
                        Dołącz do projektu
                      </Button>
                    </div>
                  )}

                  {/* Jeśli włączone, ale nieaktywne */}
                  {currentProject.allowSubscription && !isActive && (
                    <p className="text-xs mt-2 text-red-600 dark:text-red-400">
                      Ten projekt jest już zakończony – nie można się zapisać.
                    </p>
                  )}
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
            {relatedProjects.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} delay={i * 100} />
            ))}
          </div>
        </SectionContainer>
      )}
      <ImageLightbox
        images={currentProject.images}
        index={lightboxIndex}
        onClose={handleCloseLightbox}
      />
    </>
  );
};

export default ProjectDetail;
