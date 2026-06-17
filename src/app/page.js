import VideoIntro from '@/components/VideoIntro/VideoIntro';
import About from '@/components/sections/About/About';
import Skills from '../components/sections/Skills/Skills';
import Experience from '@/components/sections/Experience/Experience';
import Projects from '@/components/sections/Projects/Projects';
import Services from '../components/sections/Services/Services';
import Contact from '@/components/sections/Contact/Contact';

export default function Home() {
  return (
    <main>
      <VideoIntro
        videoSrc="/videos/hero-video.mp4"
        posterSrc="/videos/hero-poster.jpg"
        nextSectionId="about"
        projectsSectionId="projects"
        contactSectionId="contact"
      />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
