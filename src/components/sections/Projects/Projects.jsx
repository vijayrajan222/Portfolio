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

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="A few things I've shipped"
          description="From a full employee-management system to an e-commerce platform with real payments — here's what they involved."
        />

        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              key={project.title}
              className={`${styles.card} reveal ${project.featured ? styles.featured : ''}`}
            >
              <div className={styles.cardTop}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.subtitle}>{project.subtitle}</p>
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
                    Published paper
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
