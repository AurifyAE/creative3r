'use client';

import { useRef } from 'react';
import {
  PortfolioItem,
  getPortfolioPoster,
  getPortfolioHoverMedia,
  isPortfolioVideo,
} from './portfolioData';
import PortfolioMedia from './PortfolioMedia';

type PortfolioGridCardProps = {
  item: PortfolioItem;
  cardRef: (el: HTMLDivElement | null) => void;
  onClick: () => void;
};

export default function PortfolioGridCard({ item, cardRef, onClick }: PortfolioGridCardProps) {
  const hoverVideoRef = useRef<HTMLVideoElement>(null);
  const poster = getPortfolioPoster(item);
  const hoverSrc = getPortfolioHoverMedia(item);
  const hasSlide = Boolean(hoverSrc);

  const playHoverVideo = () => {
    const video = hoverVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  const pauseHoverVideo = () => {
    const video = hoverVideoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div
      ref={cardRef}
      className="aspect-video bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-300 cursor-pointer relative overflow-hidden group rounded-xl shadow-lg border border-white/5"
      onClick={onClick}
      onMouseEnter={playHoverVideo}
      onMouseLeave={pauseHoverVideo}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Primary */}
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            hasSlide ? 'group-hover:-translate-x-full' : 'group-hover:scale-105'
          }`}
        >
          <PortfolioMedia src={poster} alt={item.title} />
        </div>

        {/* Hover slide-in */}
        {hoverSrc && (
          <div className="absolute inset-0 translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0">
            {isPortfolioVideo(hoverSrc) ? (
              <video
                ref={hoverVideoRef}
                src={hoverSrc}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${item.title} preview`}
              />
            ) : (
              <PortfolioMedia src={hoverSrc} alt={`${item.title} preview`} />
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center pl-6 z-10 pointer-events-none">
          <h3 className="text-xl text-white font-medium italic tracking-wide">{item.title}</h3>
        </div>
      </div>
    </div>
  );
}
