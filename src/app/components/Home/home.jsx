'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const names = [
    'luis eme',
    'λουίς εμέ',
    'louis eme',
    'луис эмм',
    'ルイス・エム',
  ];

  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentName = names[currentNameIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentName.length) {
          setDisplayText(currentName.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentName.substring(0, displayText.length - 1));
          setTypingSpeed(100);
        } else {
          // Move to next name
          setIsDeleting(false);
          setCurrentNameIndex((prev) => (prev + 1) % names.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentNameIndex, typingSpeed, names]);

  return (
    <div className="flex items-center justify-center h-screen bg-fixed custom-bg min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl  text-white">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
  );
}
