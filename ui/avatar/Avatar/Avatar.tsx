import Image from 'next/image';
import styles from './Avatar.module.css';

export function Avatar({
  src,
  alt = 'Avatar',
  size = 32,
}: {
  src: string;
  alt?: string;
  size?: number;
}) {
  return (
    <span className={styles.wrap} style={{ width: size, height: size }}>
      <Image src={src} alt={alt} width={size} height={size} className={styles.img} />
    </span>
  );
}
