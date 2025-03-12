import { useRecoilState } from "recoil";
import { modalState } from "../_recoil/modalAtom";

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = (content: React.ReactNode) => {
    setModal({ isOpen: true, content });
  };

  const closeModal = () => {
    setModal({ isOpen: false, content: null });
  };

  return { modal, openModal, closeModal };
};
