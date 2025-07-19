
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitText from 'gsap/SplitText';

// gsap.registerPlugin(ScrollTrigger);

// const Scroll: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Load SplitText dynamically
//     const script = document.createElement('script');
//     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       // Split text into characters
//       const split = (text: HTMLElement, type = 'chars') => {
//         text.setAttribute('aria-label', text.textContent || '');
//         const splits = new SplitText(text, { type });
//         splits[type].forEach((char: HTMLElement) => char.setAttribute('aria-hidden', 'true'));
//         return splits[type];
//       };

//       if (sectionRef.current && titleRef.current && videoRef.current) {
//         const title = split(titleRef.current, 'chars');
//         const img = videoRef.current.children[0] as HTMLElement;

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top center',
//             end: 'bottom bottom+=100%',
//             invalidateOnRefresh: true,
//             scrub: 1,
//           },
//         });

//         tl.fromTo(
//           title,
//           { scale: 0, rotation: () => Math.random() * 360 - 180 },
//           {
//             scale: 1,
//             duration: 0.2,
//             rotation: 0,
//             ease: 'expo.out',
//             stagger: { each: 0.05, from: 'random' },
//           }
//         );

//         tl.fromTo(
//           videoRef.current,
//           { clipPath: 'inset(10% 50% 10% 50%)', yPercent: 100 },
//           { ease: 'power3', clipPath: 'inset(0% 0% 0% 0%)', duration: 1, yPercent: 0 },
//           '.3'
//         );

//         tl.fromTo(
//           videoRef.current,
//           { scale: 0.5 },
//           { ease: 'back.inOut(.2)', scale: 1, duration: 0.8 },
//           '<'
//         );

//         tl.fromTo(
//           img,
//           { scale: 2.8, yPercent: 40 },
//           { scale: 1.2, duration: 0.8, delay: 0.2, yPercent: 0 },
//           '<'
//         );

//         tl.to(videoRef.current, { scale: 0.9, ease: 'linear' });
//         tl.to(img, { scale: 1, ease: 'linear' }, '<');
//       }
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(
//         'https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/680a73d874a7ac76633a467f_video.json.txt'
//       );
//       alert('Link copied to clipboard!');
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   return (
//     <section
//       ref={sectionRef}
//       data-animate="videogrow"
//       className="relative flex flex-col items-center justify-center min-h-[40svh] h-[400svh] pt-24 pb-24"
//     >
//       <div className="sticky top-0 flex w-full h-[100svh] md:h-[80svh] items-center justify-center pt-24 pb-24">
//         <div className="relative flex flex-col items-center w-[94%] max-w-[1620px] min-w-[20vw] md:w-[90%] sm:w-[95%] xs:min-w-[80vw] gap-6">
//           <div className="w-[70%] max-w-[1620px] h-[29rem] sm:h-[15rem] rounded-md overflow-clip pointer-events-auto">
//             <div
//               ref={videoRef}
//               data-videogrow="video"
//               className="w-full max-w-full md:w-full"
//             >
//               <img
//                 src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
//                 alt="Scrolltrigger visual"
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <div
//             ref={titleRef}
//             data-videogrow="title"
//             className="font-anton text-[17vw] md:text-[17vw] leading-none uppercase tracking-[-0.025em] mt-0 mb-0 text-gray-900"
//           >
//             Scrolltrigger
//           </div>
//         </div>
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="flex justify-center items-end z-3">
//           <div className="relative flex justify-end items-center w-[94%] h-40 mt-12 mb-12 sm:w-[80%] sm:h-auto sm:shadow-[0_2px_5px_rgba(0,0,0,0.1)] xs:items-end xs:justify-center pointer-events-auto">
//             <div className="absolute top-0 right-0 sm:static sm:w-full p-3 rounded-md bg-custom-bg flex flex-col items-start xs:pb-0">
//               <label className="relative mb-0 pt-2 pb-3 cursor-pointer">
//                 <input type="checkbox" className="absolute opacity-0" />
//                 <span className="relative z-2 flex justify-between items-center sm:pt-1">
//                   <div className="text-sm font-semibold">Scroll with purpose</div>
//                   <div className="relative flex justify-center items-center w-4 aspect-square rounded-full outline outline-1 outline-[var(--plus-line)] sm:hidden">
//                     <div className="absolute w-[1px] h-1/2 bg-[var(--plus-line)]"></div>
//                     <div className="w-1/2 h-[1px] bg-[var(--plus-line)]"></div>
//                   </div>
//                 </span>
//               </label>
//               <div className="overflow-hidden w-full">
//                 <div className="flex flex-col items-end">
//                   <div>
//                     <p className="max-w-[25ch] pt-1 pb-1 mb-0 text-gray-600">
//                       Start animations when elements enter the viewport, scrub through timelines, pin elements in place, or snap to key points as users scroll.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="sm:hidden">
//                 <button
//                   onClick={handleCopy}
//                   className="flex w-6 h-6 items-center justify-center rounded-md outline outline-1 outline-[rgba(20,27,19,0.2)] hover:bg-[var(--copy-hover)] transition-colors duration-200 ease-in"
//                 >
//                   <div className="flex gap-2">
//                     <div className="leading-none font-normal">Copy this</div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="100%"
//                       viewBox="0 0 9 11"
//                       fill="none"
//                       className="w-4 h-4"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M5 1.5H1V6.5H5V1.5ZM0 0.5V7.5H6V0.5H0Z"
//                         fill="currentColor"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M3 8.757V10.5H9V3.5H7.42V4.5H8V9.5H4V8.757H3Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Scroll;
