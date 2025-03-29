import React, { useState } from 'react';
import { Cookie } from 'lucide-react';

interface CookiePreference {
  consent: 'all' | 'required' | 'none';
}

const CookieSettingsButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Przykładowe ciasteczko niezbędne – strona używa go do utrzymania sesji
  const requiredCookiesInfo = [
    {
      id: 'sessionId',
      name: 'sessionId',
      description:
        'Ciasteczko sesyjne – umożliwia prawidłowe działanie strony oraz utrzymanie sesji użytkownika.',
    },
  ];

  const handleSavePreference = (consent: 'all' | 'required' | 'none') => {
    // Przykładowa logika zapisywania preferencji ciasteczkowych – można zapisać ustawienia w localStorage lub wysłać do backendu
    localStorage.setItem('cookiePreferences', JSON.stringify({ consent }));
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 bg-foundation-green hover:bg-foundation-green/90 text-white rounded-full p-3 shadow-lg transition-opacity duration-300"
        aria-label="Zarządzaj ciasteczkami"
      >
        <Cookie className="h-6 w-6" />
      </button>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg shadow-lg relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Zamknij"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-foundation-brown dark:text-foundation-brown">
              Ustawienia ciasteczek
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Ta strona używa ciasteczek niezbędnych do prawidłowego działania (np. ciasteczko{' '}
              <code>sessionId</code>). Aby zobaczyć pełne informacje i zarządzać preferencjami, kliknij
              "Zarządzaj preferencjami".
            </p>

            {showDetails && (
              <div className="mb-4 border p-4 rounded-lg dark:border-gray-700">
                <h3 className="text-lg font-semibold text-foundation-brown dark:text-foundation-brown mb-2">
                  Używane ciasteczka
                </h3>
                {requiredCookiesInfo.map((cookie) => (
                  <div key={cookie.id} className="mb-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      <code>{cookie.name}</code>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {cookie.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!showDetails && (
              <button
                onClick={() => setShowDetails(true)}
                className="mb-4 text-sm text-foundation-green hover:underline"
              >
                Zarządzaj preferencjami
              </button>
            )}

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => handleSavePreference('all')}
                className="px-4 py-2 bg-foundation-green hover:bg-foundation-green/90 text-white rounded transition-colors duration-300"
              >
                Zaakceptuj wszystkie
              </button>
              <button
                onClick={() => handleSavePreference('required')}
                className="px-4 py-2 bg-foundation-brown hover:bg-foundation-brown/90 text-white rounded transition-colors duration-300"
              >
                Zaakceptuj tylko wymagane
              </button>
              <button
                onClick={() => handleSavePreference('none')}
                className="px-4 py-2 bg-black hover:bg-black/90 text-white rounded transition-colors duration-300"
              >
                Odrzuć
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieSettingsButton;
