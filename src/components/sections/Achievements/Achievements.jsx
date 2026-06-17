'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { ArrowUpRightIcon, PlusIcon, CheckIcon } from '../../VideoIntro/Icons';
import { achievements } from '../../../lib/data';
import styles from './Achievements.module.css';

export default function Achievements() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef, '.reveal', { stagger: 0.1 });

  return (
    <section ref={sectionRef} id="achievements" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Achievements & Certifications"
          title="Recognition along the way"
        />

        <div className={styles.grid}>
          {achievements.publications.map((pub) => (
            <a
              key={pub.title}
              href={pub.href}
              target="_blank"
              rel="noreferrer"
              className={`${styles.card} ${styles.published} reveal`}
            >
              <span className={styles.cardIcon}>
                <CheckIcon className={styles.iconSvg} />
              </span>
              <div>
                <span className={styles.cardTag}>Published paper</span>
                <h3 className={styles.cardTitle}>{pub.title}</h3>
                <p className={styles.cardMeta}>
                  {pub.venue}
                  <ArrowUpRightIcon className={styles.metaIcon} />
                </p>
              </div>
            </a>
          ))}

          {achievements.certifications.map((cert, i) => (
            <div key={cert.title + i} className={`${styles.card} ${styles.placeholder} reveal`}>
              <span className={styles.cardIcon} data-muted="true">
                <PlusIcon className={styles.iconSvg} />
              </span>
              <div>
                <span className={styles.cardTag} data-muted="true">
                  Add yours
                </span>
                <h3 className={styles.cardTitle} data-muted="true">
                  {cert.title}
                </h3>
                <p className={styles.cardMeta}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
