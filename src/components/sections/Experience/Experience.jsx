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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressActive, setProgressActive] = useState(false);

  useRevealAnimation(sectionRef);

  // Restart progress bar animation when active index changes
  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (!active) return;
      setProgressActive(false);

      // Brief timeout to trigger DOM reflow and restart the CSS keyframe animation
      const timer = setTimeout(() => {
        if (active) setProgressActive(true);
      }, 40);
      
      // Cleanup inside closure
      return () => clearTimeout(timer);
    });

    return () => {
      active = false;
    };
  }, [activeIndex]);

  // Premium storytelling slide transitions
  useEffect(() => {
    if (!cardRef.current) return;

    const elements = cardRef.current.querySelectorAll('.animate-element');
    
    // Kill any active animations on these elements to prevent overlapping animation conflicts
    gsap.killTweensOf(elements);

    // Smooth horizontal slide-in and fade reveal
    gsap.fromTo(
      elements,
      { opacity: 0, x: 25 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experience.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experience.length) % experience.length);
  };

  const handleAnimationEnd = () => {
    handleNext();
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
              <div
                className={`${styles.progressBar} ${progressActive ? styles.active : ''} ${
                  isPaused ? styles.paused : ''
                }`}
                onAnimationEnd={handleAnimationEnd}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
