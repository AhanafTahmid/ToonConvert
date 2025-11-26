'use client';

import { useEffect, useRef } from 'react';

interface AdConfig {
  key: string;
  height: number;
  width: number;
  format: 'iframe' | 'container';
}

const AD_CONFIGS = {
  ad1: {
    key: '270f393f5f398ba92f6ef046a96b6e76',
    height: 90,
    width: 728,
    format: 'iframe' as const,
  },
  ad2: {
    key: '4af0df4032021e43ba0910a37e37b1d2',
    height: 60,
    width: 468,
    format: 'iframe' as const,
  },
  ad3: {
    key: '5d74f191eb9e7a76f3a4122bf9604428',
    height: 250,
    width: 300,
    format: 'container' as const,
  },
};

interface AdBannerProps {
  type?: 'ad1' | 'ad2' | 'ad3';
}

export function AdBanner({ type = 'ad1' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const config = AD_CONFIGS[type];

  useEffect(() => {
    if (!adRef.current) return;

    const timeoutId = setTimeout(() => {
      if (!adRef.current) return;

      if (config.format === 'container') {
        // Ad3 format - create container div and load script
        const containerId = `container-${config.key}`;
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `//pl28141389.effectivegatecpm.com/${config.key}/invoke.js`;
        
        adRef.current.appendChild(script);
        adRef.current.appendChild(containerDiv);
      } else {
        // Ad1 and Ad2 format - iframe with atOptions
        (window as any).atOptions = {
          'key': config.key,
          'format': 'iframe',
          'height': config.height,
          'width': config.width,
          'params': {}
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.highperformanceformat.com/${config.key}/invoke.js`;
        script.async = true;
        
        if (adRef.current) {
          adRef.current.appendChild(script);
        }
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [config.key, config.height, config.width, config.format]);

  return (
    <div className="w-full flex justify-center my-6">
      <div 
        ref={adRef} 
        className="ad-container w-full"
        style={{ 
          minHeight: `${config.height}px`,
          width: '100%',
          maxWidth: `${config.width}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </div>
  );
}

