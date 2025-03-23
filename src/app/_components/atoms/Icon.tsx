import Image from "next/image";
import imgDefault from "@/../../public/images/img-default-profile.svg";
import imgDefaultDark from "@/../../public/images/img-default-profile-dark.svg";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

type Props = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  margin?: number | string;
};
export default function Icon({
  src,
  alt,
  width,
  height,
  className,
  margin,
}: Props) {
  const [theme] = useRecoilState(themeState);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: width ? width : "100%",
        height: height ? height : "100%",
        margin: margin ? margin : "0",
        position: "relative",
      }}
    >
      <Image
        src={src ? src : theme == "light" ? imgDefault : imgDefaultDark}
        alt={alt}
        loading={"lazy"}
        fill
        style={{ objectFit: "cover" }}
        sizes="100vh"
      />
    </span>
  );
}
