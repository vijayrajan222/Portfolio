'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { ArrowUpRightIcon, GithubIcon } from '../../VideoIntro/Icons';
import { projects } from '../../../lib/data';
import styles from './Projects.module.css';

export default function Projects() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef, '.reveal', { stagger: 0.1, y: 30 });

  // Separate Work Glad (hero project) from the rest
  const heroProject = projects.find(p => p.title.toLowerCase().includes('glad')) || projects[0];
  const secondaryProjects = projects.filter(p => p !== heroProject);

  // References for 3D tilt cards
  const heroCardRef = useRef(null);
  const cardRefs = useRef([]);

  const handleMouseMove = (e, cardRef) => {
    const card = cardRef;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Rotate max 6 degrees for a premium subtleness
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = -((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

    const glossX = (x / rect.width) * 100;
    const glossY = (y / rect.height) * 100;
    card.style.setProperty('--gloss-x', `${glossX}%`);
    card.style.setProperty('--gloss-y', `${glossY}%`);
  };

  const handleMouseLeave = (cardRef) => {
    const card = cardRef;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--gloss-x', '50%');
    card.style.setProperty('--gloss-y', '50%');
  };

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="A Few Things I've Shipped"
          description="From an enterprise-grade employee attendance tracker to IoT systems — here is a look at what they involved."
        />

        {/* Hero / Primary Project Card */}
        {heroProject && (
          <article
            ref={heroCardRef}
            className={`${styles.heroCard} reveal`}
            onMouseMove={(e) => handleMouseMove(e, heroCardRef.current)}
            onMouseLeave={() => handleMouseLeave(heroCardRef.current)}
          >
            <div className={styles.cardGlow} />
            <div className={styles.heroLayout}>
              <div className={styles.heroContent}>
                <div className={styles.tagLine}>
                  <span className={styles.heroPill}>Primary Featured</span>
                  <span className={styles.projectType}>MERN STACK</span>
                </div>
                <h3 className={styles.heroTitle}>{heroProject.title}</h3>
                <p className={styles.heroSubtitle}>{heroProject.subtitle}</p>
                <p className={styles.heroDescription}>{heroProject.description}</p>

                <div className={styles.stackRow}>
                  {heroProject.stack.map((tech) => (
                    <span key={tech} className={styles.stackTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  {heroProject.links?.github && (
                    <a href={heroProject.links.github} className={styles.link} target="_blank" rel="noreferrer">
                      <GithubIcon className={styles.linkIcon} />
                      Code Repository
                    </a>
                  )}
                  {heroProject.links?.live && (
                    <a href={heroProject.links.live} className={styles.link} target="_blank" rel="noreferrer">
                      <ArrowUpRightIcon className={styles.linkIcon} />
                      Live Application
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Cinematic Tech Visual for Hero Card */}
              <div className={styles.heroVisual}>
                <div className={styles.visualCircles}>
                  <div className={styles.circle + ' ' + styles.c1} />
                  <div className={styles.circle + ' ' + styles.c2} />
                  <div className={styles.circle + ' ' + styles.c3} />
                </div>
                <div className={styles.visualContent}>
                  <span className={styles.systemStatus}>System Active</span>
                  <div className={styles.moduleCode}>SECURE // JWT // AUTH</div>
                  <div className={styles.moduleSub}>CONTROLLER &middot; MODEL &middot; MIDDLEWARE</div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Projects Grid */}
        <div className={styles.grid}>
          {secondaryProjects.map((project, idx) => (
            <article
              key={project.title}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`${styles.card} reveal`}
              onMouseMove={(e) => handleMouseMove(e, cardRefs.current[idx])}
              onMouseLeave={() => handleMouseLeave(cardRefs.current[idx])}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardTop}>
                <div className={styles.cardTitleWrap}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                </div>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.stackRow}>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.stackTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.links}>
                {project.links?.github && (
                  <a href={project.links.github} className={styles.link} target="_blank" rel="noreferrer">
                    <GithubIcon className={styles.linkIcon} />
                    Code
                  </a>
                )}
                {project.links?.live && (
                  <a href={project.links.live} className={styles.link} target="_blank" rel="noreferrer">
                    <ArrowUpRightIcon className={styles.linkIcon} />
                    Live
                  </a>
                )}
                {project.links?.paper && (
                  <a href={project.links.paper} className={styles.link} target="_blank" rel="noreferrer">
                    <ArrowUpRightIcon className={styles.linkIcon} />
                    Published Paper
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
