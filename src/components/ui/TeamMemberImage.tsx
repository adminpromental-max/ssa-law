import Image from "next/image";

interface TeamMemberImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function TeamMemberImage({
  src,
  alt,
  className = "",
  sizes = "128px",
  priority = false,
}: TeamMemberImageProps) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isRemote}
    />
  );
}
