import React from 'react';
import { BackgroundTheme } from '../types';

interface AnimatedBackgroundProps {
  theme: BackgroundTheme;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const renderThemeBackground = () => {
    switch(theme) {
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        );
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full opacity-50">
                <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.2)" className="wave" style={{animationDuration: '7s'}} />
                        <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.15)" className="wave" style={{animationDuration: '10s', animationDelay: '-2s'}} />
                        <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.1)" className="wave" style={{animationDuration: '13s', animationDelay: '-3s'}}/>
                        <use href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.05)" className="wave" style={{animationDuration: '20s', animationDelay: '-5s'}}/>
                    </g>
                </svg>
            </div>
          </div>
        )
      case 'aurora':
         return <div className="absolute inset-0 animate-aurora-bg"/>;
      case 'cosmic':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        );
      case 'prism':
         return (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-20 bg-gradient-to-r from-red-400/30 via-yellow-400/30 to-green-400/30 animate-pulse" />
              <div className="absolute -inset-20 bg-gradient-to-l from-blue-400/30 via-indigo-400/30 to-purple-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
         );
      case 'matrix':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-green-400 font-mono text-xs opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${-10 + Math.random() * 20}%`,
                  animation: `matrix-rain ${3 + Math.random() * 4}s linear infinite`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                {Math.random().toString(36).substring(2, 8)}
              </div>
            ))}
          </div>
        );
      case 'geometric':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-gray-300/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  animation: `geometric-float ${4 + Math.random() * 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        );
      case 'neon':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${10 + Math.random() * 30}px`,
                  height: `${10 + Math.random() * 30}px`,
                  background: `radial-gradient(circle, ${['#ff00ff', '#00ffff', '#ffff00', '#ff0080'][Math.floor(Math.random() * 4)]}40, transparent)`,
                  animation: `neon-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
      case 'forest':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 bg-green-400/30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  height: `${10 + Math.random() * 50}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`
                }}
              />
            ))}
          </div>
        );
      case 'galaxy':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '60s' }}>
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    left: `${50 + Math.cos(i * 0.1) * (20 + Math.random() * 30)}%`,
                    top: `${50 + Math.sin(i * 0.1) * (20 + Math.random() * 30)}%`,
                    width: `${1 + Math.random() * 3}px`,
                    height: `${1 + Math.random() * 3}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'crystal':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-br from-cyan-200/40 to-blue-300/40 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${15 + Math.random() * 25}px`,
                  height: `${15 + Math.random() * 25}px`,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        );
      case 'fire':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${-5 + Math.random() * 20}%`,
                  width: `${3 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 15}px`,
                  background: `radial-gradient(ellipse, ${['#ff4500', '#ff6347', '#ffa500', '#ff8c00'][Math.floor(Math.random() * 4)]}, transparent)`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
      case 'electric':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '2px',
                  height: `${50 + Math.random() * 100}px`,
                  background: 'linear-gradient(to bottom, #00ffff, transparent)',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        );
      case 'cyberpunk':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse" />
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        );
      case 'rainbow':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ animation: 'rainbow-shift 8s linear infinite' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/30 via-yellow-200/30 to-green-200/30" />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-200/30 via-indigo-200/30 to-purple-200/30" />
            </div>
          </div>
        );
      case 'snow':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${-10 + Math.random() * 20}%`,
                  animation: `snow-fall ${5 + Math.random() * 8}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return <div></div>;
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-0">
      {renderThemeBackground()}
    </div>
  );
};