import { ButtonHTMLAttributes } from 'react';
import { openWindow, WindowOptions } from '../../utils/window';

interface WindowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  windowOptions: WindowOptions;
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Botão que abre uma nova janela Tauri
 */
export function WindowButton({ 
  windowOptions, 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: WindowButtonProps) {
  const handleClick = () => {
    openWindow(windowOptions);
  };

  // Algumas classes CSS base com base na variante
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'outline':
        return 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100';
      case 'primary':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    }
  };

  const buttonClass = `
    ${getVariantClass()}
    px-4 py-2 rounded-md font-medium transition-all
    shadow hover:shadow-md hover:scale-105 active:scale-100
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    ${className}
  `;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
} 