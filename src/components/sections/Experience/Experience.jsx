'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { experience } from '../../../lib/data';
import styles from './Experience.module.css';

export default function Experience() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useRevealAnimation(sectionRef);

  // Auto-switching timeline animation with GSAP progress bar
  useEffect(() => {
    if (!progressRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.fromTo(
      progressRef.current,
      { width: '0%' },
      {
        width: '100%',
        duration: 7.5,
        ease: 'none',
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % experience.length);
        },
      }
    );

    if (isPaused) {
      timelineRef.current.pause();
    } else {
      timelineRef.current.play();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [activeIndex, isPaused]);

  // Handle slide transition effects when index changes
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current.querySelectorAll('.animate-element'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    );
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experience.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experience.length) % experience.length);
  };

  const activeRole = experience[activeIndex];

  return (
    <section ref={sectionRef} id="experience" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="An interactive chronicle of my developer journey and professional roles."
        />

        <div className={styles.showcaseWrap}>
          {/* Left Panel: Tabs for Quick Selection */}
          <div className={styles.tabsPanel}>
            {experience.map((job, idx) => (
              <button
                key={job.company}
                className={`${styles.tabButton} ${idx === activeIndex ? styles.activeTab : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <span className={styles.tabIndicator} />
                <div className={styles.tabInfo}>
                  <span className={styles.tabCompany}>{job.company}</span>
                  <span className={styles.tabRole}>{job.role}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel: Showcase Slide */}
          <div
            ref={cardRef}
            className={`${styles.showcaseCard} reveal`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerInfo}>
                <span className={`${styles.period} animate-element`}>{activeRole.period}</span>
                <h3 className={`${styles.role} animate-element`}>
                  {activeRole.role}
                </h3>
                <h4 className={`${styles.company} animate-element`}>
                  {activeRole.company}
                  {activeRole.location ? ` · ${activeRole.location}` : ''}
                </h4>
              </div>
              {activeRole.current && (
                <span className={`${styles.currentBadge} animate-element`}>Current</span>
              )}
            </div>

            <ul className={styles.pointsList}>
              {activeRole.points.map((point, i) => (
                <li key={i} className={`${styles.pointItem} animate-element`}>
                  <span className={styles.pointDot} />
                  <p className={styles.pointText}>{point}</p>
                </li>
              ))}
            </ul>

            {/* Slider Navigation controls inside card */}
            <div className={styles.controlsRow}>
              <div className={styles.arrows}>
                <button
                  onClick={handlePrev}
                  className={styles.arrowButton}
                  aria-label="Previous role"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className={styles.arrowButton}
                  aria-label="Next role"
                >
                  →
                </button>
              </div>
              <div className={styles.dots}>
                {experience.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to role ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Visual Autoplay Progress Bar */}
            <div className={styles.progressBarBg}>
              <div ref={progressRef} className={styles.progressBar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
