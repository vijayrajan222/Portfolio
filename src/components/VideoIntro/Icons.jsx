/**
 * Minimal inline icon set for the hero controls.
 * Hand-drawn rather than pulled from an icon library, so the whole
 * VideoIntro module has zero extra runtime dependencies beyond three + gsap.
 */

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7.5 5.6c0-.96 1.05-1.55 1.87-1.04l10.2 6.4c.78.49.78 1.6 0 2.08l-10.2 6.4c-.82.51-1.87-.08-1.87-1.04V5.6z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function VolumeOnIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 9.5v5a1 1 0 0 0 1 1h2.7l4.2 3.5a.8.8 0 0 0 1.3-.62V6.62a.8.8 0 0 0-1.3-.62L7.7 8.5H5a1 1 0 0 0-1 1z" fill="currentColor" />
      <path d="M16.2 8.2a5 5 0 0 1 0 7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18.6 5.8a8.6 8.6 0 0 1 0 12.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

export function VolumeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 9.5v5a1 1 0 0 0 1 1h2.7l4.2 3.5a.8.8 0 0 0 1.3-.62V6.62a.8.8 0 0 0-1.3-.62L7.7 8.5H5a1 1 0 0 0-1 1z" fill="currentColor" />
      <path d="M16.6 9.4l4 4M20.6 9.4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.8 10.2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7.8" cy="7.6" r="0.9" fill="currentColor" />
      <path d="M11.6 16.2v-3.4c0-1.4.9-2.6 2.4-2.6 1.6 0 2.2 1 2.2 2.7v3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.6 10.2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3.2c-4.86 0-8.8 3.95-8.8 8.82 0 3.9 2.52 7.2 6.02 8.36.44.08.6-.19.6-.43v-1.68c-2.45.53-2.96-1.04-2.96-1.04-.4-1.02-.98-1.29-.98-1.29-.8-.55.06-.54.06-.54.89.06 1.35.91 1.35.91.78 1.34 2.06.96 2.56.73.08-.57.31-.96.56-1.18-1.96-.22-4.02-.98-4.02-4.36 0-.96.34-1.75.91-2.37-.09-.22-.4-1.13.09-2.35 0 0 .74-.24 2.43.91a8.4 8.4 0 0 1 4.42 0c1.69-1.15 2.43-.91 2.43-.91.49 1.22.18 2.13.09 2.35.57.62.91 1.4.91 2.37 0 3.4-2.07 4.13-4.04 4.35.32.28.6.82.6 1.66v2.46c0 .24.16.51.61.43 3.49-1.17 6-4.46 6-8.36 0-4.87-3.94-8.82-8.8-8.82z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 7.2l6.5 5a1.7 1.7 0 0 0 2 0l6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.6 4.2l2.3.4c.5.1.9.5 1 1l.5 2.3c.1.5 0 1-.4 1.4l-1.2 1.2a11 11 0 0 0 5.3 5.3l1.2-1.2c.4-.4.9-.5 1.4-.4l2.3.5c.5.1.9.5 1 1l.4 2.3c.1.7-.4 1.3-1.1 1.3-8 .1-14.5-6.4-14.4-14.4 0-.7.6-1.2 1.3-1.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4.5 12h14.5M13 6.5l6 5.5-6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 17L17 7M8.5 7H17v8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3l1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3z" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4.5 12.5l4.5 4.5L19.5 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
