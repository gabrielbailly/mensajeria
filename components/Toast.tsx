import React, { useEffect } from 'react';
import { CheckCircleIcon } from './icons.tsx';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-5 z-50 animate-fade-in-down">
        <div className="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md rounded-lg">
            <div className="flex-shrink-0">
                <CheckCircleIcon />
            </div>
            <div className="ml-3">
                <p className="text-sm font-semibold text-white">{message}</p>
            </div>
        </div>
    </div>
  );
};

export default Toast;