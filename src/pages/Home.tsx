import { Heart, Users, Globe, Accessibility } from 'lucide-react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import GoalCard from '@/components/home/GoalCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  // Tablica z danymi projektów – w przyszłości warto przenieść ją do oddzielnego pliku np. src/data/projectsData.ts
  const projectsData = [
    {
      id: 1,
      title: "Community Support Program",
      description: "Our latest initiative focuses on providing essential resources and support to families affected by recent economic challenges.",
      images: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500"],
      date: "June 2023 - Present",
      content: "The Community Support Program is our flagship initiative focused on providing comprehensive support to families facing economic hardships. Through this program, we offer food assistance, educational resources, and mental health counseling to help individuals and families navigate challenging times. Our team of volunteers has dedicated countless hours to ensuring that community members have access to the resources they need to thrive."
    },
    {
      id: 2,
      title: "Youth Mentorship Initiative",
      description: "Connecting at-risk youth with professional mentors to provide guidance and support for personal and academic development.",
      images: ["https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=500"],
      date: "January 2023 - Present",
      content: "Our Youth Mentorship Initiative pairs at-risk youth with caring, professional mentors who provide guidance, support, and encouragement. Mentors help young people navigate challenges, set goals, and develop skills for success in school and beyond."
    },
    {
      id: 3,
      title: "Digital Inclusion Workshop",
      description: "Teaching essential digital skills to seniors and disadvantaged groups to bridge the digital divide.",
      images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&h=500"],
      date: "March 2023 - August 2023",
      content: "The Digital Inclusion Workshop was designed to address the growing digital divide affecting seniors and disadvantaged communities. Over a six-month period, we conducted weekly workshops teaching essential digital skills including computer basics, internet navigation, email communication, and online safety."
    },
    {
      id: 4,
      title: "Accessibility Renovation Project",
      description: "Helping modify homes for individuals with disabilities to improve accessibility and independence.",
      images: ["https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&h=500"],
      date: "September 2022 - May 2023",
      content: "Our Accessibility Renovation Project focused on modifying homes for individuals with disabilities to enhance their independence and quality of life. Working with local contractors and volunteers, we completed renovations for 12 families."
    },
    {
      id: 5,
      title: "Career Readiness Program",
      description: "Comprehensive job training and placement services for individuals facing barriers to employment.",
      images: ["https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&h=500"],
      date: "February 2022 - Present",
      content: "The Career Readiness Program provides comprehensive support to individuals facing barriers to employment. Through a combination of skills training, resume building, interview preparation, and job placement assistance, we help participants prepare for and secure meaningful employment."
    },
  ];

  // Wybieramy najnowszy projekt – zakładamy, że projekt o największym id jest najnowszy
  const latestProject = [...projectsData].sort((a, b) => b.id - a.id)[0];

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://raw.githubusercontent.com/karol1302/odzyskajmy-web/gh-pages/public/sunset2.png" 
            alt="Sunset over mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4">
          <div className="max-w-2xl text-white text-center">
            <FadeIn direction="up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Fundacja Odzyskajmy
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <p className="text-xl md:text-2xl mb-8 text-white">
                Obrona Ciebie, Twoich praw i Twojej przyszłości
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <div className="flex flex-wrap justify-center gap-4">
              <Link to="/projects">
                <Button 
                  size="lg" 
                  className="bg-foundation-green hover:bg-foundation-green/90 text-white font-bold"
                >
                  Nasze Projekty
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-foundation-brown text-white hover:bg-foundation-brown/90 font-bold"
                >
                  Skontaktuj się
                </Button>
              </Link>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Statutory Goals Section */}
      <SectionContainer id="goals" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Cele statutowe fundacji</SectionTitle>
        <FadeIn>
          <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
            Nasza fundacja koncentruje się na tych kluczowych obszarach, aby tworzyć pozytywne zmiany:
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Pomoc społeczna",
              description: "Pomoc społeczna, w tym pomoc rodzinom i osobom w trudnej sytuacji życiowej oraz wyrównanie szans tych rodzin i osób",
              icon: <Heart className="h-6 w-6" />,
              image: "https://raw.githubusercontent.com/karol1302/odzyskajmy-web/gh-pages/public/spoleczna_s.jpg",
            },
            {
              title: "Reintegracja społeczna",
              description: "Działalność na rzecz integracji i reintegracji zawodowej i społecznej osób zagrożonych wykluczeniem społecznym i wykluczonych społecznie",
              icon: <Users className="h-6 w-6" />,
              image: "https://raw.githubusercontent.com/karol1302/odzyskajmy-web/gh-pages/public/reintegracja_s.png",
            },
            {
              title: "Integracja europejska",
              description: "Promowanie integracji europejskiej w aspekcie m.in. współpracy edukacyjnej i kulturalnej, upawszechniania sportu, ochrony środowiska",
              icon: <Globe className="h-6 w-6" />,
              image: "https://raw.githubusercontent.com/karol1302/odzyskajmy-web/gh-pages/public/unia_s.png",
            },
            {
              title: "Wsparcie i dostępność",
              description: "Działania na rzecz osób niepełnosprawnych i ich rodzin w celu zapewnienia równych szans i dostępności.",
              icon: <Accessibility className="h-6 w-6" />,
              image: "https://raw.githubusercontent.com/karol1302/odzyskajmy-web/gh-pages/public/niepełnosprawnosci_s.png",
            },
          ].map((goal, index) => (
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
        <SectionTitle>Nasz najnowszy projekt</SectionTitle>
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
            {/* Opis skrócony – używamy klasy Tailwind CSS line-clamp do ograniczenia liczby linii */}
            <p className="text-lg mb-6 line-clamp-3">
              {latestProject.description}
            </p>
            <Link to={`/projects/${latestProject.id}`}>
              <Button>Czytaj dalej</Button>
            </Link>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Social Media Section */}
      <SectionContainer id="social-media" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Nasza fundacja w social media</SectionTitle>
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
                  <h4 className="font-bold text-foundation-brown">Fundacja Odzyskajmy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
              <p className="mb-4">
                Testowy wpis dla przykładu na stronie
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
          {/* Możesz dodać dodatkowy przycisk/link do obserwowania fundacji w social media */}
        </div>
      </SectionContainer>
    </>
  );
};

export default Home;
