import FadeIn from '@/components/ui/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';

const Donate = () => {
  return (
    <>
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Wesprzyj nas</h1>
            <p className="text-xl max-w-3xl">
              Dzięki Twojej darowiźnie możemy kontynuować nasze działania,
              wspierać osoby potrzebujące i rozwijać nowe projekty.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionContainer>
        <FadeIn>
          <SectionTitle>Jak możesz pomóc?</SectionTitle>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-6">
              Każda, nawet najmniejsza, wpłata pozwala nam realizować naszą misję.  
              Poniżej znajdziesz numer rachunku bankowego, na który możesz dokonać przelewu.  
              Dziękujemy za Twoje zaangażowanie!
            </p>
            <div className="bg-foundation-green-light dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-2 text-foundation-brown">Numer rachunku:</h3>
              <p className="text-lg font-mono mb-4">12 3456 7890 1234 5678 9012 3456</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Fundacja Odzyskajmy<br/>
                ul. Dworcowa 3, 34-300 Żywiec
              </p>
            </div>
            <p>
              Jeśli masz dodatkowe pytania dotyczące wsparcia finansowego, prosimy o kontakt pod adresem:{" "}
              <a
                href="mailto:kontakt@odzyskajmy.pl"
                className="text-foundation-green hover:underline"
              >
                kontakt@odzyskajmy.pl
              </a>
            </p>
          </div>
        </FadeIn>
      </SectionContainer>
    </>
  );
};

export default Donate;