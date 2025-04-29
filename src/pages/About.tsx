import { Brain, BookOpen, Heart, Briefcase, FileText } from 'lucide-react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  // Kategorie wsparcia z ikonami
  const supportCategories = [
    {
      title: "Wsparcie zdrowia psychicznego",
      icon: <Brain className="h-12 w-12 text-foundation-green" />,
      description: "Grupy terapeutyczne, spotkania indywidualne",
    },
    {
      title: "Edukacja",
      icon: <BookOpen className="h-12 w-12 text-foundation-green" />,
      description: "Organizujemy szkolenia oraz kursy",
    },
    {
      title: "Integracja",
      icon: <Heart className="h-12 w-12 text-foundation-green" />,
      description: "Pomoc w integracji ze społeczeństwem, wsparcie w budowaniu więzi rodzinnych",
    },
    {
      title: "Pomoc w karierze",
      icon: <Briefcase className="h-12 w-12 text-foundation-green" />,
      description: "Wsparcie w znalezieniu pracy (doradca zawodowy, pisanie CV, przygotowanie do rozmowy)",
    },
  ];

  // Przyczyny wykluczenia społecznego
  const exclusionCauses = [
    "Niski poziom wykształcenia i ograniczony dostęp do nauki",
    "Ubóstwo i trudności ekonomiczne",
    "Niepełnosprawność i przewlekłe schorzenia",
    "Uzależnienia",
    "Dyskryminacja i uprzedzenia",
    "Brak wsparcia społecznego",
    "Ograniczony dostęp do nowoczesnych technologii",
  ];

  return (
    <>
      {/* Sekcja hero */}
      <section className="relative bg-foundation-brown text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">O nas</h1>
              <p className="text-xl">
                Pomagamy osobom zagrożonym wykluczeniem. Razem tworzymy szanse na godne życie.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Nasza misja */}
      <SectionContainer id="our-story">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <img
              src={import.meta.env.BASE_URL + "help_s.jpg"}
              alt="Odzyskajmy Foundation team"
              className="rounded-lg shadow-lg"
            />
          </FadeIn>
          <FadeIn direction="left">
            <h2 className="text-3xl font-bold mb-6 text-foundation-brown">Nasza misja</h2>
            <p className="mb-4">
              Fundacja Odzyskajmy została powołana, aby odpowiedzieć na rosnące potrzeby
              osób zagrożonych wykluczeniem społecznym. Jej założyciele dostrzegli
              luki w systemach wsparcia i postanowili stworzyć organizację,
              która realnie zmienia życie tych, którzy potrzebują pomocy.
            </p>
            <p className="mb-4">
              Od samego początku nieustannie pracujemy nad rozwojem programów,
              które odpowiadają nie tylko na bieżące potrzeby, ale także
              oferują długoterminowe rozwiązania pomagające odbudować życie
              i reintegrować osoby dotknięte wykluczeniem.
            </p>
            <p>
              Wierzymy, że każdy zasługuje na szansę na godne życie, niezależnie od okoliczności.
              To przekonanie stanowi fundament naszych działań i napędza Fundację Odzyskajmy.
            </p>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Profesjonalna współpraca */}
      <SectionContainer id="collaboration" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Profesjonalna współpraca</SectionTitle>
        <FadeIn>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 mb-8">
            <p className="mb-4 text-lg">
              W ramach działalności naszej fundacji współpracujemy z profesjonalistami między innymi z
              zakresu zdrowia psychicznego (psychologami, terapeutami, socjologami, psychoterapeutami), prawa
              (adwokatami, doradcami podatkowymi), doradcami zawodowymi oraz trenerami terapeutycznymi.
            </p>
            <div className="bg-foundation-light dark:bg-gray-600 p-4 rounded-md border-l-4 border-foundation-green">
              <p className="text-sm font-semibold">
                * Fundacja nie jest kancelarią prawną i nie świadczy usług prawnych w rozumieniu ustawy 
                z dnia 6 lipca 1982 r. o Radcach prawnych, ustawy z dnia 26 maja 1982 r. 
                Prawo o adwokaturze. W razie potrzeby Fundacja zapewnia usługi pośrednictwa i 
                doradztwa ogólnego we współpracy z kancelariami prawnymi, prawnikami, radcami prawnymi, 
                adwokatami i innymi osobami świadczącymi usługi prawne.
              </p>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      {/* Jak wspieramy (działamy) */}
      <SectionContainer id="how-we-work">
        <SectionTitle>Jak wspieramy (działamy):</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {supportCategories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 100}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center h-full">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foundation-brown">{category.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{category.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="bg-foundation-green/10 dark:bg-gray-700 rounded-lg p-6">
            <p className="text-lg mb-4">
              Nasze podejście jest holistyczne i spersonalizowane. 
              Rozumiemy, że każda osoba ma unikalne potrzeby i wyzwania. 
              Dlatego opracowujemy spersonalizowane plany wsparcia, 
              które odnoszą się do wielu aspektów sytuacji danej osoby.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      {/* Wykluczenie społeczne */}
      <SectionContainer id="social-exclusion" bgColor="bg-foundation-light dark:bg-gray-800">
        <SectionTitle>Zrozumienie wykluczenia społecznego</SectionTitle>
        <div className="grid md:grid-cols-2 gap-10">
          <FadeIn direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foundation-brown">
                Czym jest wykluczenie społeczne?
              </h3>
              <p className="mb-6">
                Wykluczenie społeczne to proces, w wyniku którego osoby lub grupy 
                są częściowo lub całkowicie pozbawione możliwości pełnego uczestnictwa 
                w życiu społecznym. Ma to wpływ na sfery ekonomiczne, społeczne, polityczne 
                i kulturowe, ograniczając dostęp do usług i szans niezbędnych do godnego życia.
              </p>
              <p className="mb-6">
                Osoby doświadczające wykluczenia społecznego często napotykają na wiele trudności
                jednocześnie, co tworzy błędne koło utrudniające wyjście z tej sytuacji bez
                zewnętrznego wsparcia.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foundation-brown">
                Najczęstsze powody wykluczenia
              </h3>
              <ul className="space-y-3">
                {exclusionCauses.map((cause, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-foundation-green text-white text-center mr-3 flex-shrink-0">
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

      {/* Dokumenty fundacji */}
      <SectionContainer id="documents">
        <SectionTitle>Dokumenty fundacji</SectionTitle>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg mb-8">
              Działamy z zachowaniem pełnej przejrzystości. 
              Poniżej znajdują się nasze oficjalne dokumenty, które przedstawiają 
              misję, wartości oraz zasady działania Fundacji.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Statut */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-foundation-green" />
                <h3 className="text-xl font-bold mb-3">Statut</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Oficjalny dokument prawny, który ustanawia fundament 
                  i strukturę naszej fundacji.
                </p>
                <Button variant="secondary" className="w-full">
                  <a
                    href={
                      import.meta.env.BASE_URL + 
                      "201210_statut-fundacji_odzyskajmy-poprawiony.pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    Pobierz
                  </a>
                </Button>
              </div>

              {/* Polityka prywatności */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-foundation-green" />
                <h3 className="text-xl font-bold mb-3">Polityka prywatności</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Dokument określający sposoby gromadzenia, przetwarzania
                  i ochrony danych osobowych.
                </p>
                <Button variant="secondary" className="w-full">
                  <a
                    href={
                      import.meta.env.BASE_URL + 
                      "Polityka-prywatności-Fundacji-Odzyskajmy.pl_20200217.pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    Pobierz
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </>
  );
};

export default AboutUs;
