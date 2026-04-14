import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Star, Heart, Zap, 
  MapPin, Phone, Mail, Menu, X,
  Sparkles, Shield, Users, TrendingUp
} from 'lucide-react';
import './App.css';
import { WhatsAppChat } from './components/WhatsAppChat';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-yellow/95 backdrop-blur-sm py-3' : 'py-6'}`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} className="font-display text-2xl lg:text-3xl text-ink hover:text-poppy transition-colors">
            House of Awesome
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('programs')} className="nav-link">Programs</button>
            <button onClick={() => scrollToSection('dance')} className="nav-link">Schedule</button>
            <button onClick={() => scrollToSection('values')} className="nav-link">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            <a href="https://wa.me/2347071460966?text=Hi!%20I'm%20interested%20in%20enrolling%20my%20child%20in%20House%20of%20Awesome%20programs." target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-3 px-6">
              Enroll
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-yellow z-[99] flex flex-col items-center justify-center gap-8 lg:hidden">
          <button onClick={() => scrollToSection('programs')} className="font-display text-3xl text-ink hover:text-poppy transition-colors">Programs</button>
          <button onClick={() => scrollToSection('dance')} className="font-display text-3xl text-ink hover:text-poppy transition-colors">Schedule</button>
          <button onClick={() => scrollToSection('values')} className="font-display text-3xl text-ink hover:text-poppy transition-colors">Pricing</button>
          <button onClick={() => scrollToSection('contact')} className="font-display text-3xl text-ink hover:text-poppy transition-colors">Contact</button>
          <a href="https://wa.me/2347071460966?text=Hi!%20I'm%20interested%20in%20enrolling%20my%20child%20in%20House%20of%20Awesome%20programs." target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">Enroll Now</a>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightPhotoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const hiStickerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });
      
      loadTl.fromTo(leftPhotoRef.current, 
        { x: '-60vw', rotate: -26, scale: 0.85, opacity: 0 },
        { x: 0, rotate: -12, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }
      )
      .fromTo(rightPhotoRef.current,
        { x: '60vw', rotate: 26, scale: 0.85, opacity: 0 },
        { x: 0, rotate: 10, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' },
        0.08
      )
      .fromTo(headlineRef.current,
        { y: '40vh', scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.18
      )
      .fromTo(hiStickerRef.current,
        { y: '-30vh', rotate: -20, scale: 0.6, opacity: 0 },
        { y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' },
        0.30
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.65
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([leftPhotoRef.current, rightPhotoRef.current, headlineRef.current, hiStickerRef.current, ctaRef.current], {
              opacity: 1, x: 0, y: 0, rotate: (i) => i === 0 ? -12 : i === 1 ? 10 : 0
            });
          }
        }
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '-55vw', rotate: -10, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(leftPhotoRef.current,
        { x: 0, rotate: -12, opacity: 1 },
        { x: '-70vw', rotate: -22, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(rightPhotoRef.current,
        { x: 0, rotate: 10, opacity: 1 },
        { x: '70vw', rotate: 22, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(hiStickerRef.current,
        { y: 0, opacity: 1 },
        { y: '-40vh', opacity: 0, ease: 'power2.in' },
        0.75
      )
      .fromTo(ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="section-pinned bg-yellow z-10">
      {/* Left Photo Sticker */}
      <div 
        ref={leftPhotoRef}
        className="absolute photo-sticker blob-1"
        style={{ left: '6vw', top: '18vh', width: '30vw', height: '34vh', transform: 'rotate(-12deg)' }}
      >
        <img src="/hero_dance_group.jpg" alt="Kids dancing" />
      </div>

      {/* Right Photo Sticker */}
      <div 
        ref={rightPhotoRef}
        className="absolute photo-sticker blob-2"
        style={{ right: '6vw', top: '18vh', width: '30vw', height: '34vh', transform: 'rotate(10deg)' }}
      >
        <img src="/hero_gymnastics_trio.jpg" alt="Kids doing gymnastics" />
      </div>

      {/* Hi Sticker */}
      <div 
        ref={hiStickerRef}
        className="absolute sticker sticker-red blob-3 px-6 py-3 font-display text-2xl"
        style={{ left: '18vw', top: '14vh' }}
      >
        Hi!
      </div>

      {/* Star Icon */}
      <div className="absolute icon-sticker w-16 h-16 animate-float" style={{ left: '8vw', top: '60vh' }}>
        <Star size={28} fill="white" />
      </div>

      {/* Heart Icon */}
      <div className="absolute icon-sticker w-20 h-20 animate-float-slow" style={{ right: '10vw', top: '62vh' }}>
        <Heart size={32} fill="white" />
      </div>

      {/* Headline Sticker */}
      <div 
        ref={headlineRef}
        className="absolute sticker sticker-white blob-1 flex flex-col items-center justify-center px-8 py-10"
        style={{ left: '50%', top: '52%', transform: 'translate(-50%, -50%)', width: '72vw', maxWidth: '980px' }}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink text-center leading-tight">
          House of Awesome
        </h1>
        <p className="font-body text-lg md:text-xl text-ink/80 mt-4 text-center">
          Dance • Gymnastics • Skating • Taekwondo
        </p>
      </div>

      {/* CTA Row */}
      <div 
        ref={ctaRef}
        className="absolute flex flex-col sm:flex-row gap-4"
        style={{ left: '50%', top: '78vh', transform: 'translateX(-50%)' }}
      >
        <a href="https://wa.me/2347071460966?text=Hi!%20I'm%20interested%20in%20enrolling%20my%20child%20in%20House%20of%20Awesome%20programs." target="_blank" rel="noopener noreferrer" className="btn-primary">
          Enroll Now
        </a>
        <button onClick={() => scrollToSection('programs')} className="btn-secondary">
          View Programs
        </button>
      </div>
    </section>
  );
}

// Programs Section
function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // Entrance (0% - 30%)
      scrollTl.fromTo(titleRef.current,
        { y: '-40vh', scale: 0.7, rotate: -6, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i % 2 === 0 ? '-60vw' : '60vw';
        const fromRotate = i % 2 === 0 ? -18 : 18;
        const toRotate = [-6, 6, 4, -4][i];
        
        scrollTl.fromTo(card,
          { x: fromX, rotate: fromRotate, opacity: 0 },
          { x: 0, rotate: toRotate, opacity: 1, ease: 'none' },
          0.05 + i * 0.03
        );
      });

      // Exit (70% - 100%)
      scrollTl.to(titleRef.current,
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const toX = i % 2 === 0 ? '-50vw' : '50vw';
        scrollTl.to(card,
          { x: toX, opacity: 0, ease: 'power2.in' },
          0.7 + i * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const programs = [
    { name: 'Dance', image: '/programs_dance.jpg', rotate: -6 },
    { name: 'Gymnastics', image: '/programs_gymnastics.jpg', rotate: 6 },
    { name: 'Skating', image: '/programs_skating.jpg', rotate: 4 },
    { name: 'Taekwondo', image: '/programs_taekwondo.jpg', rotate: -4 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="programs" className="section-pinned bg-yellow z-20">
      {/* Title Sticker */}
      <div 
        ref={titleRef}
        className="absolute sticker sticker-black blob-2 px-8 py-6"
        style={{ left: '50%', top: '10vh', transform: 'translateX(-50%)' }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-white text-center">
          Programs built for energy, skill & joy.
        </h2>
      </div>

      <p className="absolute font-body text-ink/70 text-center" style={{ left: '50%', top: '22vh', transform: 'translateX(-50%)' }}>
        Ages 4–14 • Beginner-friendly • Weekly classes
      </p>

      {/* Program Cards */}
      {programs.map((program, i) => (
        <div
          key={program.name}
          ref={el => { cardsRef.current[i] = el; }}
          className="absolute cursor-pointer group"
          style={{
            left: i % 2 === 0 ? '8vw' : 'auto',
            right: i % 2 === 1 ? '8vw' : 'auto',
            top: i < 2 ? '28vh' : '58vh',
            width: '38vw',
            maxWidth: '500px',
            transform: `rotate(${program.rotate}deg)`
          }}
          onClick={() => scrollToSection(program.name.toLowerCase())}
        >
          <div className="photo-sticker blob-1 overflow-hidden group-hover:shadow-stickerHover transition-all duration-300">
            <img src={program.image} alt={program.name} className="w-full h-48 md:h-64 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-ink py-3 px-4">
              <span className="font-display text-xl md:text-2xl text-ink">{program.name}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative Icons */}
      <div className="absolute icon-sticker w-14 h-14 animate-float" style={{ left: '5vw', top: '50vh' }}>
        <Zap size={24} fill="white" />
      </div>
      <div className="absolute icon-sticker w-12 h-12 animate-float-slow" style={{ right: '6vw', top: '48vh' }}>
        <Star size={20} fill="white" />
      </div>
    </section>
  );
}

// Activity Spotlight Component
function ActivitySpotlight({ 
  id, 
  title, 
  label, 
  description, 
  image, 
  imagePosition,
  zIndex 
}: { 
  id: string;
  title: string; 
  label: string; 
  description: string; 
  image: string; 
  imagePosition: 'left' | 'right';
  zIndex: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // Entrance (0% - 30%)
      const photoFromX = imagePosition === 'right' ? '70vw' : '-70vw';
      const photoFromRotate = imagePosition === 'right' ? 22 : -22;
      const photoToRotate = imagePosition === 'right' ? 8 : -8;

      scrollTl.fromTo(photoRef.current,
        { x: photoFromX, rotate: photoFromRotate, scale: 0.85, opacity: 0 },
        { x: 0, rotate: photoToRotate, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      const headlineFromX = imagePosition === 'right' ? '-60vw' : '60vw';
      const headlineFromRotate = imagePosition === 'right' ? -10 : 10;

      scrollTl.fromTo(headlineRef.current,
        { x: headlineFromX, rotate: headlineFromRotate, scale: 0.8, opacity: 0 },
        { x: 0, rotate: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(labelRef.current,
        { scale: 0, rotate: -12, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Exit (70% - 100%)
      const photoToX = imagePosition === 'right' ? '70vw' : '-70vw';
      const headlineToX = imagePosition === 'right' ? '-60vw' : '60vw';

      scrollTl.to(photoRef.current,
        { x: photoToX, rotate: imagePosition === 'right' ? 18 : -18, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(headlineRef.current,
        { x: headlineToX, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.to([labelRef.current, ctaRef.current],
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id={id} className="section-pinned bg-yellow" style={{ zIndex }}>
      {/* Photo Sticker */}
      <div 
        ref={photoRef}
        className="absolute photo-sticker"
        style={{ 
          [imagePosition]: '6vw', 
          top: '18vh', 
          width: '56vw', 
          height: '62vh',
          transform: `rotate(${imagePosition === 'right' ? 8 : -8}deg)`
        }}
      >
        <img src={image} alt={label} className="w-full h-full object-cover" />
      </div>

      {/* Headline Sticker */}
      <div 
        ref={headlineRef}
        className="absolute sticker sticker-black blob-1 px-8 py-8"
        style={{ 
          [imagePosition === 'right' ? 'left' : 'right']: '6vw', 
          top: '22vh', 
          width: '34vw',
          maxWidth: '450px'
        }}
      >
        <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
          {title}
        </h2>
        <p className="font-body text-white/80 mt-4 text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Label Sticker */}
      <div 
        ref={labelRef}
        className="absolute label-sticker"
        style={{ 
          [imagePosition === 'right' ? 'left' : 'right']: '10vw', 
          top: '52vh' 
        }}
      >
        {label}
      </div>

      {/* CTA Button */}
      <button 
        ref={ctaRef}
        onClick={scrollToContact}
        className="absolute btn-primary"
        style={{ 
          [imagePosition === 'right' ? 'left' : 'right']: '6vw', 
          top: '62vh' 
        }}
      >
        Book a trial
      </button>

      {/* Decorative Icons */}
      <div className="absolute icon-sticker w-14 h-14 animate-float" 
        style={{ [imagePosition]: '4vw', top: '75vh' }}>
        <Sparkles size={24} fill="white" />
      </div>
    </section>
  );
}

// Party Section
function PartySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // Entrance (0% - 30%)
      scrollTl.fromTo(photoRef.current,
        { y: '80vh', scale: 0.75, rotate: -6, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(headlineRef.current,
        { y: '40vh', scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(badgeRef.current,
        { scale: 0, rotate: 14, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // Exit (70% - 100%)
      scrollTl.to(photoRef.current,
        { y: '-60vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(headlineRef.current,
        { y: '40vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.to([badgeRef.current, ctaRef.current],
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="party" className="section-pinned bg-yellow z-[80]">
      {/* Center Photo Sticker */}
      <div 
        ref={photoRef}
        className="absolute photo-sticker blob-1"
        style={{ 
          left: '50%', 
          top: '48%', 
          transform: 'translate(-50%, -50%)', 
          width: '72vw', 
          maxWidth: '980px',
          height: '50vh'
        }}
      >
        <img src="/party_confetti.jpg" alt="Celebration" className="w-full h-full object-cover" />
      </div>

      {/* Headline Sticker */}
      <div 
        ref={headlineRef}
        className="absolute sticker sticker-black blob-2 px-8 py-6"
        style={{ left: '50%', top: '72vh', transform: 'translateX(-50%)' }}
      >
        <h2 className="font-display text-3xl md:text-5xl text-white text-center">
          Celebrate every win.
        </h2>
        <p className="font-body text-white/80 mt-2 text-center text-sm md:text-base">
          Birthday parties, belt ceremonies, and showcase days—memories that stick.
        </p>
      </div>

      {/* Celebrate Badge */}
      <div 
        ref={badgeRef}
        className="absolute sticker sticker-red blob-3 px-6 py-3 font-display text-xl"
        style={{ right: '12vw', top: '20vh' }}
      >
        Celebrate
      </div>

      {/* CTA Row */}
      <div 
        ref={ctaRef}
        className="absolute flex gap-4"
        style={{ left: '50%', top: '88vh', transform: 'translateX(-50%)' }}
      >
        <button onClick={scrollToContact} className="btn-primary">
          Plan a Party
        </button>
        <button onClick={scrollToContact} className="btn-secondary">
          See Events
        </button>
      </div>

      {/* Decorative Icons */}
      <div className="absolute icon-sticker w-14 h-14 animate-float" style={{ left: '8vw', top: '25vh' }}>
        <Star size={24} fill="white" />
      </div>
      <div className="absolute icon-sticker w-16 h-16 animate-float-slow" style={{ right: '8vw', top: '70vh' }}>
        <Heart size={28} fill="white" />
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.values-heading',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.value-sticker',
        { y: 40, opacity: 0, rotate: -3 },
        {
          y: 0, opacity: 1, rotate: 0, stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.values-photo',
        { x: '-12vw', rotate: -6, opacity: 0 },
        {
          x: 0, rotate: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.values-quote',
        { x: '12vw', rotate: 6, opacity: 0 },
        {
          x: 0, rotate: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 10%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const values = [
    { icon: Shield, title: 'Safety-first facilities', desc: 'Certified equipment & trained staff' },
    { icon: TrendingUp, title: 'Skill progressions that stick', desc: 'Structured learning paths' },
    { icon: Users, title: 'A community that cheers', desc: 'Supportive environment for all' },
  ];

  return (
    <section ref={sectionRef} id="values" className="relative bg-yellow py-20 z-[90]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="values-heading mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-ink mb-4">
            Built for kids. Trusted by parents.
          </h2>
          <p className="font-body text-lg text-ink/70 max-w-2xl">
            Small class sizes, certified coaches, and clear progress tracking—so you always know how your child is growing.
          </p>
        </div>

        {/* Value Stickers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((value, i) => (
            <div 
              key={value.title}
              className="value-sticker sticker sticker-white blob-1 p-6 md:p-8 hover:shadow-stickerHover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <value.icon size={40} className="text-poppy mb-4" />
              <h3 className="font-display text-xl md:text-2xl text-ink mb-2">{value.title}</h3>
              <p className="font-body text-ink/70 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Photo and Quote */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="values-photo photo-sticker blob-2 w-full lg:w-1/2 h-64 md:h-80">
            <img src="/values_kid_smile.jpg" alt="Happy child" className="w-full h-full object-cover" />
          </div>
          <div className="values-quote sticker sticker-black blob-3 p-8 w-full lg:w-1/2">
            <p className="font-display text-2xl md:text-3xl text-white italic">
              "My daughter actually looks forward to class every week."
            </p>
            <p className="font-body text-white/60 mt-4">— Sarah M., parent</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.contact-photo',
        { x: '12vw', rotate: 12, opacity: 0 },
        {
          x: 0, rotate: 6, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formspree.io/f/xyklzenp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          childAge: formData.childAge,
          message: formData.message,
          _subject: `New inquiry from ${formData.name} - House of Awesome`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError('Something went wrong. Please try again or contact us via WhatsApp.');
      }
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative bg-ink py-20 z-[100]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Column */}
          <div className="contact-content w-full lg:w-1/2">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
              Ready to join the fun?
            </h2>
            <p className="font-body text-lg text-white/70 mb-8">
              Tell us a little about your child and we'll recommend the best class to start.
            </p>

            {submitted ? (
              <div className="sticker sticker-yellow blob-1 p-8 text-center">
                <Sparkles size={48} className="text-poppy mx-auto mb-4" />
                <h3 className="font-display text-2xl text-ink mb-2">Message Sent!</h3>
                <p className="font-body text-ink/70">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                    {submitError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Child's Age"
                    className="form-input"
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    min="4"
                    max="14"
                  />
                </div>
                <textarea
                  placeholder="Tell us about your child and what they're interested in..."
                  className="form-input min-h-[120px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                />
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-white/70">
                <Mail size={20} className="text-poppy" />
                <a href="mailto:houseofawesomee@gmail.com" className="font-body hover:text-poppy transition-colors">
                  houseofawesomee@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Phone size={20} className="text-poppy" />
                <a href="tel:+2347071460966" className="font-body hover:text-poppy transition-colors">
                  +234 707 146 0966
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <MapPin size={20} className="text-poppy" />
                <span className="font-body">18 Adebayo Doherty Raod, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="font-body text-sm text-white/50 mb-4">Follow us</p>
              <div className="flex gap-3">
                <a href="https://instagram.com/houseofawesomee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-10 h-10 hover:bg-poppy transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/Contemporary%20Dance%20Classes" target="_blank" rel="noopener noreferrer" className="icon-sticker w-10 h-10 hover:bg-poppy transition-colors" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@houseofawesomee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-10 h-10 hover:bg-poppy transition-colors" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://threads.net/@houseofawesmee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-10 h-10 hover:bg-poppy transition-colors" aria-label="Threads">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.439 2.525-8.49C5.848 1.233 8.606.028 12.186.004h.017c3.58.024 6.334 1.205 8.184 3.509 1.645 2.05 2.495 4.904 2.523 8.48v.017c-.03 3.579-.879 6.439-2.525 8.49-1.646 2.27-4.404 3.475-7.984 3.5h-.215zm.182-21.727c-2.961.026-5.195.913-6.64 2.635-1.336 1.59-2.019 3.88-2.03 6.805v.018c.01 2.925.694 5.215 2.03 6.805 1.445 1.722 3.679 2.61 6.64 2.635 2.961-.026 5.195-.913 6.64-2.635 1.336-1.59 2.019-3.88 2.03-6.805v-.018c-.01-2.925-.694-5.215-2.03-6.805-1.445-1.722-3.679-2.61-6.64-2.635zm-.027 9.734c-.318.001-.57.26-.57.578v3.495c0 .318.252.577.57.577.318 0 .576-.26.576-.577v-3.495c0-.318-.258-.578-.576-.578zm0-4.122c-2.303 0-4.17 1.867-4.17 4.17s1.867 4.17 4.17 4.17c2.302 0 4.17-1.867 4.17-4.17s-1.868-4.17-4.17-4.17zm0 6.762c-1.429 0-2.592-1.163-2.592-2.592 0-1.428 1.163-2.591 2.592-2.591 1.428 0 2.591 1.163 2.591 2.591 0 1.429-1.163 2.592-2.591 2.592z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Photo Column */}
          <div className="contact-photo photo-sticker blob-1 w-full lg:w-1/2 h-80 md:h-[500px] sticky top-24">
            <img src="/contact_coach.jpg" alt="Coach high-fiving child" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-ink border-t-4 border-white/10 py-12 z-[100]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-3xl text-white mb-2">House of Awesome</h3>
            <p className="font-body text-white/60">Where every class feels like a party.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => scrollToSection('programs')} className="nav-link text-white/70 hover:text-poppy">Programs</button>
            <button onClick={() => scrollToSection('dance')} className="nav-link text-white/70 hover:text-poppy">Schedule</button>
            <button onClick={() => scrollToSection('values')} className="nav-link text-white/70 hover:text-poppy">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link text-white/70 hover:text-poppy">Contact</button>
          </div>

          <div className="flex gap-4">
            <a href="https://instagram.com/houseofawesomee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-12 h-12 hover:bg-poppy transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com/Contemporary%20Dance%20Classes" target="_blank" rel="noopener noreferrer" className="icon-sticker w-12 h-12 hover:bg-poppy transition-colors" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://tiktok.com/@houseofawesomee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-12 h-12 hover:bg-poppy transition-colors" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="https://threads.net/@houseofawesmee" target="_blank" rel="noopener noreferrer" className="icon-sticker w-12 h-12 hover:bg-poppy transition-colors" aria-label="Threads">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.439 2.525-8.49C5.848 1.233 8.606.028 12.186.004h.017c3.58.024 6.334 1.205 8.184 3.509 1.645 2.05 2.495 4.904 2.523 8.48v.017c-.03 3.579-.879 6.439-2.525 8.49-1.646 2.27-4.404 3.475-7.984 3.5h-.215zm.182-21.727c-2.961.026-5.195.913-6.64 2.635-1.336 1.59-2.019 3.88-2.03 6.805v.018c.01 2.925.694 5.215 2.03 6.805 1.445 1.722 3.679 2.61 6.64 2.635 2.961-.026 5.195-.913 6.64-2.635 1.336-1.59 2.019-3.88 2.03-6.805v-.018c-.01-2.925-.694-5.215-2.03-6.805-1.445-1.722-3.679-2.61-6.64-2.635zm-.027 9.734c-.318.001-.57.26-.57.578v3.495c0 .318.252.577.57.577.318 0 .576-.26.576-.577v-3.495c0-.318-.258-.578-.576-.578zm0-4.122c-2.303 0-4.17 1.867-4.17 4.17s1.867 4.17 4.17 4.17c2.302 0 4.17-1.867 4.17-4.17s-1.868-4.17-4.17-4.17zm0 6.762c-1.429 0-2.592-1.163-2.592-2.592 0-1.428 1.163-2.591 2.592-2.591 1.428 0 2.591 1.163 2.591 2.591 0 1.429-1.163 2.592-2.591 2.592z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="font-body text-white/40 text-sm">
            © 2026 House of Awesome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.03 && value <= r.end + 0.03);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.2, max: 0.4 },
          delay: 0,
          ease: 'power2.inOut',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <ProgramsSection />
        <ActivitySpotlight 
          id="dance"
          title="Move to the beat."
          label="Dance"
          description="Hip-hop, ballet, and freestyle classes that build rhythm, confidence, and stage presence."
          image="/spotlight_dance.jpg"
          imagePosition="right"
          zIndex={30}
        />
        <ActivitySpotlight 
          id="gymnastics"
          title="Flip, balance, fly."
          label="Gymnastics"
          description="Strength, flexibility, and coordination—taught through progressions that keep kids safe and motivated."
          image="/spotlight_gymnastics.jpg"
          imagePosition="left"
          zIndex={40}
        />
        <ActivitySpotlight 
          id="skating"
          title="Roll with confidence."
          label="Skating"
          description="Learn to skate with control, speed, and style—indoor rink, certified coaches, all levels welcome."
          image="/spotlight_skating.jpg"
          imagePosition="right"
          zIndex={50}
        />
        <ActivitySpotlight 
          id="taekwondo"
          title="Discipline meets fun."
          label="Taekwondo"
          description="Focus, respect, and movement—classes that build character as much as technique."
          image="/spotlight_taekwondo.jpg"
          imagePosition="left"
          zIndex={60}
        />
        <PartySection />
        <ValuesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* WhatsApp Chat Widget */}
      <WhatsAppChat
        phoneNumber="+2347071460966"
        message="Hi! I'm interested in learning more about House of Awesome programs."
      />
    </div>
  );
}

export default App;
