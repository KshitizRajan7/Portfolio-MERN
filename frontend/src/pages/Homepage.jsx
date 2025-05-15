import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Hero Section */}
    <section className="flex justify-center items-center flex-grow px-6 py-20 bg-gradient-to-r from-[#4FA7D3] to-[#3A7FA6] text-white">
  <div className="flex flex-col md:flex-row items-center max-w-6xl w-full text-center md:text-left">
    
    {/* Left Content - Text */}
    <div className="flex-1 md:pr-10">
      <h2 className="text-lg mb-2 text-white/90">Welcome to my portfolio!</h2>
      <h1 className="text-5xl font-extrabold mb-4">Hi, I'm [Your Name]</h1>
      <p className="text-xl max-w-xl mb-8">
        A passionate software engineer who loves building sleek web applications and solving real-world problems.
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
        <a
          href="#projects"
          className="inline-block bg-white text-[#3A7FA6] font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          View My Work
        </a>
        <Link
          to="/login"
          className="inline-block bg-[#D8EDF9] text-[#2C5D7C] font-semibold px-8 py-3 rounded-xl shadow hover:bg-[#BEE2F6] transition"
        >
          Login
        </Link>
      </div>
    </div>

    {/* Right Content - Image */}
    <div className="mt-12 md:mt-0 md:flex-1 flex justify-center">
      <img
        src="https://via.placeholder.com/300"
        alt="User"
        className="w-72 h-72 rounded-full border-4 border-white shadow-lg object-cover"
      />
    </div>
  </div>
</section>



      {/* About Me */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3A7FA6]">About Me</h2>
        <p className="text-center text-gray-700 leading-relaxed max-w-3xl mx-auto">
          I specialize in full-stack development with experience in React, Node.js, and modern web technologies. I enjoy turning complex challenges into elegant solutions.
        </p>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-6 py-12 bg-[#D8EDF9] rounded-xl shadow-md mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#3A7FA6] text-center">Education</h2>
        <ul className="max-w-3xl mx-auto space-y-10 text-gray-800">
          <li className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/100x100?text=University"
              alt="University Logo"
              className="w-24 h-24 rounded-full object-cover shadow"
            />
            <div>
              <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="italic">University of Technology — 2018-2022</p>
              <p>Focused on software development, data structures, algorithms, and web technologies.</p>
            </div>
          </li>
          <li className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/100x100?text=Bootcamp"
              alt="Bootcamp Logo"
              className="w-24 h-24 rounded-full object-cover shadow"
            />
            <div>
              <h3 className="text-xl font-semibold">Full-Stack Web Development Bootcamp</h3>
              <p className="italic">Online Academy — 2023</p>
              <p>Intensive hands-on training in MERN stack, REST APIs, and deployment.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#3A7FA6] text-center">Skills</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-800">
          {[
            { name: "React", img: "https://via.placeholder.com/80?text=React" },
            { name: "Node.js", img: "https://via.placeholder.com/80?text=Node.js" },
            { name: "JavaScript", img: "https://via.placeholder.com/80?text=JS" },
            { name: "TypeScript", img: "https://via.placeholder.com/80?text=TS" },
            { name: "Tailwind CSS", img: "https://via.placeholder.com/80?text=Tailwind" },
            { name: "MongoDB", img: "https://via.placeholder.com/80?text=MongoDB" },
            { name: "Express", img: "https://via.placeholder.com/80?text=Express" },
            { name: "Git & GitHub", img: "https://via.placeholder.com/80?text=Git" },
          ].map((skill) => (
            <div
              key={skill.name}
              className="bg-[#D8EDF9] rounded-xl py-4 px-2 shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={skill.img}
                alt={`${skill.name} logo`}
                className="w-16 h-16 mb-2 object-contain"
              />
              <span className="font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Work */}
      <section id="projects" className="bg-white py-16 px-6 shadow-inner">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#3A7FA6]">Latest Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Project One",
              description: "A web app for tracking your daily tasks with real-time collaboration.",
              img: "https://via.placeholder.com/400x200?text=Project+1",
              link: "#",
            },
            {
              title: "Project Two",
              description: "E-commerce platform featuring seamless payment integration and user-friendly design.",
              img: "https://via.placeholder.com/400x200?text=Project+2",
              link: "#",
            },
            {
              title: "Project Three",
              description: "Personal blog built with Next.js and Markdown support.",
              img: "https://via.placeholder.com/400x200?text=Project+3",
              link: "#",
            },
          ].map(({ title, description, img, link }) => (
            <div
              key={title}
              className="border rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <img
                src={img}
                alt={title}
                className="w-full rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="mb-4 text-gray-600">{description}</p>
              <div className="flex items-center space-x-4">
                <a
                  href={link}
                  className="text-[#4FA7D3] font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
                <Link
                  to="/login"
                  className="bg-[#4FA7D3] text-white px-4 py-1.5 rounded-lg hover:bg-[#4294BD] transition text-sm font-semibold"
                >
                  Login
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#3A7FA6]">Get In Touch</h2>
        <p className="mb-8 text-gray-700">
          Interested in working together or have any questions? Feel free to reach out!
        </p>
        <a
          href="mailto:your.email@example.com"
          className="inline-block bg-[#4FA7D3] text-white font-semibold px-8 py-3 rounded-xl shadow hover:bg-[#4294BD] transition"
        >
          Contact Me
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C5D7C] text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
      </footer>
    </main>
  );
}
