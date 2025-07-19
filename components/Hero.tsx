'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(SplitText);

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const ycBadgeRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Darker floating elements data
  const floatingElements = [
    { size: 80, x: 15, y: 20, color: 'rgba(0, 122, 255, 0.15)', delay: 0, shape: 'circle' },
    { size: 100, x: 85, y: 15, color: 'rgba(0, 122, 255, 0.15)', delay: 0.3, shape: 'blob' },
    { size: 70, x: 25, y: 70, color: 'rgba(0, 122, 255, 0.15)', delay: 0.6, shape: 'circle' },
    { size: 90, x: 75, y: 80, color: 'rgba(0, 122, 255, 0.15)', delay: 0.9, shape: 'blob' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let tl: gsap.core.Timeline | undefined;
    let particleAnimationId: number;

    if (inView && heroRef.current) {
      // Background animation with darker initial state
      // gsap.fromTo(heroRef.current,
      //   { backgroundColor: '#f0f0f0' },
      //   { backgroundColor: '#ffffff', duration: 1.5, ease: 'power2.inOut' }
      // );

      // YCombinator badge animation - more pronounced
      if (ycBadgeRef.current) {
        gsap.fromTo(ycBadgeRef.current,
          { 
            y: -30, 
            opacity: 0,
            scale: 0.7
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8, 
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
              gsap.to(ycBadgeRef.current, {
                y: -5,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
              });
            }
          }
        );
      }

      // Darker floating elements with more movement
      floatingElementsRef.current.forEach((el, i) => {
        const duration = 10 + Math.random() * 6;
        const yMovement = 30 + Math.random() * 50;
        const xMovement = 20 + Math.random() * 40;
        
        gsap.to(el, {
          y: `+=${yMovement}`,
          x: `+=${xMovement}`,
          duration: duration,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: floatingElements[i].delay
        });

        if (floatingElements[i].shape === 'blob') {
          gsap.to(el, {
            scale: 1.3,
            duration: duration * 0.7,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: floatingElements[i].delay * 1.5
          });
        }
      });

      // Content animations remain the same
      const heading = contentRef.current?.querySelector('h1');
      const paragraph = contentRef.current?.querySelector('p');
      const buttons = contentRef.current?.querySelectorAll('button');

      tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (heading) {
        const split = new SplitText(heading, { type: 'lines,words,chars' });
        tl.from(split.chars, {
          y: (i) => i % 2 === 0 ? 40 : -40,
          x: (i) => i % 3 === 0 ? 20 : i % 3 === 1 ? -20 : 0,
          opacity: 0,
          rotation: (i) => i % 4 === 0 ? 10 : i % 4 === 1 ? -10 : 0,
          stagger: 0.015, // was 0.03
          duration: 0.5,  // was 0.8
          ease: 'back.out(1.7)'
        });
      }

      if (paragraph) {
        const split = new SplitText(paragraph, { type: 'lines,words' });
        tl.from(split.words, {
          opacity: 0,
          y: 10,
          duration: 0.25, // was 0.4
          stagger: 0.04,  // was 0.08
          ease: 'power2.out'
        }, '-=0.4');
      }

      if (buttons) {
        tl.from(buttons, {
          y: 30,
          opacity: 0,
          scale: 0.8,
          stagger: 0.07, // was 0.15
          duration: 0.4, // was 0.7
          ease: 'elastic.out(1, 0.7)'
        }, '-=0.3');

        buttons.forEach((button, i) => {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              y: -5,
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(0, 122, 255, 0.4)',
              duration: 0.3
            });
          });
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              y: 0,
              scale: 1,
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
              duration: 0.3
            });
          });
        });
      }

      // Darker particle animation
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Define a Particle interface for type safety
        interface Particle {
          x: number;
          y: number;
          size: number;
          baseSize: number;
          speedX: number;
          speedY: number;
          color: string;
          angle: number;
          angleSpeed: number;
        }
        
        const particles: Particle[] = [];
        const particleCount = isMobile ? 100 : 200;
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            baseSize: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            color: `rgba(0, 122, 255, ${Math.random() * 0.3 + 0.1})`, // Darker opacity
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.03
          });
        }
        
        const animateParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(p => {
            p.x += p.speedX + Math.cos(p.angle) * 0.5;
            p.y += p.speedY + Math.sin(p.angle) * 0.5;
            p.angle += p.angleSpeed;
            
            p.size = p.baseSize * (1 + Math.sin(Date.now() * 0.002 + p.x * 0.01) * 0.3);
            
            if (p.x < 0 || p.x > canvas.width) {
              p.speedX *= -1;
              p.x = p.x < 0 ? 0 : canvas.width;
            }
            if (p.y < 0 || p.y > canvas.height) {
              p.speedY *= -1;
              p.y = p.y < 0 ? 0 : canvas.height;
            }
            
            const gradient = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, p.size * 2 // Larger glow
            );
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0, 122, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          });
          
          // Darker connections
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                const opacity = 0.3 - distance / 500; // More visible connections
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 122, 255, ${opacity})`;
                ctx.lineWidth = 1 + (1 - distance / 150) * 2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
          
          particleAnimationId = requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
      }
    }
    
    return () => {
      if (tl) tl.kill();
      cancelAnimationFrame(particleAnimationId);
    };
  }, [inView, isMobile]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Darker particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50" // Increased opacity
      />

      {/* Darker floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            ref={elRef => elRef && (floatingElementsRef.current[i] = elRef)}
            className={`absolute ${el.shape === 'blob' ? 'blob-animate' : 'rounded-full'} blur-xl`}
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.x}%`,
              top: `${el.y}%`,
              backgroundColor: el.color,
              filter: 'blur(20px)' // Stronger blur
            }}
          />
        ))}
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-24"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div 
            ref={contentRef}
            className="relative z-30 max-w-4xl"
          >
            {/* YCombinator badge with darker background */}
            <div 
              ref={ycBadgeRef}
              className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-sm font-medium"
              style={{ 
                background: 'rgba(255, 107, 0, 0.15)', 
                border: '1px solid rgba(255, 107, 0, 0.3)', 
                color: '#FF6B00',
                backdropFilter: 'blur(6px)'
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 12l8 10 8-10z" />
              </svg>
              Backed by YCombinator
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block">The <span className="text-blue-600">AI copilot</span></span>
              <span className="block">for your browser</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Offload tedious tasks, shortcut knowledge work, eliminate context switching, 
              and get anything done—10x faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                ref={el => buttonRefs.current[0] = el}
                className="px-8 py-4 font-medium rounded-full text-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
                style={{ boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)' }}
              >
                Join the waitlist
              </button>
              <button
                ref={el => buttonRefs.current[1] = el}
                className="px-8 py-4 font-medium rounded-full text-lg border-2 bg-white text-blue-600 border-blue-600 shadow-lg hover:bg-blue-50 transition-all"
                style={{ boxShadow: '0 4px 16px rgba(0, 122, 255, 0.2)' }}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .blob-animate {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: blob 8s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}