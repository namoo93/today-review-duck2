import Image from "next/image";
import imageDefault from "@/../../public/images/logo.svg";

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
        src={src ? src : imageDefault}
        alt={alt}
        loading={"lazy"}
        fill
        style={{ objectFit: "cover" }}
        sizes="100vh"
      />
    </span>
  );
}
