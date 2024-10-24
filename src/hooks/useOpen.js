import { useState } from "react";

export default function useOpen(state) {
  const [isOpen, setIsOpen] = useState(!!state);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
