
import { Brain, BookOpen, Heart, Briefcase } from 'lucide-react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';

const AboutUs = () => {
  // Support categories with icons
  const supportCategories = [
    {
      title: "Mental Health",
      icon: <Brain className="h-12 w-12 text-foundation-purple" />,
      description: "We provide group therapy sessions and individual counseling to support mental wellbeing and emotional resilience.",
    },
    {
      title: "Education & Integration",
      icon: <BookOpen className="h-12 w-12 text-foundation-purple" />,
      description: "Our training sessions, courses, and workshops aim to build skills and foster community integration.",
    },
    {
      title: "Family Assistance",
      icon: <Heart className="h-12 w-12 text-foundation-purple" />,
      description: "We offer support in building and maintaining healthy family bonds through counseling and activities.",
    },
    {
      title: "Career Development",
      icon: <Briefcase className="h-12 w-12 text-foundation-purple" />,
      description: "Career counseling, CV writing assistance, and interview preparation to help find meaningful employment.",
    },
  ];

  // Social exclusion causes
  const exclusionCauses = [
    "Low education and limited access to learning opportunities",
    "Poverty and economic hardship",
    "Disability and chronic health conditions",
    "Substance abuse and addiction",
    "Long-term illness and mental health challenges",
    "Discrimination and prejudice",
    "Lack of social connections and support networks",
    "Limited access to technology and digital resources",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-foundation-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Odzyskajmy Foundation</h1>
              <p className="text-xl">
                Created with a mission to help individuals at risk of social exclusion and create 
                opportunities for a better future for all.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <SectionContainer id="our-story">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <img
              src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=600"
              alt="Odzyskajmy Foundation team"
              className="rounded-lg shadow-lg"
            />
          </FadeIn>
          <FadeIn direction="left">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              The Odzyskajmy Foundation was established to address the growing needs of individuals facing 
              social exclusion in our communities. Our founders recognized the gaps in support systems 
              and decided to create an organization that could make a meaningful difference.
            </p>
            <p className="mb-4">
              Since our beginning, we have worked tirelessly to develop programs that address 
              not just immediate needs, but also provide long-term solutions to help people rebuild 
              their lives and reintegrate into society.
            </p>
            <p>
              We believe that everyone deserves a chance to thrive, regardless of their background 
              or circumstances. This belief drives everything we do at the Odzyskajmy Foundation.
            </p>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Professional Collaboration Section */}
      <SectionContainer id="collaboration" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Professional Collaboration</SectionTitle>
        <FadeIn>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 mb-8">
            <p className="mb-4 text-lg">
              The Odzyskajmy Foundation collaborates with a network of legal professionals and experts 
              who provide invaluable guidance and support to our initiatives. Our partners include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Lawyers specializing in social welfare law</li>
              <li>Legal advisors with expertise in human rights</li>
              <li>Tax consultants helping with financial planning</li>
              <li>Restructuring experts assisting with organizational challenges</li>
              <li>Mental health professionals providing counseling services</li>
              <li>Educational specialists developing learning programs</li>
            </ul>
            <div className="bg-foundation-light dark:bg-gray-600 p-4 rounded-md border-l-4 border-foundation-purple">
              <p className="text-sm font-semibold">
                Disclaimer: The Odzyskajmy Foundation is not a legal firm. While we collaborate with legal 
                professionals, we do not provide formal legal advice. Our mission is to connect individuals 
                with appropriate resources and support.
              </p>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      {/* How We Work Section */}
      <SectionContainer id="how-we-work">
        <SectionTitle>How We Work (Support)</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {supportCategories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 100}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center h-full">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{category.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="bg-foundation-purple/10 dark:bg-gray-700 rounded-lg p-6">
            <p className="text-lg mb-4">
              Our approach is holistic and personalized. We understand that each individual has unique 
              needs and challenges. That's why we develop customized support plans that address multiple 
              aspects of a person's situation.
            </p>
            <p className="text-lg">
              Through our network of professionals and volunteers, we provide comprehensive support 
              that aims to remove barriers to social inclusion and create pathways to a better future.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      {/* Social Exclusion Section */}
      <SectionContainer id="social-exclusion" bgColor="bg-foundation-gray dark:bg-gray-800">
        <SectionTitle>Understanding Social Exclusion</SectionTitle>
        <div className="grid md:grid-cols-2 gap-10">
          <FadeIn direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-4">What Is Social Exclusion?</h3>
              <p className="mb-6">
                Social exclusion refers to the processes through which individuals or groups are 
                wholly or partially excluded from full participation in the society in which they live. 
                This exclusion impacts various aspects of life, including economic, social, political, 
                and cultural dimensions.
              </p>
              <p className="mb-6">
                People experiencing social exclusion often face multiple challenges simultaneously, 
                creating a cycle that can be difficult to break without external support and intervention.
              </p>
              <p>
                At the Odzyskajmy Foundation, we recognize the complex nature of social exclusion 
                and work to address both its root causes and its consequences through our comprehensive 
                support programs.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-4">Common Causes of Social Exclusion</h3>
              <ul className="space-y-3">
                {exclusionCauses.map((cause, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-foundation-purple text-white text-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Team Values Section */}
      <SectionContainer id="our-values">
        <SectionTitle>Our Values</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={100}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-bold mb-3 text-foundation-purple">Compassion</h3>
              <p>
                We approach our work with empathy and understanding, recognizing the dignity and worth 
                of every individual we serve.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-bold mb-3 text-foundation-purple">Inclusivity</h3>
              <p>
                We believe in creating environments where everyone feels welcomed, respected, and valued, 
                regardless of their background or circumstances.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-bold mb-3 text-foundation-purple">Empowerment</h3>
              <p>
                We aim to help individuals develop the skills, confidence, and resources they need to 
                take control of their lives and make positive changes.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  );
};

export default AboutUs;
