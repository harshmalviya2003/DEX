
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCenter = () => {
  const [activeImage, setActiveImage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(0); // 0: no direction, 1: right, -1: left

  const images = [
    {
      id: 1,
      src: '/image/1.png',
      alt: 'Image 1',
      title: 'Extracting',
      description: 'Description for Extracting'
    },
    {
      id: 2,
      src: '/image/2.avif',
      alt: 'Image 2',
      title: 'Scheduling',
      description: 'Description for Scheduling'
    },
    {
      id: 3,
      src: '/image/3.avif',
      alt: 'Image 3',
      title: 'Populating',
      description: 'Description for Populating'
    }
  ];

  const handleClick = (id: number) => {
    setDirection(id > activeImage ? 1 : -1);
    setIsLoading(true);
    setTimeout(() => {
      setActiveImage(id);
      setIsLoading(false);
    }, 300); // Reduced loading delay for smoother UX
  };

  // Auto-rotate images (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveImage(prev => (prev % images.length) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-gray-900"
      >
        Explore <span className="text-blue-600">more uses</span>
      </motion.h2>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Options sidebar */}
        <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {images.map((image) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(image.id)}
              className={`min-w-[140px] sm:min-w-0 w-full p-3 sm:p-4 rounded-xl text-left transition-all flex-shrink-0 ${activeImage === image.id ? 'bg-blue-50 border-l-4 border-blue-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <h3 className="font-medium text-gray-900 text-base sm:text-lg">{image.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{image.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Main image display */}
        <div className="w-full lg:w-3/4 bg-white rounded-2xl shadow-xl overflow-hidden relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mt-4 lg:mt-0">
          <AnimatePresence custom={direction} initial={false}>
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 h-full w-full flex items-center justify-center bg-gray-50/50 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                ></motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={activeImage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 h-full w-full"
              >
                <div className="relative h-full w-full">
                  {(() => {
                    const img = images.find(img => img.id === activeImage);
                    if (!img) {
                      return (
                        <div className="flex items-center justify-center h-full w-full text-red-500">
                          Image not found
                        </div>
                      );
                    }
                    return (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain p-4 sm:p-8"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      />
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      
    </div>
  );
};

export default ImageCenter;
