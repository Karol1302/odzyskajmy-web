
import { useState } from 'react';
import { SectionContainer, SectionTitle } from '@/components/ui/section-container';
import FadeIn from '@/components/ui/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-foundation-purple text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl">
                Have a question or need assistance? We're here to help.
                Reach out to us and we'll respond as soon as possible.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <SectionContainer bgColor="bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FadeIn delay={100}>
            <div className="bg-foundation-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-foundation-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="mb-2">Call us directly:</p>
              <a 
                href="tel:+48123456789" 
                className="text-foundation-purple hover:underline"
                aria-label="Call us at +48 123 456 789"
              >
                +48 123 456 789
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-foundation-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-foundation-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="mb-2">Write to us at:</p>
              <a 
                href="mailto:contact@odzyskajmy.org" 
                className="text-foundation-purple hover:underline"
                aria-label="Email us at contact@odzyskajmy.org"
              >
                contact@odzyskajmy.org
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-foundation-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-foundation-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="mb-2">Visit our office:</p>
              <address className="not-italic">
                123 Foundation Street<br />
                Warsaw, Poland<br />
                00-001
              </address>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-foundation-light dark:bg-gray-800 rounded-lg p-6 text-center h-full">
              <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-foundation-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hours</h3>
              <p className="mb-2">We're available:</p>
              <p>Monday - Friday<br />9:00 AM - 5:00 PM</p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Map and Contact Form */}
      <SectionContainer bgColor="bg-foundation-gray dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map */}
          <FadeIn direction="right">
            <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.35438500345!2d20.896111699999998!3d52.233055399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sus!4v1625142045729!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Odzyskajmy Foundation location map"
                aria-label="Google Maps showing the location of Odzyskajmy Foundation in Warsaw, Poland"
              ></iframe>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="left">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Having a problem? We will get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      aria-required="true"
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
                      placeholder="Your email"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    required
                    aria-required="true"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How can I get help from the foundation?</h3>
                <p>
                  If you need assistance, the best way to start is by contacting us through 
                  this form, calling our phone number, or visiting our office during business hours. 
                  We'll assess your situation and connect you with the appropriate resources or programs.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How can I volunteer or donate?</h3>
                <p>
                  We welcome both volunteers and donations. To get involved as a volunteer, 
                  please contact us with information about your skills and availability. 
                  For donations, you can contribute through our website or contact us directly 
                  for more information about specific needs.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Do you provide legal advice?</h3>
                <p>
                  While we collaborate with legal professionals, the Odzyskajmy Foundation 
                  is not a legal firm and does not provide formal legal advice. We can, however, 
                  connect you with appropriate legal resources and professionals who can help 
                  with your specific situation.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </>
  );
};

export default Contact;
