import { useMutation } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";

export const useUploadReviewImages = () => {
  const uploadSingleImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await reviewInstance.post<{ imgPath: string }>(
      "/image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.imgPath;
  };

  const uploadMultiple = async (files: File[]) => {
    const promises = files.map((file) => uploadSingleImage(file));
    return Promise.all(promises);
  };

  const mutation = useMutation({
    mutationFn: uploadMultiple,
  });

  return mutation;
};
