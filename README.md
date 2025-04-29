# Wdrażanie na produkcję

## 1. Sklonowanie i budowa

```bash
git clone <repo-url>
cd <repo-folder>
npm install
npm run build
```

Po wykonaniu npm run build w katalogu <repo-folder> powstaje:
```
<repo-folder>/
├── dist/            # zbudowane pliki React najpierw tutaj
│   ├── assets/
│   ├── favicon.ico
│   └── index.html   # główny punkt wejścia przeniesiony dalej
├── public/          # katalog publiczny z .htaccess i send_mail.php
│   ├── send_mail.php
│   └── .htaccess
├── src/             # źródła React
├── vite.config.ts
├── tailwind.config.ts
├── package.json
└── ...              # inne pliki projektu
```

## 2. Przygotowanie struktury na serwerze
Na serwerze Apache (np. w katalogu public_html/) powinieneś mieć końcowy widok:
```
public_html/
├── index.html          # skopiowane z dist/index.html
├── assets/             # skopiowane z dist/assets/
├── favicon.ico         # skopiowane z dist/favicon.ico
├── send_mail.php       # z katalogu public/ twojego repo
├── .htaccess           # z katalogu public/ twojego repo
└── (opcjonalne inne zasoby)
```

Uwaga: możesz po prostu wypakować zawartość dist/ do public_html/, a następnie skopiować do niego send_mail.php i .htaccess.

## 3. Konfiguracja Apache
DocumentRoot powinien wskazywać na Twój katalog public_html/:
```
<VirtualHost *:80>
  ServerName twojadomena.pl
  DocumentRoot /ścieżka/do/public_html
  <Directory /ścieżka/do/public_html>
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

Włącz mod_rewrite i zrestartuj:
```bash
a2enmod rewrite
service apache2 restart
```

Sprawdź .htaccess (z katalogu public/):
```
IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```