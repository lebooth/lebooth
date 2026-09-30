"use client";

import { useEffect, useRef } from "react";

/** Silent, looping background clip. Audio is locked off; pauses when off-screen. */
export default function AutoVideo({ src, label, className }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    const play = () => v.play().catch(() => {});
    const lockMute = () => {
      if (!v.muted || v.volume > 0) {
        v.muted = true;
        v.volume = 0;
      }
    };
    v.addEventListener("volumechange", lockMute);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("volumechange", lockMute);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      disablePictureInPicture
    />
  );
}
