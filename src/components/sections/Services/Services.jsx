'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { services } from '../../../lib/data';
import styles from './Services.module.css';

export default function Services() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useRevealAnimation(sectionRef);

  // Auto-switch interval with progress bar
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
        duration: 6.5,
        ease: 'none',
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % services.length);
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

  // Handle slide animations on transition
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current.querySelectorAll('.animate-service'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, [activeIndex]);

  const activeService = services[activeIndex];

  // Specific custom deliverables/details mapped to each service for storytelling
  const getDeliverables = (title) => {
    switch (title) {
      case 'Full-Stack Web Development':
        return ['Single Page Apps (React/Vite)', 'Server-side apps (Next.js/EJS)', 'State Management & Performance', 'Responsive & Accessible layouts'];
      case 'REST API Design & Integration':
        return ['Modular Router pipelines', 'Secure JWT authentication', 'Payload validation & Sanity checks', 'Third-party integrations'];
      case 'E-Commerce Solutions':
        return ['Razorpay / Stripe integrations', 'Coupons, wallets & referrals', 'Admin inventory dashboards', 'Secure checkout funnels'];
      case 'Database Design & Management':
        return ['MongoDB NoSQL schema layout', 'PostgreSQL relational mapping', 'Index optimization & Query tuning', 'Data integrity & migrations'];
      case 'Dashboards & Admin Panels':
        return ['Role-based authorization', 'Data charts & Reporting sheets', 'Real-time activities tracking', 'Clean operations dashboard'];
      case 'Workflow Automation':
        return ['Cron-job pipelines & schedulers', 'Data scraping & extraction scripts', 'Automated email alerts', 'Repetitive process automation'];
      default:
        return ['Interactive UI components', 'Clean modular code structure', 'Optimized assets & loading'];
    }
  };

  return (
    <section ref={sectionRef} id="services" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          description="Explore the solutions I design, custom tailored to launch or optimize your product."
        />

        <div className={styles.showcaseWrap}>
          {/* Left Panel: Circular Interactive Bubbles */}
          <div className={styles.selectorColumn}>
            {services.map((service, i) => (
              <button
                key={service.title}
                className={`${styles.bubbleButton} ${i === activeIndex ? styles.activeBubble : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show service: ${service.title}`}
              >
                <div className={styles.bubbleRing} />
                <span className={styles.bubbleNumber}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.bubbleTitle}>{service.title}</span>
              </button>
            ))}
          </div>

          {/* Right Panel: Showcase Detail Card */}
          <div
            ref={cardRef}
            className={`${styles.showcaseCard} reveal`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.serviceIndex} animate-service`}>
                SERVICE // {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <h3 className={`${styles.serviceTitle} animate-service`}>
                {activeService.title}
              </h3>
              <p className={`${styles.serviceDescription} animate-service`}>
                {activeService.description}
              </p>
            </div>

            <div className={styles.detailsBlock}>
              <h4 className={`${styles.detailsHeading} animate-service`}>What&apos;s Included</h4>
              <ul className={styles.deliverablesList}>
                {getDeliverables(activeService.title).map((item, idx) => (
                  <li key={idx} className={`${styles.deliverableItem} animate-service`}>
                    <span className={styles.checkMark}>✓</span>
                    <span className={styles.deliverableText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationRow}>
              {services.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.navIndicator} ${idx === activeIndex ? styles.activeIndicator : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
            </div>

            {/* Autoplay Progress Bar */}
            <div className={styles.progressBarBg}>
              <div ref={progressRef} className={styles.progressBar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
