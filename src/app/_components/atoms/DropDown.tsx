import { useEffect, useRef } from "react";
import styles from "./_css/dropdown.module.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "center";
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: "radius_8" | "radius_16";
  children: React.ReactNode;
}

export default function Dropdown({
  isOpen,
  onClose,
  position = "center",
  width,
  height = "auto",
  margin,
  borderRadius = "radius_8",
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
      } ${styles[borderRadius]}`}
      style={{ width, height, margin }}
    >
      {children}
    </div>
  );
}
