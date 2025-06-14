import React from 'react';

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded sm:rounded-2xl shadow-md p-2 sm:p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`mt-1 sm:mt-2 text-sm sm:text-base ${className}`}
>
      {children}
    </div>
  );
}
