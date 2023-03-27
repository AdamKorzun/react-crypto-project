import { useState } from 'react';

const useModal = (): { isOpen: boolean; toggle: () => void } => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = (): void => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
};

export default useModal;
