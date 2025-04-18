"use client";
import { Button, Icon, Input } from "@/app/_components/atoms";
import styles from "../_css/writingform.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import IcoBackDark from "@/../../public/icon/icon-back-dark.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { activeItemState, themeState } from "@/app/_recoil";
import { useEffect, useRef, useState } from "react";
import Modal from "@/app/_components/modal/Modal";
import { useModal } from "@/app/_hooks/useModal";
import IsBackModalContent from "./IsBackModalContent";
import TextArea from "@/app/_components/atoms/TextArea";
import TagInput from "./TagInput";
import EvaluationSelector from "./EvaluationSelector";
import { ImageDataType, ReviewSubmitPayload } from "@/types";
import ImageUploader from "./ImageUploader";
import { useReviewDetail } from "@/app/_hooks/useReviewDetail";
import { useSubmitReview } from "@/app/_hooks/useSubmitReview";
import { useToast } from "@/app/_hooks/useToast";
import { useUploadReviewImages } from "@/app/_hooks/useUploadReviewImages";

export default function WritingForm({ reviewIdx }: { reviewIdx?: number }) {
  const isEdit = typeof reviewIdx === "number" && !isNaN(reviewIdx);
  const [theme] = useRecoilState(themeState);
  const [, setActiveItem] = useRecoilState(activeItemState);
  const { addToast } = useToast();
  const router = useRouter();
  const { openModal } = useModal();
  const [titleData, setTitleData] = useState("");
  const [review, setReview] = useState("");
  const [rangeValue, setRangeValue] = useState<number>(3);
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<ImageDataType[]>([]);

  const { post, put } = useSubmitReview();
  const { mutateAsync: uploadImages } = useUploadReviewImages();

  // 수정인 경우 기존 데이터 호출
  const { data: reviewDetail, isLoading } = useReviewDetail(reviewIdx!, {
    enabled: isEdit,
  });
  useEffect(() => {
    if (reviewIdx && reviewDetail) {
      setTitleData(reviewDetail.title);
      setReview(reviewDetail.content);
      setTags(reviewDetail.tags);
      setRangeValue(reviewDetail.score);
      setImages(
        reviewDetail.images
          ? reviewDetail.images.map((src, idx) => ({
              previewUrl: src,
              description: reviewDetail.imgContent?.[idx] ?? "",
              isRepresentative: idx === 0,
            }))
          : []
      );
    }
  }, [reviewIdx, reviewDetail]);

  const handleBack = () => {
    openModal(<IsBackModalContent />);
  };

  // 태그 데이터
  const handleAddTagInput = () => {
    setTags([...tags, ""]);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleDeleteTagInput = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index); // 해당 인덱스의 태그 삭제
    setTags(newTags);
  };

  // 이미지 데이터
  const handleAddImage = (image: ImageDataType) => {
    if (images.length < 6) {
      setImages([...images, image]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);

    // 삭제 후 첫 번째 이미지를 대표로 설정
    const newImages = updated.map((img, i) => ({
      ...img,
      isRepresentative: i === 0,
    }));

    setImages(newImages);
  };

  // 인풋 텍스트 개행 있을시 /n으로 변경
  const escapeNewlines = (text: string) => text.replace(/\n/g, "\n");

  const handleDescriptionChange = (index: number, desc: string) => {
    const updated = [...images];
    updated[index].description = desc;
    setImages(updated);
  };

  /** 이미지 업로드 후 images state 갱신 */
  const prepareUploadImages = async (
    images: ImageDataType[]
  ): Promise<ImageDataType[]> => {
    /* S3 경로 체크 */
    const isUploadedUrl = (url: string) =>
      url.includes("https://s3.ap-northeast-2.amazonaws.com/");

    // 업로드 대상: S3 URL이 아닌 이미지들만
    const newImageFiles = images
      .filter((img) => !isUploadedUrl(img.previewUrl) && img.file)
      .map((img) => img.file!);

    // 이미지 업로드
    const uploadedPaths = await uploadImages(newImageFiles);

    // 새 업로드 이미지 인덱스 추적
    let uploadIndex = 0;

    // images 배열을 실제 업로드된 URL로 치환
    const updatedImages = images.map((img) => {
      if (isUploadedUrl(img.previewUrl)) {
        return img; // 기존 S3 이미지 그대로 유지
      }

      const newPreviewUrl = uploadedPaths[uploadIndex++];
      return {
        previewUrl: newPreviewUrl,
        description: img.description,
        isRepresentative: img.isRepresentative,
      };
    });

    return updatedImages;
  };

  const handleSubmit = async () => {
    console.log("등록될 리뷰 내용", review);
    try {
      const finalImages = await prepareUploadImages(images);

      const payload: ReviewSubmitPayload = {
        title: titleData,
        content: escapeNewlines(review),
        score: rangeValue,
        tags,
        thumbnail: finalImages[0]?.previewUrl,
        thumbnailContent: finalImages[0]?.description ?? "",
        images: finalImages.map((img) => ({
          imgPath: img.previewUrl,
          content: img.description,
        })),
      };

      if (isEdit && reviewIdx) {
        await put.mutateAsync({ reviewIdx, payload });
      } else {
        await post.mutateAsync(payload);
      }

      // 👉 UI 후처리
      addToast("리뷰가 성공적으로 등록되었어요! 🎉", "success");
      router.push("/");
      setActiveItem("최신");
    } catch (err) {
      addToast("오류가 발생했어요. 다시 시도해주세요. 😢", "error");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.writing_form_box}>
        <h3 className={styles.page_title}>
          <button
            type="button"
            className={styles.back_button}
            onClick={handleBack}
          >
            <Icon
              src={theme == "light" ? IcoBack : IcoBackDark}
              alt="리뷰쓰기 페이지 뒤로가기 버튼 아이콘"
              width={36}
              height={36}
            />
          </button>
          리뷰 등록하기
        </h3>
        <div className={styles.writing_form}>
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>제목</strong>
            <Input
              type={"text"}
              name={"title"}
              placeholder="리뷰 제목을 자유롭게 작성해주세요."
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
              maxLength={150}
              minLength={1}
            />
          </div>
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              태그를 입력해주세요.
            </strong>
            <span className={`${styles.input_info}`}>
              버튼을 클릭하여 태그를 등록할 수 있습니다.
            </span>

            <TagInput
              tags={tags}
              onAddTag={handleAddTagInput}
              onChangeTag={handleTagChange}
              onDeleteTag={handleDeleteTagInput}
            />
          </div>

          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              평가를 선택해주세요.
            </strong>

            <EvaluationSelector
              value={rangeValue}
              onChange={(val) => {
                setRangeValue(val);
                console.log("선택된 값:", val); // 여기서 출력됨
              }}
            />
          </div>

          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              이미지를 등록해주세요.
            </strong>
            <span className={`${styles.input_info}`}>
              이미지는 최대 6장까지 등록할 수 있습니다.
            </span>

            <ImageUploader
              images={images}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
              onChangeDescription={handleDescriptionChange}
            />
          </div>
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              리뷰를 작성해주세요.
            </strong>
            <TextArea
              name="review"
              placeholder="리뷰 내용을 자유롭게 작성해주세요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              height="242px"
              maxLength={5000}
              minLength={1}
            />
          </div>
          <p className={styles.writing_info}>
            근거 없는 비방 또는 관련 없는 리뷰일 경우 <br />
            서비스 이용약관이나 관련 법률에 따라 제재를 받을 수 있습니다.
          </p>
        </div>
        <div className={styles.writing_form_button}>
          {theme == "light" ? (
            <Button
              buttonType={"button"}
              filled
              width="335px"
              onClick={handleSubmit}
            >
              {isEdit ? "수정하기" : "등록하기"}
            </Button>
          ) : (
            <Button
              buttonType={"button"}
              filledDark
              width="335px"
              onClick={handleSubmit}
            >
              {isEdit ? "수정하기" : "등록하기"}
            </Button>
          )}
        </div>
      </div>
      <Modal width="355px" />
    </section>
  );
}
