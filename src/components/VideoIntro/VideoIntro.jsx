'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicLayer from './CinematicLayer';
import {
  PlayIcon,
  PauseIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  LinkedinIcon,
  GithubIcon,
  MailIcon,
  PhoneIcon,
  ArrowRightIcon,
  SparkIcon,
} from './Icons';
import { useReducedMotion } from './useReducedMotion';
import { profile, stats } from '../../lib/data';
import styles from './VideoIntro.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * VideoIntro
 * ------------
 * Cinematic hero built around a talking-head video, now carrying the
 * full set of hero content a portfolio needs: highlight pill, role,
 * stacked name, subtitle, skill tags, CTAs, stats, and socials — all in
 * normal document flow so the section can grow taller than 100vh
 * without clipping anything or breaking the video's positioning.
 *
 * The video frame itself sits in a soft glowing halo rather than a hard
 * box (so it reads as part of the scene, not a pasted-on element), tilts
 * gently with the pointer for depth, and cross-fades through a brief
 * dip in opacity right at the loop boundary so the restart doesn't read
 * as a jump-cut.
 */
export default function VideoIntro({
  videoSrc = '/videos/hero-video.mp4',
  posterSrc = '/videos/hero-poster.jpg',
  eyebrow = profile.role.toUpperCase(),
  firstName = profile.firstName,
  lastName = profile.lastName,
  subtitle = profile.tagline,
  highlightSkills = profile.highlightSkills,
  latestHighlight = profile.latestHighlight,
  recLabel = 'REC',
  nextSectionId = 'about',
  projectsSectionId = 'projects',
  contactSectionId = 'contact',
}) {
  const sectionRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgWrapperRef = useRef(null);

  const highlightRef = useRef(null);
  const eyebrowRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const socialsRef = useRef(null);
  const frameRef = useRef(null);
  const frameInnerRef = useRef(null);
  const soundBadgeRef = useRef(null);
  const scrollRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // Replay video once from beginning and stop at the end
  const handleVideoClick = (e) => {
    if (e.target.closest('button')) return;
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    fg.currentTime = 0;
    bg.currentTime = 0;
    fg.play().then(() => {
      bg.play();
      setIsPlaying(true);
    }).catch(err => console.log("Video replay failed:", err));
  };

  // ---- Auto-hide the sound hint after a few seconds ---------------------
  useEffect(() => {
    const timer = setTimeout(() => setShowSoundHint(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!soundBadgeRef.current) return;
    gsap.to(soundBadgeRef.current, {
      autoAlpha: showSoundHint ? 1 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [showSoundHint]);

  // ---- Controls -----------------------------------------------------------
  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      fg.play();
      bg.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const next = !isMuted;
    fg.muted = next;
    setIsMuted(next);
    if (!next) setShowSoundHint(false);
  };

  const prefersReducedMotion = useReducedMotion();

  // ---- Entrance choreography ------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      const dY = prefersReducedMotion ? 0 : 1;

      tl.from(sectionRef.current, { autoAlpha: 0, duration: prefersReducedMotion ? 0.3 : 1 })
        .from(frameRef.current, { autoAlpha: 0, scale: prefersReducedMotion ? 1 : 1.05, duration: 1.1 }, 0.1)
        .from(highlightRef.current, { autoAlpha: 0, y: 14 * dY, duration: 0.6 }, 0.3)
        .from(eyebrowRef.current, { autoAlpha: 0, y: 14 * dY, duration: 0.7 }, 0.42)
        .from(firstNameRef.current, { autoAlpha: 0, y: 50 * dY, duration: 0.9 }, 0.52)
        .from(lastNameRef.current, { autoAlpha: 0, y: 50 * dY, duration: 0.9 }, 0.64)
        .from(subtitleRef.current, { autoAlpha: 0, y: 16 * dY, duration: 0.8 }, 0.85)
        .from(tagsRef.current ? tagsRef.current.children : [], { autoAlpha: 0, y: 10 * dY, duration: 0.5, stagger: 0.06 }, 1.0)
        .from(ctaRef.current ? ctaRef.current.children : [], { autoAlpha: 0, y: 12 * dY, duration: 0.6, stagger: 0.08 }, 1.1)
        .from(statsRef.current ? statsRef.current.children : [], { autoAlpha: 0, y: 14 * dY, duration: 0.6, stagger: 0.07 }, 1.25)
        .from(socialsRef.current ? socialsRef.current.children : [], { autoAlpha: 0, y: 10 * dY, duration: 0.5, stagger: 0.06 }, 1.35)
        .from(scrollRef.current, { autoAlpha: 0, duration: 0.6 }, 1.4)
        .from(soundBadgeRef.current, { autoAlpha: 0, scale: 0.7, duration: 0.5, ease: 'back.out(2.2)' }, 1.3);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ---- Pointer tilt + scroll parallax on the video frame ----------------
  useEffect(() => {
    if (prefersReducedMotion) return;
    const frame = frameRef.current;
    const section = sectionRef.current;
    if (!frame || !section) return;

    const quickX = gsap.quickTo(frame, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    const quickY = gsap.quickTo(frame, 'rotateX', { duration: 0.6, ease: 'power3.out' });

    const handleMove = (event) => {
      const rect = frame.getBoundingClientRect();
      const relX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const relY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      quickX(gsap.utils.clamp(-7, 7, relX * 14));
      quickY(gsap.utils.clamp(-7, 7, -relY * 14));
    };

    window.addEventListener('pointermove', handleMove);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(frame, { y: self.progress * 60 });
      },
    });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      st.kill();
    };
  }, [prefersReducedMotion]);

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={styles.hero} id="home">
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className={styles.gradientOverlay} />
      <CinematicLayer className={styles.particleCanvas} />

      <div className={styles.heroInner}>
        <header className={styles.navHeader}>
          <div className={styles.logo}>
            <span className={styles.logoAccent}>VIJAYARAJ</span>
            <span className={styles.logoText}> A N</span>
          </div>
          <nav className={styles.navMenu}>
            <button onClick={() => scrollToId('about')} className={styles.navLink}>About</button>
            <button onClick={() => scrollToId('skills')} className={styles.navLink}>Skills</button>
            <button onClick={() => scrollToId('tech-stack')} className={styles.navLink}>Tech Stack</button>
            <button onClick={() => scrollToId('experience')} className={styles.navLink}>Experience</button>
            <button onClick={() => scrollToId('projects')} className={styles.navLink}>Projects</button>
            <button onClick={() => scrollToId('services')} className={styles.navLink}>Services</button>
            <button onClick={() => scrollToId('contact')} className={styles.navLink}>Contact</button>
          </nav>
        </header>
        <div className={styles.heroTop}>
          <div className={styles.heroContent}>
            {latestHighlight && (
              <a ref={highlightRef} href={latestHighlight.href} className={styles.highlightPill}>
                <SparkIcon className={styles.highlightIcon} />
                <span className={styles.highlightLabel}>{latestHighlight.label}</span>
                <span className={styles.highlightDivider} />
                {latestHighlight.text}
              </a>
            )}

            <span ref={eyebrowRef} className={styles.eyebrow}>
              {eyebrow}
            </span>

            <h1 className={styles.headline}>
              <span ref={firstNameRef} className={styles.headlineLine + ' ' + styles.first}>
                {firstName}
              </span>
              <span ref={lastNameRef} className={styles.headlineLine + ' ' + styles.last}>
                {lastName}
              </span>
            </h1>

            <p ref={subtitleRef} className={styles.subtitle}>
              {subtitle}
            </p>

            {highlightSkills?.length > 0 && (
              <div ref={tagsRef} className={styles.tagRow}>
                {highlightSkills.map((skill) => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div ref={ctaRef} className={styles.ctaRow}>
              <button type="button" className={styles.ctaPrimary} onClick={() => scrollToId(projectsSectionId)}>
                View Projects
                <ArrowRightIcon className={styles.ctaIcon} />
              </button>
              <button type="button" className={styles.ctaSecondary} onClick={() => scrollToId(contactSectionId)}>
                Contact Me
              </button>
            </div>
          </div>

          <div ref={frameRef} className={styles.frame}>
            <div className={styles.frameGlow} aria-hidden="true" />
            <div ref={frameInnerRef} className={styles.frameInner} onClick={handleVideoClick} style={{ cursor: 'pointer' }}>
              <div ref={fgWrapperRef} className={styles.fgWrapper}>
                <video
                  ref={fgVideoRef}
                  className={styles.fgVideo}
                  src={videoSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  playsInline
                  aria-hidden="true"
                  tabIndex={-1}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className={styles.frameVignette} />
              </div>

              <span className={styles.corner + ' ' + styles.cornerTL} />
              <span className={styles.corner + ' ' + styles.cornerTR} />
              <span className={styles.corner + ' ' + styles.cornerBL} />
              <span className={styles.corner + ' ' + styles.cornerBR} />

              <div className={styles.recBadge}>
                <span className={styles.recDot} />
                {recLabel}
              </div>

              <div className={styles.frameControls}>
                <div ref={soundBadgeRef} className={styles.soundBadge}>
                  <span className={styles.soundBadgeRing} />
                  <span className={styles.soundBadgeLabel}>Tap for sound</span>
                </div>

                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
                >
                  {isPlaying ? <PauseIcon className={styles.icon} /> : <PlayIcon className={styles.icon} />}
                </button>

                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute hero video' : 'Mute hero video'}
                >
                  {isMuted ? <VolumeOffIcon className={styles.icon} /> : <VolumeOnIcon className={styles.icon} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <div ref={statsRef} className={styles.statsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div ref={socialsRef} className={styles.socialsRow}>
            <a href={profile.linkedin} className={styles.socialButton} aria-label="LinkedIn profile" target="_blank" rel="noreferrer">
              <LinkedinIcon className={styles.socialIcon} />
            </a>
            <a href={profile.github} className={styles.socialButton} aria-label="GitHub profile" target="_blank" rel="noreferrer">
              <GithubIcon className={styles.socialIcon} />
            </a>
            <a href={`mailto:${profile.email}`} className={styles.socialButton} aria-label="Send an email">
              <MailIcon className={styles.socialIcon} />
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className={styles.socialButton} aria-label="Call">
              <PhoneIcon className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      <button
        ref={scrollRef}
        type="button"
        className={styles.scrollIndicator}
        onClick={() => scrollToId(nextSectionId)}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollTrack}>
          <span className={styles.scrollPulse} />
        </span>
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
}
