'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { ArrowUpRightIcon, LinkedinIcon, GithubIcon } from '../../VideoIntro/Icons';
import { profile, contactChannels } from '../../../lib/data';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="contact" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind, or just want to talk shop? My inbox is open."
          align="center"
        />

        <div className={`${styles.info} reveal`}>
          <ul className={styles.channelList}>
            {contactChannels.map((channel) => (
              <li key={channel.label}>
                <a href={channel.href} className={styles.channelRow} target={channel.label === 'LinkedIn' ? '_blank' : undefined} rel="noreferrer">
                  <span className={styles.channelLabel}>{channel.label}</span>
                  <span className={styles.channelValue}>
                    {channel.value}
                    <ArrowUpRightIcon className={styles.channelIcon} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.socials}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="LinkedIn">
              <LinkedinIcon className={styles.socialIcon} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="GitHub">
              <GithubIcon className={styles.socialIcon} />
            </a>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <a href="#home" className={styles.backToTop}>
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
