import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, className }) => {
  return (
    <div
      className={`rounded-lg p-6 shadow-md bg-gray-800 ${className || ''}`}
      style={{
        color: '#f0f0f0',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
