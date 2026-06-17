import styles from './SectionHeading.module.css';

/**
 * Shared eyebrow + title + optional description pattern, used at the
 * top of every section so the typographic rhythm stays consistent
 * across the whole site instead of being redefined per-section.
 */
export default function SectionHeading({ eyebrow, title, description, align = 'left', id }) {
  return (
    <div className={`${styles.heading} reveal`} data-align={align} id={id}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
