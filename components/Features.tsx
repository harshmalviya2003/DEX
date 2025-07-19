'use client';
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Panels = () => {
  useEffect(() => {
    const panels = gsap.utils.toArray(".panel") as HTMLElement[];
    
    // Only enable ScrollTrigger on desktop
    if (window.innerWidth > 768) {
      panels.forEach((panel: HTMLElement, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: i === panels.length - 1 ? "bottom bottom" : `+=${panel.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => {
            gsap.from(panel.querySelectorAll('.content-animate > *'), {
              y: 50,
              opacity: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out"
            });
          }
        });
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  const questions = [
    "How does Dex boost productivity?",
    "What can Dex automate for me?",
    "Is my data safe with Dex?"
  ];
  const [typedText, setTypedText] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = 60;
    let pauseTime = 1200;
    const currentQuestion = questions[questionIndex];

    if (!isDeleting && typedText === currentQuestion) {
      typingSpeed = pauseTime;
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }
    if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setQuestionIndex((prev) => (prev + 1) % questions.length);
      typingSpeed = 400;
      return;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentQuestion.slice(0, typedText.length + 1));
      } else {
        setTypedText(currentQuestion.slice(0, typedText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, questionIndex]);

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <div className="panel bg-white min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white z-0"></div>
        
        <div className="container mx-auto relative z-10 content-animate">
          <div className="max-w-4xl mx-auto text-center py-12 sm:py-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center mb-4 sm:mb-6"
            >
              <hr className="w-8 sm:w-12 h-1 bg-blue-500 border-0 rounded mr-2 sm:mr-3" />
              <span className="text-blue-600 font-medium text-sm sm:text-base tracking-wider">YOUR BROWSER COPILOT</span>
              <hr className="w-8 sm:w-12 h-1 bg-blue-500 border-0 rounded ml-2 sm:ml-3" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Boost Productivity with <br className="hidden sm:block" />
              <span className="text-blue-600">Dex</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered assistant for seamless browser workflows, automating tasks and keeping you in the flow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all text-sm sm:text-base"
              >
                Join the Waitlist
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all text-sm sm:text-base"
              >
                Learn More
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: 10 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5 
              }}
              className="mt-10 sm:mt-16 flex flex-col items-center"
            >
              <span className="text-xs sm:text-sm text-gray-500 mb-2">Scroll down</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      {[
        {
          title: "Context-Aware Assistant",
          description: "Dex lives in your browser, instantly understanding your tasks and acting on them, from summarizing articles to managing workflows.",
          image: "/feature/1.png",
          bg: "bg-blue-50"
        },
        {
          title: "Intelligent Workflows",
          description: "Teach Dex once, and it automates repetitive tasks like data extraction or form population, saving you hours.",
          animation: true,
          bg: "bg-white",
          animationComponent: (
            <motion.div 
              className="w-full h-[180px] sm:h-[220px] md:h-[400px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-3 sm:p-6 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-2 sm:p-3 mb-3 sm:mb-6 flex items-center relative mt-2 sm:mt-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-gray-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10 whitespace-nowrap text-xs sm:text-sm md:text-base">
                  {typedText}
                </span>
              </motion.div>
              
              <motion.div
                className="mt-auto pt-2 sm:pt-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Powered by AI
                </div>
              </motion.div>
            </motion.div>
          )
        },
        {
          title: "Voice-Activated Productivity",
          description: "Speak naturally to Dex—no shortcuts or long inputs needed. Stay in flow with commands like 'Summarize this article' or 'View meeting notes.'",
          image: "/feature/3.png",
          bg: "bg-blue-50"
        },
        {
          title: "Smart Monitoring",
          description: "Dex tracks your apps and PRs, flagging updates like 'PRs assigned to me' or Amazon order statuses, keeping you informed without the clutter.",
          image: "/feature/4.png",
          bg: "bg-white"
        },
      ].map((section, index) => (
        <section 
          key={index} 
          className={`panel ${section.bg} min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 py-12 sm:py-0`}
        >
          <div className="container mx-auto">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {section.image && (
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority={index === 0}
                    />
                  )}
                  {section.animation && section.animationComponent && (
                    <div className="w-full h-[180px] sm:h-[220px] md:h-[400px]">
                      {section.animationComponent}
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2 mt-8 md:mt-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <span className="text-blue-600">{section.title}</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {section.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-all flex items-center text-sm sm:text-base"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}


      <section
        className="panel min-h-screen flex items-center justify-center relative bg-[#181A20]"
      >
        <div className="absolute inset-0 bg-dot-black/[0.2] pointer-events-none" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4">
          <Image
            src="/icon.avif"
            alt="Lock Icon"
            width={200}
            height={200}
            className="mx-auto mb-8"
            priority
          />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Your data is yours
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-xl mx-auto">
            Dex ensures safe app authentication and is never trained on your data.
          </p>
          <p className="text-base text-gray-400 mb-0">
            Learn more in our{' '}
            <a href="/privacy" className="underline text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Panels;