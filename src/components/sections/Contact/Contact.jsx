'use client';

import { useRef, useState } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { ArrowUpRightIcon, LinkedinIcon, GithubIcon } from '../../VideoIntro/Icons';
import { profile, contactChannels } from '../../../lib/data';
import styles from './Contact.module.css';

/**
 * Contact form is UI-only — wire `handleSubmit` up to your own form
 * handler (an API route, Formspree, EmailJS, etc.) before going live.
 */
export default function Contact() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    // PLACEHOLDER: replace with a real submit handler (API route,
    // Formspree, EmailJS, etc.) — this just simulates a send.
    setStatus('sent');
  };

  return (
    <section ref={sectionRef} id="contact" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind, or just want to talk shop? My inbox is open."
        />

        <div className={styles.grid}>
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

          <form className={`${styles.form} reveal`} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Name</span>
                <input type="text" name="name" required className={styles.input} placeholder="Your name" />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <input type="email" name="email" required className={styles.input} placeholder="you@example.com" />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Message</span>
              <textarea name="message" required rows={5} className={styles.textarea} placeholder="What are you building?" />
            </label>

            <button type="submit" className={styles.submitButton} disabled={status === 'sent'}>
              {status === 'sent' ? 'Message sent — thank you' : 'Send message'}
            </button>
          </form>
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
