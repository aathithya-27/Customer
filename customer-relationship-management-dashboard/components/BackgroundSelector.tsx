import React, { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import { BackgroundTheme } from '../types';
import { BACKGROUND_OPTIONS } from '../constants';

interface BackgroundSelectorProps {
    selectedTheme: BackgroundTheme;
    onThemeChange: (theme: BackgroundTheme) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const currentThemeDetails = BACKGROUND_OPTIONS[selectedTheme];
    const cardClass = currentThemeDetails.isDark
        ? 'bg-gray-900/80 border-gray-700/50 text-gray-200'
        : 'bg-white/80 border-gray-200/50 text-gray-800';

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-full shadow-lg ${cardClass} backdrop-blur-md border hover:scale-105 transition-transform`}
                aria-label="Open theme selector"
            >
                <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '10s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }} />
            </button>

{isOpen && (
    <div 
      className={`absolute top-14 right-0 w-80 ${cardClass} backdrop-blur-md border rounded-xl shadow-xl p-4 space-y-2 max-h-[80vh] overflow-y-auto`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-selector-title"
    >
        <div className="flex justify-between items-center mb-2">
          <h3 id="theme-selector-title" className="font-semibold">Choose Background Theme</h3>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close theme selector"
            className={`p-1 rounded-md hover:bg-gray-300 ${currentThemeDetails.isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {Object.entries(BACKGROUND_OPTIONS).map(([key, option]) => (
            <button
                key={key}
                onClick={() => {
                    onThemeChange(key as BackgroundTheme);
                    setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg border-2 transition-all ${
                    selectedTheme === key
                        ? 'border-blue-500 bg-blue-500/20'
                        : `${currentThemeDetails.isDark ? 'border-gray-700' : 'border-transparent'} hover:border-blue-400`
                }`}
            >
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-md ${option.class} border-2 border-white/50 shadow-sm relative overflow-hidden flex-shrink-0`}>
                        {option.animated && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                            {option.name}
                        </div>
                        <div className={`text-xs ${currentThemeDetails.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {option.description}
                        </div>
                    </div>
                     {selectedTheme === key && <Check className="w-5 h-5 text-blue-500" />}
                    {option.animated && ! (selectedTheme === key) && (
                        <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded-full">ANI</span>
                    )}
                </div>
            </button>
        ))}
    </div>
)}
        </div>
    );
};
