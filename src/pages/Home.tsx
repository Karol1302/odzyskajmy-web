import { Heart, Users, Globe, Accessibility } from 'lucide-react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import GoalCard from '@/components/home/GoalCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import { projectsData } from '@/data/projectsData';

const Home = () => {
  const latestProject = [...projectsData].sort((a, b) => b.id - a.id)[0];

  return (
    <>
      <section className="home-hero relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src= {import.meta.env.BASE_URL + "sunset2.png"}
            alt="Sunset over mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4">
          <div className="max-w-2xl text-white text-center">
            <FadeIn direction="up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Fundacja ODZYSKAJMY.PL
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
              description:
                "Pomoc społeczna, w tym pomoc rodzinom i osobom w trudnej sytuacji życiowej oraz wyrównanie szans tych rodzin i osób",
              icon: <Heart className="h-6 w-6" />,
              image: import.meta.env.BASE_URL + "spoleczna_s.jpg"
            },
            {
              title: "Reintegracja społeczna",
              description:
                "Działalność na rzecz integracji i reintegracji zawodowej i społecznej osób zagrożonych wykluczeniem społecznym i wykluczonych społecznie",
              icon: <Users className="h-6 w-6" />,
              image: import.meta.env.BASE_URL + "reintegracja_s.png",
            },
            {
              title: "Integracja europejska",
              description:
                "Promowanie integracji europejskiej w aspekcie m.in. współpracy edukacyjnej i kulturalnej, upowszechniania sportu, ochrony środowiska",
              icon: <Globe className="h-6 w-6" />,
              image: import.meta.env.BASE_URL + "unia_s.png",
            },
            {
              title: "Wsparcie i dostępność",
              description:
                "Działania na rzecz osób niepełnosprawnych i ich rodzin w celu zapewnienia równych szans i dostępności.",
              icon: <Accessibility className="h-6 w-6" />,
              image: import.meta.env.BASE_URL + "niepełnosprawnosci_s.png",
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
            <h3 className="text-2xl font-bold mb-4 text-foundation-brown">
              {latestProject.title}
            </h3>
            <div className="mb-4 text-gray-600 dark:text-gray-400">
              {latestProject.date}
            </div>
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
      {/* <SectionContainer id="social-media" bgColor="bg-foundation-light dark:bg-gray-800">
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
                Testowy wpis dla przykładu na stronie...
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
        </div>
      </SectionContainer> */}

      {/* CTA / Zachęta do wsparcia */}
      <SectionContainer>
        <FadeIn>
          <div className="bg-foundation-green-light dark:bg-gray-700 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foundation-brown">Wesprzyj Nas</h3>
            <p className="mb-6">
              Twoje wsparcie ma realny wpływ na rozwój naszych projektów i pomoc osobom potrzebującym.
            </p>
            <Link to="/donate">
              <Button className="bg-foundation-green text-white hover:bg-foundation-green/90">
                Przekaż darowiznę
              </Button>
            </Link>
          </div>
        </FadeIn>
      </SectionContainer>
    </>
  );
};

export default Home;