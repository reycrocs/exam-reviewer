// CustomLinks.tsx
import React from 'react';

interface CustomLinksProps {
  href: string; // URL the link should point to
  text: string; // Text displayed inside the link
  className?: string; // Optional custom class for additional styling
}

const CustomLinks: React.FC<CustomLinksProps> = ({ href, text, className = '' }) => {
  return (
    <a href={href} className={`hover:text-green-600 ${className}`}>
      {text}
    </a>
  );
};

export default CustomLinks;
