import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CarouselProps {
  images: string[];
  onClick?: () => void;
  className?: string;
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, onClick, className = '', showArrows = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <div className="bg-brand-gray w-full h-full" />;

  return (
    <div className={`relative overflow-hidden group ${className}`} onClick={onClick}>
      <div 
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`Slide ${idx}`} 
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {images.length > 1 && showArrows && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-orange' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;