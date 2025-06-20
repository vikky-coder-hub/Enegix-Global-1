"use client";

import React, { useState, useRef, useEffect } from "react";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See Our Work in Action
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Watch how we bring digital experiences to life
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/header.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            {isLoaded && (
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                }`}
                onClick={handlePlayClick}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                  {isPlaying ? (
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  ) : (
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
