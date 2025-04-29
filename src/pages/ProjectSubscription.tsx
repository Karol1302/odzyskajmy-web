import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SectionContainer } from '@/components/ui/section-container'
import { toast } from '@/components/ui/use-toast'
import FadeIn from '@/components/ui/animations/FadeIn'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Imię musi być długie na co najmniej 2 litery.' }),
  lastName:  z.string().min(2, { message: 'Nazwisko musi być długie na co najmniej 2 litery.' }),
  phone:     z.string().min(9, { message: 'Proszę podać poprawny numer telefonu.' }),
  email:     z.string().email({ message: 'Proszę podać poprawny adres e-mail.' }),
  dataSharing: z.boolean().refine(v => v, { message: 'Należy zaznaczyć zgodę na przetwarzanie danych.' }),
  personalData: z.boolean().refine(v => v, { message: 'Należy zaznaczyć, że zgadza się z regulaminem oraz polityką prywatności.' }),
})
type FormValues = z.infer<typeof formSchema>

export default function ProjectSubscription() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      dataSharing: false,
      personalData: false,
    },
  })

  // Render reCAPTCHA widget once script loads
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

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    // honeypot not included here since formData isn't tracked separately
    // 1. get reCAPTCHA token
    const token = window.grecaptcha.getResponse()
    if (!token) {
      toast({ title: 'Proszę potwierdzić, że nie jesteś robotem', variant: 'destructive' })
      setIsSubmitting(false)
      return
    }

    // payload
    const payload = {
      ...values,
      subject: `Zgłoszenie do projektu ${id}`,
      recaptchaToken: token,
    }

    try {
      const res = await fetch('/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const { status } = await res.json()
      if (res.ok && status === 'success') {
        toast({ title: 'Zapisano!', description: 'Dziękujemy za zgłoszenie.' })
        window.grecaptcha.reset()
        navigate(`/projects/${id}`)
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
      <section className="bg-foundation-brown text-white py-16">
        <div className="container-custom">
          <FadeIn>
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="inline-flex items-center text-white mb-8 hover:text-foundation-light transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Wróć do projektu
            </button>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Dołącz</h1>
            <p className="text-xl max-w-2xl">
              Dołącz do projektu! Wypełnij formularz
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionContainer>
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imię</FormLabel>
                        <FormControl>
                          <Input placeholder="Podaj swoje imię" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nazwisko</FormLabel>
                        <FormControl>
                          <Input placeholder="Podaj swoje nazwisko" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numer telefonu</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Telefon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adres email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dataSharing"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>
                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Fundację Odzyskajmy...
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalData"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>
                        Zapoznałem/łam się z polityką prywatności oraz akceptuję regulamin...
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* honeypot (not rendered) */}
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} />

                {/* reCAPTCHA v2 */}
                <div ref={recaptchaRef} />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        />
                      </svg>
                      Wysyłanie...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Wyślij <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  )
}
