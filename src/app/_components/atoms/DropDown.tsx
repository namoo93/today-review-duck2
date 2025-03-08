import { useEffect, useRef } from "react";
import styles from "./_css/dropdown.module.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "center";
  height?: string;
  margin?: string;
  scrollable?: boolean;
  children: React.ReactNode;
}

export default function Dropdown({
  isOpen,
  onClose,
  position = "center",
  height = "auto",
  margin,
  scrollable = false,
  children,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""} ${
        styles[position]
      } ${scrollable ? styles.scrollable : ""}`}
      style={{ height, margin }}
    >
      {children}
    </div>
  );
}
