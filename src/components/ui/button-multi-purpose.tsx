'use client';
import { IconType } from "react-icons";

interface MultiPurposeButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  }
  
  const Button = ({
    label,
  onClick,
  disabled = false,
  outline = false,
  small = false,
  icon: Icon,
  }: MultiPurposeButtonProps) => {
  
    return (
      <button onClick={onClick} disabled={disabled}
      className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-white' : 'bg-teal-500'}
            ${outline ? 'border-black' : 'border-teal-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
        {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {label}
    </button>
      );
    };
  export default Button;