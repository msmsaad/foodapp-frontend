import { ModalContext } from './ModalContext';
import { useContext, ReactNode } from 'react';
import { useModal } from './useModal';

interface IModalProps {
  id: string;
  children: ReactNode;
}

const Modal = ({ id, children }: IModalProps) => {
  const { modal } = useContext(ModalContext);
  const { toggleModal } = useModal();
  if (!modal) throw new Error('Must be used within ModalProvider');

  return (
    <dialog id={id} className="modal" open={modal[id]}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => toggleModal(id)}
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
