import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { MessageCircle, Phone, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  const whatsappNumbers = [
    { number: '67771782' },
    { number: '41142201' },
    { number: '52552233' },
    { number: '55335131' },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, logoRef.current], {
      opacity: 0,
      y: 50,
    });

    const particles = particlesRef.current?.children;
    if (particles) {
      gsap.to(particles, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 2, from: "random" }
      });
    }

    const floatingEls = floatingElementsRef.current?.children;
    if (floatingEls) {
      gsap.to(floatingEls, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(4, 8)",
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      });
    }

    gsap.to(logoRef.current?.querySelector('.logo-inner'), {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        const titleText = "تهمك السرعة والدقة بتوصيل طلباتك؟";
        gsap.to(titleRef.current, {
          text: { value: titleText, delimiter: "" },
          duration: 2,
          ease: "none"
        });
      }
    }, "-=0.8")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4");

    const buttons = buttonsRef.current?.querySelectorAll('button');
    if (buttons) {
      gsap.fromTo(buttons,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)", stagger: 0.1, delay: 2 }
      );
    }
  }, []);

  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/965${number}`, '_blank');
  };

  const handleCallClick = (number: string) => {
    window.location.href = `tel:+965${number}`;
  };

  return (
    <>
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 py-14 relative overflow-hidden bg-center bg-cover"
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-8 h-8 text-white/20"><Sparkles className="w-full h-full" /></div>
          <div className="absolute top-40 left-16 w-6 h-6 text-white/15"><Zap className="w-full h-full" /></div>
          <div className="absolute bottom-32 right-32 w-10 h-10 text-white/25"><Sparkles className="w-full h-full" /></div>
          <div className="absolute top-60 right-60 w-4 h-4 text-white/20"><Zap className="w-full h-full" /></div>
          <div className="absolute bottom-60 left-40 w-7 h-7 text-white/18"><Sparkles className="w-full h-full" /></div>
        </div>

        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-20 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
          <div className="absolute bottom-40 right-24 w-12 h-12 bg-primary/20 rounded-full blur-md"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-primary/30 rounded-full blur-sm"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div ref={logoRef} className="mb-8">
            <div className="w-40 h-40 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 hover:scale-105 transition-transform duration-300">
              <div className="logo-inner w-32 h-32 bg-gradient-to-br from-white to-white/90 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <img src="logo.jpg" alt="Daily Delivery Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h1 ref={titleRef} className="hero-title text-white mb-6"></h1>
          <p ref={subtitleRef} className="hero-subtitle text-white/90 mb-12 max-w-3xl mx-auto">
            سائقين منتشرين بمعظم مناطق الكويت - نوصل طلباتك بسرعة ودقة عالية
          </p>

          <div ref={buttonsRef} className="max-w-md mx-auto">
            <Button onClick={() => handleWhatsAppClick(whatsappNumbers[0].number)} size="lg" className="bg-[#256f80] hover:bg-[#1e5a68] w-full text-lg py-4 group">
              <MessageCircle className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              اطلب من سيتي دليفري الآن
            </Button>
          </div>

          <div className="mt-12 text-white/80 text-sm">
            <p>⚡ توصيل في أقل من ساعة | 🎯 دقة عالية | 🚚 تغطية شاملة للكويت</p>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <div className="bg-[#256f80] text-white py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {whatsappNumbers.map((contact, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <Button onClick={() => handleWhatsAppClick(contact.number)} className="bg-white text-[#256f80] hover:bg-gray-200 w-full">
                <MessageCircle className="ml-2 h-5 w-5" /> واتساب
              </Button>
              <Button onClick={() => handleCallClick(contact.number)} variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 w-full">
                <Phone className="ml-2 h-4 w-4" /> اتصال
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
