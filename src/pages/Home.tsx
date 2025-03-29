
import { Heart, Users, Globe, Accessibility } from 'lucide-react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import GoalCard from '@/components/home/GoalCard';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for the latest project
  const latestProject = {
    id: 1,
    title: "Community Support Program",
    description: "Our latest initiative focuses on providing essential resources and support to families affected by recent economic challenges.",
    images: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500"],
    date: "June 2023 - Present",
  };

  // Statutory goals with icons
  const goals = [
    {
      title: "Social Assistance",
      description: "Helping families and individuals in difficult situations and equalizing opportunities for all.",
      icon: <Heart className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "Social Reintegration",
      description: "Activities to promote professional and social reintegration of those at risk of social exclusion.",
      icon: <Users className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "European Integration",
      description: "Promoting European integration through educational, cultural cooperation, sport, and environmental protection.",
      icon: <Globe className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "Disability Support",
      description: "Activities for people with disabilities and their families to ensure equal opportunities and accessibility.",
      icon: <Accessibility className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&h=500",
    },
  ];

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1920&h=1080"
            alt="Sunset over mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4">
          <div className="max-w-2xl text-white text-center">
            <FadeIn direction="up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Building a Better Future Together
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <p className="text-xl md:text-2xl mb-8 text-white">
                Odzyskajmy Foundation is dedicated to helping people in need and creating opportunities for everyone.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/projects">
                  <Button size="lg" className="bg-foundation-green hover:bg-foundation-green/90 text-white">
                    Our Projects
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-foundation-brown text-white hover:bg-foundation-brown/90">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Statutory Goals Section */}
      <SectionContainer id="goals" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Our Statutory Goals</SectionTitle>
        <FadeIn>
          <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
            We are committed to making a meaningful difference in the lives of those facing challenges. 
            Our foundation focuses on these key areas to create positive change:
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => (
            <GoalCard
              key={goal.title}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
              image={goal.image}
              delay={index * 100}
            />
          ))}
        </div>
      </SectionContainer>

      {/* Latest Project Section */}
      <SectionContainer id="latest-project">
        <SectionTitle>Our Latest Project</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeIn direction="right">
            <img
              src={latestProject.images[0]}
              alt={latestProject.title}
              className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
            />
          </FadeIn>
          <FadeIn direction="left">
            <h3 className="text-2xl font-bold mb-4 text-foundation-brown">{latestProject.title}</h3>
            <div className="mb-4 text-gray-600 dark:text-gray-400">{latestProject.date}</div>
            <p className="text-lg mb-6">{latestProject.description}</p>
            <p className="mb-6">
              Through this initiative, we've been able to provide support to over 200 families, 
              offering food assistance, educational resources, and mental health counseling.
              Our team of volunteers has dedicated more than 1,000 hours to this project.
            </p>
            <Link to={`/projects/${latestProject.id}`}>
              <Button>Learn More About This Project</Button>
            </Link>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Social Media Section */}
      <SectionContainer id="social-media" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Connect With Us</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=64&h=64"
                  alt="Odzyskajmy Foundation"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-foundation-brown">Odzyskajmy Foundation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
              <p className="mb-4">
                We're excited to announce our upcoming community workshop series! 
                Join us for free sessions on career development, financial literacy, 
                and mental wellbeing. Everyone is welcome! 
                #CommunitySupport #Odzyskajmy
              </p>
              <img
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&h=500"
                alt="Community workshop"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm pt-2 border-t">
                <span>45 Likes</span>
                <span>12 Comments</span>
                <span>8 Shares</span>
              </div>
            </div>
          </FadeIn>
          <div className="text-center mt-8">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline">Follow Us For More Updates</Button>
            </a>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Home;
