export interface Project {
    id: number;
    title: string;
    description: string; // Krótki opis
    content: string;     // Pełen opis
    images: string[];
    date: string;
    allowSubscription?: boolean;  
  }
  
  export const projectsData: Project[] = [
    {
      id: 6,
      title: "EKO ŻYWIEC",
      description: "EKO ŻYWIEC razem dla zielonej. Przyszłości ZMIENIAJ ŚWIAT LOKALNIE. Warsztaty edukacyjne dla uczniów szkół podstawowych oraz średnich",
      content: `EKO ŻYWIEC

EKO ŻYWIEC razem dla zielonej przyszłości
ZMIENIAJ ŚWIAT LOKALNIE
03.03.2025 – 29.06.2025

Warsztaty edukacyjne dla uczniów szkół podstawowych i średnich o tematyce:

poprawa jakości powietrza
gospodarka o obiegu zamkniętym
recykling
ochrona zasobów wodnych
22.04.2025 Dzień Ziemi – Akcja sprzątania miasta: uczniowie szkół podstawowych i średnich w Żywcu wezmą udział w sprzątaniu miasta.

Każda szkoła przystępująca do projektu EKO ŻYWIEC otrzyma od Fundacji sadzonki drzew, które uczniowie będą mogli zasadzić przy szkole. Takie działanie wpłynie pozytywnie na poprawę jakości powietrza i wzbogaci zieleń miejską, szczególnie wokół szkół.


FUNDACJA ODZYSKAJMY.PL

Projekt dofinansowany przez Wojewódzki Fundusz Ochrony Środowiska i Gospodarki Wodnej w Katowicach`,
      images: [
        import.meta.env.BASE_URL + "EKOZYWIEC_poster.png"
      ],
      date: "29.06.2025",
      allowSubscription: false, 
    },
    {
      id: 5,
      title: "NOWE HORYZONTY",
      description: "Edukacja i wsparcie zatrudnienia osób z niepełnosprawnościami",
      content: `NOWE HORYZONTY
  “NOWE HORYZONTY” – Edukacja i wsparcie zatrudnienia osób z niepełnosprawnościami
  Ten projekt jest kierowany zarówno do Pracodawców jak i Osób z niepełnosprawnością. 
  Jego celem jest przybliżenie Pracodawcom tematu zatrudniania osób z niepełnosprawnością a osobom z niepełnosprawnością pomóc w poszukiwaniu pracy. 
  Jeśli jesteś w wieku między 18 lat a 60 lat i poszukujesz pracy, ale ze względu na bariery środowiskowe nie możesz znaleźć zatrudnienia, to zapraszamy Cię
  na spotkania informacyjne dzięki któremu dowiesz się:
  
  jak napisać poprawnie CV, aby przedsiębiorca zaprosił Cię na rozmowę kwalifikacyjną,
  
  jak i gdzie szukać pracy,
  
  jak odpowiadać na ogłoszenia o pracę.
  
  Na spotkaniu przeprowadzimy wstępną rozmowę kwalifikacyjną, abyś się nie stresował przed tą właściwą, – odpowiemy na Twoje pytania dotyczące poszukiwania pracy`,
      images: [
        import.meta.env.BASE_URL + "nh_s.png",
        import.meta.env.BASE_URL + "slaskie_s.jpg"
      ],
      date: "04.04.2025",
      allowSubscription: true, 
    },
    {
      id: 2,
      title: "Warsztaty Integracyjne “Razem w Kulturze”",
      description: "Integracyjne warsztaty artystyczne, teatralne i muzyczne",
      content: `Inicjatywa polegała na organizacji cyklicznych warsztatów artystycznych, teatralnych i muzycznych, które promują integrację osób z niepełnosprawnością z resztą społeczeństwa. Uczestnicy mogą rozwijać swoje talenty, nawiązać nowe relacje oraz wspólnie tworzyć projekty kulturalne, co sprzyja budowaniu otwartego i inkluzywnego społeczeństwa. Projekt jest realizowany dzięki współpracy z domami i centrami kultury w Żywcu, Katowicach i Gliwicach. Projekt jest prowadzony w trybie ciągłym bez ponoszenia kosztów ze strony Wnioskodawcy. Jedynym wkładem Wnioskodawcy w realizację przedsięwzięcia jest wkład osobowy (praca wolontariuszy) w ilości 5 osób.`,
      images: [
        import.meta.env.BASE_URL + "razem_w_kulturze.jpg"
      ],
      date: "Zakończony",
      allowSubscription: true, 
    },
    {
      id: 3,
      title: "Centrum Wsparcia Psychologicznego",
      description: "Bezpłatne konsultacje psychologiczne, grupy wsparcia i warsztaty rozwoju osobistego",
      content: `Projekt zakładał utworzenie ośrodka oferującego bezpłatne konsultacje psychologiczne, grupy wsparcia oraz warsztaty rozwoju osobistego dla osób z niepełnosprawnością. Celem jest wzmocnienie ich zdrowia psychicznego, budowanie pewności siebie oraz przeciwdziałanie izolacji społecznej. Wnioskodawca rozpoczął pracę nad ośrodkiem od stycznia 2024 r. W tym czasie Wnioskodawca wybrał lokalizację ośrodka (Żywiec woj. Śląskie), wyselekcjonował specjalistów, rozpoczął kampanię informacyjną o idei powstania ośrodka oraz jest w trakcie realizacji kampanii fundraisingowej skierowanej do darczyńców korporacyjnych.`,
      images: [
        import.meta.env.BASE_URL + "centrum_wsparcia.jpg"
      ],
      date: "Zakończony",
      allowSubscription: true, 
    },
    {
      id: 4,
      title: "Program Aktywnej Rehabilitacji Zawodowej",
      description: "Wsparcie osób z niepełnosprawnością w powrocie na rynek pracy",
      content: `Celem projektu było wsparcie osób z niepełnosprawnością w powrocie na rynek pracy poprzez organizację szkoleń zawodowych, warsztatów umiejętności miękkich oraz indywidualne doradztwo zawodowe. Dzięki temu uczestnicy mogli zwiększyć swoje szanse na zatrudnienie i integrację społeczną. Projekt objął finalnie 10 osób. Został w całości sfinansowany dzięki środkom finansowym fundatora Organizacji.`,
      images: [
        import.meta.env.BASE_URL + "aktywna_rehabilitacja.jpg"
      ],
      date: "Zakończony",
      allowSubscription: true, 
    },
    {
      id: 1,
      title: "Program Edukacyjno-Rozwojowy “Akademia Rozwoju Młodych Talentów”",
      description: "Wspieranie młodzieży w rozwijaniu talentów i umiejętności",
      content: `Fundacja zrealizowała inicjatywę dedykowaną wspieraniu młodzieży w rozwijaniu ich talentów i umiejętności. Celem projektu było zwiększenie dostępu do specjalistycznych warsztatów, zajęć pozalekcyjnych i programów mentoringowych dla uczniów szkół średnich oraz studentów. W ramach programu uczestnicy mieli możliwość uczestnictwa w zajęciach z zakresu przedmiotów ścisłych, sztuki, przedsiębiorczości oraz technologii. Projekt objął łącznie 32 młode osoby w latach 2023–2024 i był realizowany we współpracy z lokalnymi szkołami oraz uniwersytetami. Inicjatywa była finansowana ze środków pochodzących ze strony fundatora Wnioskodawcy oraz dzięki wsparciu od prywatnych darczyńców. Niebagatelny w projekcie był również udział wolontariuszy Wnioskodawcy. Program kontynuuje swoje działania, angażując wykwalifikowanych mentorów i ekspertów branżowych, co pozwala uczestnikom zdobywać nowe umiejętności i budować swoje ścieżki kariery.`,
      images: [
        import.meta.env.BASE_URL + "akademia_rozwoju.jpg"
      ],
      date: "Zakończony",
      allowSubscription: true, 
    },
  ];
  