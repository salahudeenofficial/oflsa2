import React, { useState, useRef, useEffect } from 'react';

// Simple base64 placeholder generator - creates a tiny blurred placeholder
const generatePlaceholder = (width = 20, height = 20, color = '#241afe') => {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || generatePlaceholder());
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setIsInView(true);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '50px'
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for older browsers
        setIsInView(true);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Keep placeholder on error
        console.error(`Failed to load image: ${src}`);
      };
    }
  }, [isInView, src, isLoaded]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;

