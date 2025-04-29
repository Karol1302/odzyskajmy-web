import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import FadeIn from '@/components/ui/animations/FadeIn'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  const sanitizeInput = (input: string) =>
    input.replace(/<[^>]*>/g, '')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value),
    }))
  }

  useEffect(() => {
    const tryRender = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: SITE_KEY,
        })
        return true
      }
      return false
    }
    const interval = setInterval(() => {
      if (tryRender()) clearInterval(interval)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formData.website) return // honeypot

    const token = window.grecaptcha.getResponse()
    if (!token) {
      toast({ title: 'Proszę potwierdzić, że nie jesteś robotem', variant: 'destructive' })
      return
    }

    setIsSubmitting(true)
    const payload = { ...formData, recaptchaToken: token }

    try {
      const res = await fetch('/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const { status } = await res.json()
      if (res.ok && status === 'success') {
        toast({ title: 'Wiadomość wysłana', description: 'Dziękujemy za kontakt!' })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' })
        window.grecaptcha.reset()
      } else {
        toast({ title: 'Błąd wysyłki', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Błąd sieci', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Skontaktuj się z nami
              </h1>
              <p className="text-xl">
                Masz pytanie lub potrzebujesz pomocy? Jesteśmy tutaj, aby pomóc.
                Skontaktuj się z nami, a my odpowiemy tak szybko, jak to możliwe.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <SectionContainer bgColor="bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-1">
          <FadeIn delay={100}>
            <div className="bg-foundation-green-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-foundation-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foundation-brown">Telefon</h3>
              <a
                href="tel:+48123456789"
                className="text-foundation-green hover:underline"
              >
                +48 505 239 465
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-foundation-green-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-foundation-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foundation-brown">Email</h3>
              <a
                href="mailto:kontakt@odzyskajmy.pl"
                className="text-foundation-green hover:underline"
              >
                kontakt@odzyskajmy.pl
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="bg-foundation-green-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-foundation-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foundation-brown">Adres</h3>
              <address className="not-italic">
                ul. Dworcowa 3<br />
                Żywiec, Poland<br />
                34-300
              </address>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="bg-foundation-green-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-foundation-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foundation-brown">Godziny otwarcia</h3>
              <p>Poniedziałek – Piątek<br />8:00 – 17:00</p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Map + Form */}
      <SectionContainer bgColor="bg-foundation-light dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <FadeIn direction="right">
            <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.378259082072!2d19.190061515520867!3d49.68484925011258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47142625a42cae91%3A0xdc8f38ceb77a96ed!2sDworcowa%203%2C%2034-300%20%C5%BBywiec!5e0!3m2!1sen!2spl!4v1613577061716!5m2!1sen!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-foundation-brown">
                Wyślij wiadomość
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Imię i nazwisko <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Twoje imię i nazwisko"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Twój adres e-mail"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      Numer telefonu
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Twój numer kontaktowy"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      Temat <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Temat"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Wiadomość <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Treść wiadomości"
                    rows={5}
                    required
                  />
                </div>

                {/* recaptcha */}
                <div ref={recaptchaRef} />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  )
}

export default Contact
