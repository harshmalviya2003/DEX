'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const logos = [
  '/marque/1.webp',
  '/marque/2.webp',
  '/marque/3.webp',
  '/marque/4.webp',
  '/marque/5.webp',
  '/marque/6.webp',
  '/marque/7.webp',
  '/marque/8.webp',
  '/marque/9.webp',
];

export function PremiumMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!marqueeContentRef.current) return;

    // Calculate total width needed
    const items = marqueeContentRef.current.children;
    let totalWidth = 0;
    
    Array.from(items).forEach(item => {
      totalWidth += item.getBoundingClientRect().width;
    });

    // Duplicate content for seamless looping
    const content = marqueeContentRef.current;
    content.innerHTML = content.innerHTML + content.innerHTML;

    // GSAP animation for smooth infinite scroll
    tl.current = gsap.timeline({ repeat: -1 });
    tl.current.fromTo(content,
      { x: 0 },
      { 
        x: -totalWidth,
        duration: totalWidth / 100, // Speed adjusted based on content width
        ease: 'none'
      }
    );

    // Hover effects
    const hoverEffect = (enter: boolean) => {
      if (tl.current) {
        gsap.to(tl.current, {
          timeScale: enter ? 0.5 : 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    if (marqueeRef.current) {
      marqueeRef.current.addEventListener('mouseenter', () => hoverEffect(true));
      marqueeRef.current.addEventListener('mouseleave', () => hoverEffect(false));
    }

    return () => {
      tl.current?.kill();
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener('mouseenter', () => hoverEffect(true));
        marqueeRef.current.removeEventListener('mouseleave', () => hoverEffect(false));
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-6 bg-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full blur-lg opacity-10 bg-blue-500"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div 
        ref={marqueeRef}
        className="relative z-10 w-full overflow-hidden group"
      >
        <div
          ref={marqueeContentRef}
          className="flex items-center w-max will-change-transform"
        >
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="mx-10 flex-shrink-0 group-hover:opacity-100 transition-all duration-500"
              style={{ opacity: 0.7 }}
            >
              <div className="relative p-2 hover:scale-110 transition-transform duration-300">
                <Image
                  src={logo}
                  alt="Partner logo"
                  width={140}
                  height={70}
                  className="h-14 w-auto object-contain drop-shadow-lg"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget.parentElement, {
                      scale: 1.15,
                      duration: 0.3
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget.parentElement, {
                      scale: 1,
                      duration: 0.3
                    });
                  }}
                />
                <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Advanced gradient fade effects */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}