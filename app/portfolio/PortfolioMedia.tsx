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
}: PortfolioMediaProps) {
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const sizeClass = fill ? 'absolute inset-0 h-full w-full' : 'h-full w-full';

  if (isPortfolioVideo(src)) {
    return (
      <video
        src={src}
        className={`${sizeClass} ${fitClass} ${className}`}
        style={style}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={autoPlay ? 'auto' : 'metadata'}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={`${fitClass} ${className}`}
      style={style}
      priority={priority}
    />
  );
}
