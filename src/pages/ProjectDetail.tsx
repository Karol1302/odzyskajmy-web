import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Mail } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock project data - in a real app, you would fetch this data from an API
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Community Support Program",
      description: "Providing essential resources and support to families affected by recent economic challenges.",
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500",
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&h=500",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&h=500",
      ],
      date: "June 2023 - Present",
      content: "The Community Support Program is our flagship initiative focused on providing comprehensive support to families facing economic hardships. Through this program, we offer food assistance, educational resources, and mental health counseling to help individuals and families navigate challenging times.\n\nOur team of dedicated volunteers has been working tirelessly to ensure that community members have access to the resources they need to thrive. We've established partnerships with local businesses, schools, and healthcare providers to create a network of support that addresses multiple aspects of wellbeing.\n\nKey components of the program include:\n\n- Food distribution centers operating weekly in three neighborhoods\n- Educational tutoring and homework assistance for children\n- Mental health counseling and support groups\n- Resource navigation assistance to connect families with additional services\n\nThe program has reached over 200 families so far, and we continue to expand our reach to support more individuals in need. Our goal is to not only address immediate needs but also to help build resilience and self-sufficiency within the community.\n\nThrough generous donations and volunteer support, we've been able to distribute over 15,000 pounds of food, provide 500+ hours of tutoring, and facilitate 300 counseling sessions since the program began.\n\nWe're constantly evaluating and improving our approach to ensure we're making the most significant positive impact possible."
    },
    {
      id: 2,
      title: "Youth Mentorship Initiative",
      description: "Connecting at-risk youth with professional mentors to provide guidance and support for personal and academic development.",
      images: [
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=500",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&h=500",
      ],
      date: "January 2023 - Present",
      content: "Our Youth Mentorship Initiative pairs at-risk youth with caring, professional mentors who provide guidance, support, and encouragement. Mentors help young people navigate challenges, set goals, and develop skills for success in school and beyond.\n\nThrough regular meetings and activities, mentors build relationships based on trust and mutual respect, creating a safe space for growth and learning. The program also includes workshops on topics like communication, conflict resolution, and career planning.\n\nSince launching in January 2023, we've formed 45 mentor-mentee relationships that are making a real difference in young lives. Many participants have shown improved academic performance, increased self-confidence, and better decision-making skills.\n\nThe program runs for a minimum of one year, allowing time for meaningful relationships to develop. Many mentors and mentees choose to continue their relationship beyond the official program period.\n\nOur mentors come from diverse professional backgrounds, including education, business, healthcare, and the arts. All mentors undergo thorough screening, training, and ongoing support to ensure they're equipped to make a positive impact.\n\nWe're particularly proud of the community that has formed among program participants, with regular group events fostering a sense of belonging and mutual support."
    },
    {
      id: 3,
      title: "Digital Inclusion Workshop",
      description: "Teaching essential digital skills to seniors and disadvantaged groups to bridge the digital divide.",
      images: [
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&h=500",
      ],
      date: "March 2023 - August 2023",
      content: "The Digital Inclusion Workshop was designed to address the growing digital divide affecting seniors and disadvantaged communities. Over a six-month period, we conducted weekly workshops teaching essential digital skills including computer basics, internet navigation, email communication, and online safety.\n\nParticipants received hands-on training with provided devices and personalized support from our tech-savvy volunteers. The curriculum was designed to be accessible to complete beginners while still offering value to those with some basic knowledge.\n\nWorkshop topics included:\n\n- Computer and smartphone basics\n- Internet navigation and search techniques\n- Email and communication tools\n- Online safety and privacy\n- Social media fundamentals\n- Accessing government services online\n- Digital health resources\n\nBy the end of the program, 85% of participants reported feeling more confident using digital technologies and better equipped to access online services. Many expressed that the workshops helped them feel more connected to family members and less isolated in an increasingly digital world.\n\nThe workshops created not only technical skills but also new social connections among participants who continue to support each other's digital learning journey. Several graduates of the program have returned as volunteer assistants for new workshop series.\n\nWe're exploring funding opportunities to offer this program again in additional locations, as the demand for digital skills training remains high."
    },
    {
      id: 4,
      title: "Accessibility Renovation Project",
      description: "Helping modify homes for individuals with disabilities to improve accessibility and independence.",
      images: [
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&h=500",
      ],
      date: "September 2022 - May 2023",
      content: "Our Accessibility Renovation Project focused on modifying homes for individuals with disabilities to enhance their independence and quality of life. Working with local contractors and volunteers, we completed renovations for 12 families, including installing ramps, widening doorways, adapting bathrooms, and making kitchens more accessible.\n\nEach renovation was customized to address the specific needs of the resident, ensuring that the modifications would make a meaningful difference in their daily lives. Our team conducted thorough assessments before planning renovations, consulting with occupational therapists when appropriate to identify the most impactful changes.\n\nTypes of modifications included:\n\n- Exterior ramps and lifts\n- Widened doorways and hallways\n- Bathroom modifications (grab bars, roll-in showers, raised toilets)\n- Kitchen adaptations (lowered counters, accessible cabinets)\n- Improved lighting and electrical controls\n- Flooring changes to improve mobility\n\nThe project not only improved physical accessibility but also helped recipients feel more connected to their communities as they gained greater mobility and independence within their own homes. Many participants reported significant improvements in their daily activities and overall quality of life.\n\nWe collaborated with several local businesses that donated materials and provided services at reduced rates, allowing us to maximize the impact of our funding. We're currently seeking additional funding to launch a second phase of the project to help more individuals with accessibility needs."
    },
    {
      id: 5,
      title: "Career Readiness Program",
      description: "Comprehensive job training and placement services for individuals facing barriers to employment.",
      images: [
        "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&h=500",
      ],
      date: "February 2022 - Present",
      content: "The Career Readiness Program provides comprehensive support to individuals facing barriers to employment. Through a combination of skills training, resume building, interview preparation, and job placement assistance, we help participants prepare for and secure meaningful employment.\n\nThe program addresses common barriers to employment such as lack of work experience, limited education, gaps in employment history, and circumstances like past incarceration or housing instability. We also provide practical support with transportation, childcare, and professional attire.\n\nOur employer partners provide job shadowing and internship opportunities that often lead to permanent positions. We maintain relationships with businesses across various industries to match participants with opportunities that fit their skills and interests.\n\nThe program consists of several components:\n\n- Skills assessment and career planning\n- Basic job readiness training\n- Industry-specific training in high-demand fields\n- Resume and cover letter development\n- Interview coaching and practice\n- Job search assistance\n- Post-placement support\n\nSince its inception, the program has helped over 75 individuals secure employment with an 85% retention rate after six months. Participants have found positions in healthcare, hospitality, manufacturing, retail, and administrative services.\n\nWe continue to expand the program to include specialized training for high-demand fields and additional support services. Our goal is to not just help participants find jobs, but to launch sustainable careers that provide stability and growth opportunities."
    },
  ];

  // Find the current project
  const currentProject = projectsData.find(project => project.id === Number(id));
  
  // Get related projects (excluding the current one)
  const relatedProjects = currentProject 
    ? projectsData.filter(project => project.id !== currentProject.id).slice(0, 3) 
    : [];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentProject) {
    return (
      <SectionContainer className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </SectionContainer>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <FadeIn>
            <Link to="/projects" className="inline-flex items-center text-white mb-8 hover:text-foundation-light transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
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
                    {currentProject.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${currentProject.title} - image ${index + 2}`}
                        className="w-full h-32 object-cover rounded-md shadow-sm"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {currentProject.content?.split('\n\n').map((paragraph, index) => (
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
                  <span className="mr-4 font-medium">Share this project:</span>
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
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Duration</h4>
                    <p>{currentProject.date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Focus Areas</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 bg-foundation-green text-white text-sm rounded-full">
                        {currentProject.id === 1 ? "Community Support" : 
                         currentProject.id === 2 ? "Youth" :
                         currentProject.id === 3 ? "Digital Skills" :
                         currentProject.id === 4 ? "Accessibility" : "Employment"}
                      </span>
                      <span className="px-3 py-1 bg-foundation-brown text-white text-sm rounded-full">
                        {currentProject.id === 1 ? "Family Welfare" : 
                         currentProject.id === 2 ? "Education" :
                         currentProject.id === 3 ? "Seniors" :
                         currentProject.id === 4 ? "Disability" : "Training"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Contact</h4>
                    <p>For more information about this project, please contact us at:</p>
                    <a href="mailto:projects@odzyskajmy.org" className="text-foundation-green hover:underline">
                      projects@odzyskajmy.org
                    </a>
                  </div>
                  <div className="pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/projects/${id}/subscribe`)}
                    >
                      Dołącz do projektu
                    </Button>
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
              <ProjectCard
                key={project.id}
                project={project}
                delay={index * 100}
              />
            ))}
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default ProjectDetail;
