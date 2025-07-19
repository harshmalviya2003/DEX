'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const YourData = () => {
  return (
    <div className="flex flex-col justify-end min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-2 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-4 relative overflow-hidden"> {/* Responsive padding and pt */}
      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-center mb-2 sm:mb-4 px-2 sm:px-0"
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-1 sm:mb-2">
          10x your <span className="text-blue-600">productivity</span>
        </h1>
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mb-2 sm:mb-4">
          on the browser
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-medium shadow-lg transition-all"
        >
          Join the website
        </motion.button>
      </motion.div>

      {/* Image Section */}
      <div className="relative w-full h-40 xs:h-48 sm:h-64 md:h-[300px] mt-2 mb-4 sm:mb-0"> {/* Responsive height and margin */}
        <Image
          src="/yourdata.png"
          alt="Productivity Dashboard"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
      </div>

      {/* Optional Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-blue-200"
            style={{
              width: `${Math.random() * 80 + 30}px`, // smaller for mobile
              height: `${Math.random() * 80 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default YourData;