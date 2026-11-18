import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({ src, alt, className = '', fallbackTitle }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EDE3] to-[#E6DFD1] text-[#5C715E] p-6 text-center ${className}`}
      >
        <Sparkles className="w-6 h-6 mb-2 opacity-70" aria-hidden="true" />
        <span className="font-editorial text-lg text-[#1E1E1E]">
          {fallbackTitle || 'atma° Botanical Edition'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
