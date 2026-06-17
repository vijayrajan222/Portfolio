'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { experience } from '../../../lib/data';
import styles from './Experience.module.css';

export default function Experience() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef, '.reveal', { stagger: 0.12, y: 28 });

  return (
    <section ref={sectionRef} id="experience" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Three roles, three very different skill sets — all of which end up showing up in how I build software."
        />

        <ol className={styles.timeline}>
          {experience.map((job) => (
            <li key={job.role + job.company} className={`${styles.item} reveal`}>
              <div className={styles.marker}>
                <span className={styles.dot} data-current={job.current ? 'true' : 'false'} />
              </div>

              <div className={styles.content}>
                <div className={styles.headerRow}>
                  <h3 className={styles.role}>{job.role}</h3>
                  {job.current && <span className={styles.currentBadge}>Current</span>}
                </div>
                <p className={styles.companyLine}>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ''}
                </p>
                <p className={styles.period}>{job.period}</p>

                <ul className={styles.points}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
