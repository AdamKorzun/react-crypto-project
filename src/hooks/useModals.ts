import { useState } from 'react';

const useModal = (): { isOpen: boolean; toggle: () => void } => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
};

export default useModal;
