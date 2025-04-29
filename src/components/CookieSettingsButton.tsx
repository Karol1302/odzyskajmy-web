// src/components/CookieSettingsButton.tsx
import React, { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'

interface CookiePreference {
  consent: 'all' | 'none'
}

const requiredCookiesInfo = [
  {
    id: 'sessionId',
    name: 'sessionId',
    description:
      'Ciasteczko sesyjne – umożliwia prawidłowe działanie strony oraz utrzymanie sesji użytkownika.',
  },
  {
    id: 'recaptcha',
    name: 'recaptcha',
    description:
      'Ciasteczko reCAPTCHA – umożliwia weryfikację, że formularz wysyłany jest przez człowieka.',
  },
]

const CookieSettingsButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preference, setPreference] = useState<CookiePreference | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookiePreferences')
    if (stored) {
      try {
        setPreference(JSON.parse(stored))
      } catch {
        localStorage.removeItem('cookiePreferences')
        setIsModalOpen(true)
      }
    } else {
      setIsModalOpen(true)
    }
  }, [])

  const handleSave = (consent: 'all' | 'none') => {
    const pref: CookiePreference = { consent }
    localStorage.setItem('cookiePreferences', JSON.stringify(pref))
    setPreference(pref)
    setIsModalOpen(false)
    window.location.reload()
  }

  return (
    <>
      {/* Ikona do ręcznego otwierania modal */}
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
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:items-end lg:justify-start lg:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md shadow-lg relative"
          >
            {/* Zamknij */}
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
              Strona korzysta wyłącznie z ciasteczek niezbędnych do działania i do obsługi reCAPTCHA.
            </p>

            <div className="mb-4 border p-4 rounded-lg dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-foundation-brown dark:text-foundation-brown">
                Wymagane ciasteczka
              </h3>
              {requiredCookiesInfo.map((c) => (
                <div key={c.id} className="mb-2">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    <code>{c.name}</code>
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{c.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleSave('none')}
                className="px-4 py-2 bg-black hover:bg-black/90 text-white rounded transition-colors duration-300"
              >
                Odrzuć wszystkie
              </button>
              <button
                onClick={() => handleSave('all')}
                className="px-4 py-2 bg-foundation-green hover:bg-foundation-green/90 text-white rounded transition-colors duration-300"
              >
                Zaakceptuj wszystkie
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieSettingsButton