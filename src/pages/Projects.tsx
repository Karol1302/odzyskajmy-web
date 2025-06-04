import { useState, useEffect } from 'react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import ProjectCard from '@/components/projects/ProjectCard';
import FadeIn from '@/components/ui/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchProjects, Project } from '@/data/projectsData';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nasze Projekty</h1>
              <p className="text-xl">
                Odkryj inicjatywy i programy, które opracowaliśmy, aby wspierać naszą społeczność i tworzyć pozytywne zmiany.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Search and Project Listing */}
      <SectionContainer>
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Szukaj projektów..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search projects"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={index * 100}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Brak projektów
              </p>
            </div>
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default Projects;
