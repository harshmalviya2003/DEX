import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Regina Lin",
    position: "CEO, Co-Founder ThirdLayer (YC W25)",
    image: "/team/2.jpg", // Placeholder image, update as needed
    description: "Harvard Math BA & CSE MS",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "Kevin Gu",
    position: "Co-Founder @ ThirdLayer (YC W25)",
    image: "/team/1.jpg", // Placeholder image, update as needed
    description: "Harvard Math & Stat",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  }
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-gradient-to-b from-muted/20 to-muted/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The brilliant minds behind our AI innovations
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="bg-background p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-muted/50 hover:border-primary/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-muted group-hover:border-primary transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-3 font-medium">{member.position}</p>
                <p className="text-gray-600 mb-6 max-w-md">{member.description}</p>
                <div className="flex gap-4">
                  <Link 
                    href={member.social.twitter} 
                    className="hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link 
                    href={member.social.linkedin} 
                    className="hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link 
                    href={member.social.github} 
                    className="hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}