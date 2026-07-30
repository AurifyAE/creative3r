'use client';

import Image from 'next/image';
import { isPortfolioVideo } from './portfolioData';

type PortfolioMediaProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  /** Still shown before a video is played, so the frame paints without a download. */
  poster?: string;
  sizes?: string;
};

export default function PortfolioMedia({
  src,
  alt,
  fill = true,
  className = '',
  style,
  priority,
  objectFit = 'cover',
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  poster,
  sizes,
}: PortfolioMediaProps) {
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const sizeClass = fill ? 'absolute inset-0 h-full w-full' : 'h-full w-full';

  if (isPortfolioVideo(src)) {
    return (
      <video
        src={src}
        poster={poster}
        className={`${sizeClass} ${fitClass} ${className}`}
        style={style}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={autoPlay ? 'auto' : poster ? 'none' : 'metadata'}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      className={`${fitClass} ${className}`}
      style={style}
      priority={priority}
    />
  );
}
