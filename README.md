# Fundacja Odzyskajmy – instrukcja uruchomienia i wdrożenia

Ten projekt to aplikacja front‑endowa napisana w React z wykorzystaniem
Tailwind CSS oraz Vite. W katalogu `public` znajdują się także pliki PHP
odpowiedzialne za obsługę formularza kontaktowego.

## Struktura katalogów

├── src/                 # kod źródłowy React/TypeScript
├── public/              # statyczne zasoby dołączane przy budowie
│   ├── projects/        # dane projektów w formacie JSON wraz z obrazami
│   ├── send_mail.php    # skrypt obsługujący formularz
│   ├── cacert.pem       # certyfikat używany przez cURL w PHP
│   └── .htaccess        # konfiguracja Apache
├── .env                 # zmienne środowiskowe (np. klucz reCAPTCHA)
├── dist/                # wynik komendy `npm run build`
└── ...
```

Plik `.env` jest ignorowany przez Git. Musi on znajdować się lokalnie przed
uruchomieniem budowania, ponieważ wartości w nim zapisane zostaną wstrzyknięte
w procesie kompilacji.

## Uruchomienie w trybie deweloperskim

1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Umieść plik `.env` w katalogu głównym projektu.
3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:8080`.

## Budowanie wersji produkcyjnej

Aby przygotować aplikację do publikacji, wykonaj:

```bash
npm run build
```

Po zakończeniu budowania w katalogu `dist/` pojawi się gotowa wersja strony.
Do katalogu tego kopiowane są również wszystkie pliki z `public/`.

## Publikacja na serwerze (np. dhosting)

1. Zbuduj projekt komendą `npm run build`.
2. Na serwerze przygotuj katalog `public_html` (lub inny katalog, który jest
   katalogiem głównym witryny).
3. Skopiuj **całą zawartość** katalogu `dist/` do `public_html/`:
   ```bash
   cp -r dist/* /sciezka/do/public_html/
   ```
4. Dodatkowo skopiuj z repozytorium następujące pliki do `public_html/`:
   - `.env` – jeżeli konfiguracja jest wymagana po stronie serwera,
   - `public/send_mail.php`
   - `public/cacert.pem`
   - `public/.htaccess` (w efekcie plik na serwerze będzie się nazywał `.htaccess`).
5. Upewnij się, że struktura `public_html/projects/` zawiera wszystkie pliki JSON
   oraz obrazy projektów skopiowane podczas kroku 3.
6. Ścieżki w aplikacji zakładają, że strona jest dostępna w katalogu głównym
domeny (tj. `DocumentRoot` wskazuje na `public_html`).

Po wgraniu plików strona powinna być od razu dostępna. Skrypt PHP będzie
wysyłał wiadomości z adresu zdefiniowanego w `send_mail.php`, korzystając z
lokalnego programu `sendmail`. Jeżeli plik `.env` zawiera klucz reCAPTCHA,
nie zapomnij go również umieścić na serwerze.

## Aktualizacja danych projektów

Dane każdego projektu znajdują się w osobnym pliku JSON w katalogu
`public/projects/<id>/<id>.json`. Lista dostępnych projektów znajduje się w
`public/projects/projects.json`. Aby dodać nowy projekt lub zmodyfikować istniejący,
wystarczy edytować odpowiednie pliki JSON i (opcjonalnie) dodać obrazy w tym samym
katalogu. Nie ma potrzeby ponownego budowania aplikacji, o ile zmieniasz jedynie
te pliki statyczne na serwerze.

---

Powyższe kroki pozwolą uruchomić i wdrożyć aplikację Fundacji Odzyskajmy zarówno
na lokalnym komputerze, jak i na hostingu produkcyjnym.