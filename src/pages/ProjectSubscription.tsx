
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import { toast } from "@/components/ui/use-toast";
import FadeIn from '@/components/ui/animations/FadeIn';

// Define the form schema with validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  dataSharing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data sharing to continue.",
  }),
  personalData: z.boolean().refine((val) => val === true, {
    message: "You must agree to personal data usage to continue.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ProjectSubscription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      dataSharing: false,
      personalData: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      console.log("Form values:", values);
      // In a real app, you would send the data to your backend here
      
      // Wait for 1 second to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      // Navigate back to the project page
      navigate(`/projects/${id}`);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                          <Input placeholder="podaj swoje nazwisko" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numer telefonu</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Podaj swój numer telefonu" {...field} />
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
                          <Input type="email" placeholder="Wpisz swój email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dataSharing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Zgadzam się na udostępnienie moich danych (...)
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="personalData"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the processing of my personal data in accordance with the Privacy Policy.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wysyłanie...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Wyślij
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  );
};

export default ProjectSubscription;
