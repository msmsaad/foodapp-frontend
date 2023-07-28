// useModal.tsx
import { ModalContext } from './ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const { modal, setModal } = useContext(ModalContext);

  if (!modal || !setModal) throw new Error('Must be used within ModalProvider');

  function toggleModal(id: string) {
    setModal(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return { modal, toggleModal };
};
