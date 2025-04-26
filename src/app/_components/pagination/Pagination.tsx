import styles from "./pagination.module.css";
import IconNextMore from "@/../../public/icon/icon-arrow-next-more.svg";
import IconNext from "@/../../public/icon/icon-arrow-next.svg";
import IconPrevMore from "@/../../public/icon/icon-arrow-prev-more.svg";
import IconPrev from "@/../../public/icon/icon-arrow-prev.svg";
import { Icon } from "../atoms";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  margin?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  margin,
}: Props) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];

    // 5개 이하일 땐 전체 표시
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 5개 초과 시
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = startPage + 4;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - 4;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination} style={{ margin }}>
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <Icon width={20} height={20} src={IconPrevMore} alt="이전 목록 끝" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon width={20} height={20} src={IconPrev} alt="이전 목록 " />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon width={20} height={20} src={IconNext} alt="다음 목록 " />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <Icon width={20} height={20} src={IconNextMore} alt="다음 목록 끝" />
      </button>
    </div>
  );
}
