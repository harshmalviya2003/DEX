"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Dex, and how does it work?",
    answer: "Dex is your AI-powered browser copilot, designed to boost productivity by living in your browser. It understands your context, automates tasks, and responds to voice or text commands to streamline workflows."
  },
  {
    question: "How does Dex track my tasks and PRs?",
    answer: "Dex monitors your apps, like GitHub, to track updates such as 'PRs assigned to me' or notifications. It flags changes and delivers relevant info, keeping you focused without the clutter."
  },
  {
    question: "Can Dex integrate with my existing apps?",
    answer: "Yes, Dex seamlessly integrates with apps like GitHub, Slack, and more via robust APIs, ensuring it works within your existing tech stack for a unified experience."
  },
  {
    question: "Is my data safe with Dex?",
    answer: "Absolutely. Dex uses enterprise-grade encryption, secure app authentication, and never trains on your data. Learn more in our Privacy Policy."
  },
  {
    question: "What kind of tasks can Dex automate?",
    answer: "Dex automates repetitive tasks like summarizing articles, extracting data, populating forms, and tracking updates, saving you hours of manual work."
  },
  {
    question: "How do I get started with Dex?",
    answer: "Join the waitlist to access Dex’s free plan or explore premium features. Our team provides onboarding support to get you up and running quickly."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export function FAQ() {
  return (
    <section
      id="faq"
      className="min-h-screen flex items-center justify-center bg-gray-50 py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"></div>
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
            Frequently Asked <span className="text-blue-600 font-bold">Questions</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Everything you need to know about Dex, your AI browser copilot
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
        >
          <Accordion type="single" collapsible className="divide-y divide-gray-200/50">
            {faqs.map((faq, index) => (
              <motion.div variants={itemVariants} key={index}>
                <AccordionItem value={`item-${index}`} className="px-8 py-6 hover:bg-gray-100/50 transition-colors duration-200">
                  <AccordionTrigger className="hover:no-underline group">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors sm:text-xl">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="prose prose-neutral max-w-none">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-lg font-medium">
            Still have questions?{" "}
            <a href="#contact" className="text-blue-600 font-semibold hover:underline hover:text-gray-900 transition-colors duration-200">
              Contact the Dex team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}