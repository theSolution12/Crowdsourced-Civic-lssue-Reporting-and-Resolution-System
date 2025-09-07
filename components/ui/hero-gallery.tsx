"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { TextAnimate } from "./text-animate";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/gallery.png",
    alt: "Gallery showcase",
    title: "Gallery"
  },
  {
    src: "/globepplx.png",
    alt: "Global perspective",
    title: "Global View"
  },
  {
    src: "/Jharkhand folk.png",
    alt: "Jharkhand folk art",
    title: "Cultural Heritage"
  },
  {
    src: "/Slogan.png",
    alt: "Community members",
    title: "Community"
  },
  {
    src: "/shivling.png",
    alt: "Traditional art",
    title: "Tradition"
  },
  {
    src: "/aftereff.png",
    alt: "Creative effects",
    title: "Innovation"
  }
];

export default function HeroGallery() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const textElement = textRef.current;

    // Initial animation for text
    if (textElement) {
      gsap.fromTo(textElement.children, {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });
    }

    // Initial animation for cards
    gsap.fromTo(cards, {
      x: 100,
      opacity: 0,
      rotationY: 45,
    }, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });

    // Set up hover animations for each card
    cards.forEach((card, index) => {
      if (!card) return;

      const image = card.querySelector('.hero-card-image');
      const overlay = card.querySelector('.hero-card-overlay');
      const title = card.querySelector('.hero-card-title');

      const handleMouseEnter = () => {
        const tl = gsap.timeline();
        
        tl.to(card, {
          scale: 1.05,
          rotationY: gsap.utils.random(-3, 3),
          rotationX: gsap.utils.random(-1, 1),
          z: 30,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(image, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(overlay, {
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.out"
        }, 0.1)
        .to(title, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, 0.2);

        // Floating animation
        gsap.to(card, {
          y: -5,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      };

      const handleMouseLeave = () => {
        gsap.killTweensOf(card);
        
        const tl = gsap.timeline();
        
        tl.to(card, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(image, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(title, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, 0);
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

  }, []);

  return (
    <div className="min-h-screen flex items-center py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-10 lg:space-y-12">
            <div className="space-y-8">
              {/* Animated Title */}
              <div className="text-center lg:text-left">
                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  once
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#00A73D] tracking-tight"
                  as="h1"
                >
                  Jansetu
                </TextAnimate>
              </div>
              
              {/* Subtitle with enhanced styling */}
              <div className="text-center lg:text-left space-y-4">
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Crowdsourced Project
                </p>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  For civic issue reporting and resolution, empowering communities through technology 
                  to create a better society where every voice matters.
                </p>
              </div>
            </div>

            {/* Enhanced Sanskrit Sloka Section */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00A73D] to-emerald-400 rounded-full"></div>
              <div className="pl-6 space-y-6">
                <div className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <TextAnimate
                    animation="fadeIn"
                    by="word"
                    delay={0.5}
                    className="block mb-2"
                  >
                    सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
                  </TextAnimate>
                  <TextAnimate
                    animation="fadeIn"
                    by="word"
                    delay={0.8}
                  >
                    सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
                  </TextAnimate>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  — Ancient Sanskrit Prayer for Universal Well-being
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Cards */}
          <div className="perspective-1000">
            {/* Top Row - Horizontal Cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {galleryItems.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  ref={el => {
                    cardsRef.current[index] = el;
                  }}
                  className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transform-gpu shadow-lg"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="hero-card-image w-full h-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  
                  <div className="hero-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300" />
                  
                  <div className="hero-card-title absolute bottom-4 left-4 right-4 opacity-0 transform translate-y-4">
                    <h3 className="text-white font-semibold text-sm">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                </div>
              ))}
            </div>

            {/* Middle Row - Large Card */}
            <div className="mb-4">
              <div
                ref={el => {
                  cardsRef.current[2] = el;
                }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer transform-gpu shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="hero-card-image w-full h-full relative">
                  <Image
                    src={galleryItems[2].src}
                    alt={galleryItems[2].alt}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="hero-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300" />
                
                <div className="hero-card-title absolute bottom-6 left-6 right-6 opacity-0 transform translate-y-4">
                  <h3 className="text-white font-semibold text-lg">
                    {galleryItems[2].title}
                  </h3>
                </div>
                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
              </div>
            </div>

            {/* Bottom Row - Three Small Cards */}
            <div className="grid grid-cols-3 gap-4">
              {galleryItems.slice(3, 6).map((item, index) => (
                <div
                  key={index + 3}
                  ref={el => {
                    cardsRef.current[index + 3] = el;
                  }}
                  className="group relative h-36 rounded-2xl overflow-hidden cursor-pointer transform-gpu shadow-lg"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="hero-card-image w-full h-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                  </div>
                  
                  <div className="hero-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300" />
                  
                  <div className="hero-card-title absolute bottom-3 left-3 right-3 opacity-0 transform translate-y-3">
                    <h3 className="text-white font-semibold text-xs">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
