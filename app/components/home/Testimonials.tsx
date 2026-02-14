'use client'
import React, { useEffect, useRef, useState, memo } from 'react';
import { gsap } from 'gsap';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Spacely has been invaluable to me for what we do in our office. I highly recommend it to anyone looking for speed without compromising with quality",
    author: "John Doe",
    role: "VP, Figma",
    avatar: "https://i.pravatar.cc/150?img=12",
    company: "Figma",
    rating: 5
  },
  {
    id: 2,
    text: "The efficiency and quality of work has improved dramatically since we started using Spacely. It's become an essential part of our workflow",
    author: "Jane Smith",
    role: "CEO, Adobe",
    avatar: "https://i.pravatar.cc/150?img=5",
    company: "Adobe",
    rating: 5
  },
  {
    id: 3,
    text: "Outstanding tool that has transformed how our team collaborates. The speed is incredible and the results are always top-notch",
    author: "Mike Johnson",
    role: "Director, Sketch",
    avatar: "https://i.pravatar.cc/150?img=8",
    company: "Sketch",
    rating: 5
  }
];

// Testimonial Content Component
const TestimonialContent = ({ testimonial }: { testimonial: Testimonial }) => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);

  const highlightWords = (text: string) => {
    const words = ['invaluable to me', 'recommend it to anyone', 'improved dramatically', 'essential part', 'transformed', 'incredible', 'top-notch'];
    let highlightedText = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<span class="text-[#2EC4B6] font-medium">$1</span>'
      );
    });
    
    return highlightedText;
  };

  return (
    <>
      {/* Large quotation mark */}
      <div 
        ref={quoteRef}
        className="quote-mark absolute top-8 left-8 text-[#2EC4B6] text-9xl font-serif leading-none select-none opacity-30"
      >
        "
      </div>

      {/* Star rating */}
      <div ref={ratingRef} className="rating-container flex justify-center mb-8 relative z-10">
        {[...Array(testimonial.rating)].map((_, idx) => (
          <svg
            key={idx}
            className="star w-8 h-8 text-[#2EC4B6] mx-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial content */}
      <div ref={testimonialRef} className="testimonial-text relative z-10">
        <p 
          className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-200 mb-12 text-center"
          dangerouslySetInnerHTML={{ 
            __html: highlightWords(testimonial.text) 
          }}
        />

        {/* Author info */}
        <div className="author-info flex flex-col items-center mb-8">
          <p className="author-name text-xl md:text-2xl text-white font-semibold">
            {testimonial.author}
          </p>
          <p className="author-role text-base md:text-lg text-gray-400 mb-2">
            {testimonial.role}
          </p>
          {/* Company badge */}
          <div className="company-badge inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
            <span className="text-xs md:text-sm font-medium text-gray-300">{testimonial.company}</span>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoized Avatar Carousel Component
const AvatarCarousel = memo(({ currentAvatar }: { currentAvatar: string }) => {
  return (
    <div className="avatar-carousel flex justify-center my-12">
      <div className="avatar-wrapper relative">
        <img
          src={currentAvatar}
          alt="Testimonial author"
          className="w-24 h-24 rounded-2xl object-cover"
          style={{
            boxShadow: '0 20px 60px rgba(46, 196, 182, 0.4), 0 0 0 3px rgba(46, 196, 182, 0.3)'
          }}
        />
        <div className="absolute inset-0 rounded-2xl ring-2 ring-[#2EC4B6] pointer-events-none"></div>
      </div>
    </div>
  );
});

AvatarCarousel.displayName = 'AvatarCarousel';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTestimonial, setDisplayedTestimonial] = useState<Testimonial>(testimonials[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioning = useRef(false);
  const hasMounted = useRef(false);

  // Autoplay effect - 5s display + 1.2s transition = 6.2s total
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (!isTransitioning.current) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 6200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  // Initial entrance animation (only once on mount)
  useEffect(() => {
    const tl = gsap.timeline();
    
    const quoteMark = cardRef.current?.querySelector('.quote-mark');
    const testimonialText = cardRef.current?.querySelector('.testimonial-text');
    const ratingContainer = cardRef.current?.querySelector('.rating-container');
    const stars = cardRef.current?.querySelectorAll('.star');
    const avatarCarousel = cardRef.current?.querySelector('.avatar-carousel');
    
    if (quoteMark) {
      gsap.set(quoteMark, { opacity: 0, scale: 0.5, rotation: -30 });
      tl.to(quoteMark, {
        opacity: 0.3,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)'
      });
    }

    if (ratingContainer) {
      gsap.set(ratingContainer, { opacity: 0, y: -20 });
      tl.to(ratingContainer, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.8');
    }

    if (stars && stars.length > 0) {
      gsap.set(stars, { scale: 0, rotation: -180 });
      tl.to(stars, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(2)'
      }, '-=0.6');
    }

    if (testimonialText) {
      gsap.set(testimonialText, { opacity: 0, y: 40 });
      tl.to(testimonialText, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');
    }

    if (avatarCarousel) {
      gsap.set(avatarCarousel, { opacity: 0, scale: 0.7, y: 30 });
      tl.to(avatarCarousel, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'back.out(1.5)'
      }, '-=0.7');
    }

    hasMounted.current = true;
  }, []);

  // Fade out when currentIndex changes
  useEffect(() => {
    const displayedIndex = testimonials.findIndex(t => t.id === displayedTestimonial.id);
    if (displayedIndex === currentIndex || !hasMounted.current) return;

    isTransitioning.current = true;

    const quoteMark = cardRef.current?.querySelector('.quote-mark');
    const testimonialText = cardRef.current?.querySelector('.testimonial-text');
    const ratingContainer = cardRef.current?.querySelector('.rating-container');
    const stars = cardRef.current?.querySelectorAll('.star');
    const avatarWrapper = cardRef.current?.querySelector('.avatar-wrapper');
    const authorInfo = cardRef.current?.querySelector('.author-info');

    const tlOut = gsap.timeline({
      onComplete: () => {
        setDisplayedTestimonial(testimonials[currentIndex]);
      }
    });

    // PHASE 1: Fade out (0s - 0.5s)
    tlOut.to([testimonialText, authorInfo], {
      opacity: 0,
      y: -15,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.03
    }, 0);

    tlOut.to(quoteMark, {
      opacity: 0.1,
      rotation: -10,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

    tlOut.to(stars, {
      scale: 0.85,
      opacity: 0.4,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.02
    }, 0);

    tlOut.to(avatarWrapper, {
      scale: 0.9,
      opacity: 0.4,
      y: -8,
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

    tlOut.to(ratingContainer, {
      opacity: 0.4,
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

  }, [currentIndex, displayedTestimonial]);

  // Fade in when displayedTestimonial changes
  useEffect(() => {
    if (!hasMounted.current) return;

    const quoteMark = cardRef.current?.querySelector('.quote-mark');
    const testimonialText = cardRef.current?.querySelector('.testimonial-text');
    const ratingContainer = cardRef.current?.querySelector('.rating-container');
    const stars = cardRef.current?.querySelectorAll('.star');
    const avatarWrapper = cardRef.current?.querySelector('.avatar-wrapper');
    const authorInfo = cardRef.current?.querySelector('.author-info');

    const tlIn = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      }
    });

    // PHASE 2: Fade in
    tlIn.to(quoteMark, {
      opacity: 0.3,
      rotation: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.6)'
    }, 0);

    tlIn.to(stars, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.04
    }, 0);

    tlIn.to([testimonialText, authorInfo], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.05
    }, 0.1);

    tlIn.to(avatarWrapper, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'back.out(1.7)'
    }, 0.1);

    tlIn.to(ratingContainer, {
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, 0);

  }, [displayedTestimonial]);

  const handleNext = () => {
    if (!isTransitioning.current) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning.current) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#1F1E1E] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2EC4B6] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B5DE5] rounded-full opacity-10 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2EC4B6] rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Loved by <span className="text-[#2EC4B6]">thousands</span>
          </h2>
          <p className="text-xl text-gray-400">See what our customers have to say</p>
        </div>

        {/* Main testimonial card */}
        <div ref={cardRef} className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-12 md:p-16 relative border border-white/10 transition-all duration-500">
          
          {/* Testimonial Content */}
          <TestimonialContent testimonial={displayedTestimonial} />

          {/* Avatar Carousel */}
          <AvatarCarousel currentAvatar={displayedTestimonial.avatar} />

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning.current}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-[#2EC4B6] hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 md:w-7 h-5 md:h-7 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning.current}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-[#2EC4B6] hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <svg className="w-5 md:w-7 h-5 md:h-7 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => !isTransitioning.current && setCurrentIndex(idx)}
                disabled={isTransitioning.current}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'w-8 bg-[#2EC4B6]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;