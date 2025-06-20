"use client";

import { useEffect } from 'react';

export default function ScrollFix() {
  
  useEffect(() => {
    // Fix for scroll issues on initial load and during navigation
    const fixScrollIssues = () => {
      // Allow scrolling
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overscrollBehaviorY = 'none';
      
      // Remove any pointer-events-none from body or main elements that might block scrolling
      document.body.style.pointerEvents = 'auto';
        // Reset any CSS properties that might interfere with scrolling
      const mainElements = [
        document.getElementById('__next'),
        document.querySelector('main'),
        document.querySelector('.bg-\\[\\#0a192f\\]')
      ];
      
      mainElements.forEach(el => {
        if (el) {
          const htmlEl = el as HTMLElement;
          htmlEl.style.transform = 'none';
          htmlEl.style.height = 'auto';
          htmlEl.style.overflowY = 'visible';
        }
      });
      
      // Fix for sticky hover effects that might interfere with scrolling on touch devices
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch) {
        document.documentElement.classList.add('touch-device');
      }
    };
    
    // Apply fixes when component mounts
    fixScrollIssues();
    
    // Also apply fixes when window is resized (may help with responsive issues)
    window.addEventListener('resize', fixScrollIssues);
    
    // Apply fixes again after a short delay to handle any dynamic content loading
    setTimeout(fixScrollIssues, 500);
    setTimeout(fixScrollIssues, 2000);  // One more time after everything has definitely loaded
    
    // Handle scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', fixScrollIssues);
    };
  }, []);
  
  return null;
}
