"use client";

import { useRouter } from "next/navigation";
import styles from "./_css/gnb.module.css";
import { useRecoilState } from "recoil";
import { activeItemState } from "@/app/_recoil";

type NavItemProps = {
  label: string;
  href: string;
  show: boolean;
};

export default function NavItem({ label, href, show }: NavItemProps) {
  const [activeItem, setActiveItem] = useRecoilState(activeItemState);
  const router = useRouter();

  if (!show) return null;

  const handleClick = () => {
    if (activeItem === label) return;
    setActiveItem(label);
    router.push(href);
  };

  return (
    <li>
      <button onClick={handleClick} disabled={activeItem === label}>
        <h2
          className={`${styles.gnb_item} ${
            activeItem === label ? styles.gnb_item_on : ""
          }`}
        >
          <span>{label}</span>
        </h2>
      </button>
    </li>
  );
}
