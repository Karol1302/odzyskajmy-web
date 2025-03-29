
import { useState } from 'react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';
import FadeIn from '@/components/ui/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Projects = () => {
  // Mock project data
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Community Support Program",
      description: "Providing essential resources and support to families affected by recent economic challenges.",
      images: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500"],
      date: "June 2023 - Present",
      content: "The Community Support Program is our flagship initiative focused on providing comprehensive support to families facing economic hardships. Through this program, we offer food assistance, educational resources, and mental health counseling to help individuals and families navigate challenging times. Our team of volunteers has dedicated countless hours to ensuring that community members have access to the resources they need to thrive. The program has reached over 200 families so far, and we continue to expand our reach to support more individuals in need."
    },
    {
      id: 2,
      title: "Youth Mentorship Initiative",
      description: "Connecting at-risk youth with professional mentors to provide guidance and support for personal and academic development.",
      images: ["https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=500"],
      date: "January 2023 - Present",
      content: "Our Youth Mentorship Initiative pairs at-risk youth with caring, professional mentors who provide guidance, support, and encouragement. Mentors help young people navigate challenges, set goals, and develop skills for success in school and beyond. Through regular meetings and activities, mentors build relationships based on trust and mutual respect, creating a safe space for growth and learning. The program also includes workshops on topics like communication, conflict resolution, and career planning. Since launching in January 2023, we've formed 45 mentor-mentee relationships that are making a real difference in young lives."
    },
    {
      id: 3,
      title: "Digital Inclusion Workshop",
      description: "Teaching essential digital skills to seniors and disadvantaged groups to bridge the digital divide.",
      images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&h=500"],
      date: "March 2023 - August 2023",
      content: "The Digital Inclusion Workshop was designed to address the growing digital divide affecting seniors and disadvantaged communities. Over a six-month period, we conducted weekly workshops teaching essential digital skills including computer basics, internet navigation, email communication, and online safety. Participants received hands-on training with provided devices and personalized support from our tech-savvy volunteers. By the end of the program, 85% of participants reported feeling more confident using digital technologies and better equipped to access online services. The workshops created not only technical skills but also new social connections among participants who continue to support each other's digital learning journey."
    },
    {
      id: 4,
      title: "Accessibility Renovation Project",
      description: "Helping modify homes for individuals with disabilities to improve accessibility and independence.",
      images: ["https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&h=500"],
      date: "September 2022 - May 2023",
      content: "Our Accessibility Renovation Project focused on modifying homes for individuals with disabilities to enhance their independence and quality of life. Working with local contractors and volunteers, we completed renovations for 12 families, including installing ramps, widening doorways, adapting bathrooms, and making kitchens more accessible. Each renovation was customized to address the specific needs of the resident, ensuring that the modifications would make a meaningful difference in their daily lives. The project not only improved physical accessibility but also helped recipients feel more connected to their communities as they gained greater mobility and independence within their own homes."
    },
    {
      id: 5,
      title: "Career Readiness Program",
      description: "Comprehensive job training and placement services for individuals facing barriers to employment.",
      images: ["https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&h=500"],
      date: "February 2022 - Present",
      content: "The Career Readiness Program provides comprehensive support to individuals facing barriers to employment. Through a combination of skills training, resume building, interview preparation, and job placement assistance, we help participants prepare for and secure meaningful employment. The program also addresses barriers such as transportation, childcare, and professional attire. Our employer partners provide job shadowing and internship opportunities that often lead to permanent positions. Since its inception, the program has helped over 75 individuals secure employment with an 85% retention rate after six months. We continue to expand the program to include specialized training for high-demand fields and additional support services."
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter projects based on search term
  const filteredProjects = projectsData.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-purple text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
              <p className="text-xl">
                Discover the initiatives and programs we've developed to support our community
                and create positive change.
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
              placeholder="Search projects..."
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
                featured={index === 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No projects found matching your search.
              </p>
            </div>
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default Projects;
