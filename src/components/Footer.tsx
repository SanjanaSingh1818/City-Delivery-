import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    { icon: Phone, title: 'اتصل بنا', info: '+965 67771782' },
    { icon: Mail, title: 'راسلنا', info: 'info@kuwaitexpress.com' },
    { icon: MapPin, title: 'نخدم', info: 'جميع محافظات الكويت' }
  ];

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Full-screen image above footer */}
      <div
        className="w-full h-[100px] bg-cover bg-center"
        style={{
          backgroundImage: "url('footer.png')" // Replace with your image path
        }}
      ></div>

      {/* Footer */}
      <footer ref={footerRef} className="bg-foreground text-white pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Contact Information */}
          <div className="border-t border-white/20 pt-12 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h5 className="font-semibold mb-1">{contact.title}</h5>
                    <p className="text-white/80">{contact.info}</p>
                  </div>
                );
              })}
            </div>

            {/* Main CTA */}
            <div className="text-center">
              <Button
                onClick={() => window.open('https://wa.me/96567771782', '_blank')}
                size="lg"
                className="btn-whatsapp text-lg py-4 px-8"
              >
                <MessageCircle className="ml-3 h-6 w-6" />
                ابدأ التوصيل معنا الآن
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8 md:space-x-reverse space-y-4 md:space-y-0">
              
              <div className="text-center md:text-right">
                <p className="text-white/80">
                  © 2025 سيتي دليفري - جميع الحقوق محفوظة
                </p>
              </div>

              <div className="text-center">
                <p className="text-white/70">
                  بدعم من{" "}
                  <a 
                    href="https://genesisvirtue.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    dir="ltr"
                    className="underline hover:text-white transition-colors"
                  >
                    Genesis Virtue
                  </a>
                </p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-white/60 text-sm">
                  صُمم بـ ❤️ لخدمة أهل الكويت
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
