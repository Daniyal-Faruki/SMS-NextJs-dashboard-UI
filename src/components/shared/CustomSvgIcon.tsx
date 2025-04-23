// components/SvgIcon.tsx
import React from "react";
import Image from "next/image";

type CustomSvgIconnProps = {
  Icon: string | React.FC<React.SVGProps<SVGSVGElement>> | null;
  alt?: string;
  size?: number;
  className?: string;
};

const CustomSvgIcon: React.FC<CustomSvgIconnProps> = ({
  Icon,
  alt = "icon",
  size = 10,
  className = "inline mr-2",
}) => {
  if (!Icon) return null;

  // Case 1: If it's a React component (SVG via SVGR)
  if (typeof Icon === "function") {
    const IconComponent = Icon;
    return (
      <Icon
        className={`${className} w-${size} h-auto`}
        aria-hidden
      />
    );
  }

  // Case 2: Fallback to image (static asset path)
  return (
    <Image
      src={Icon}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default CustomSvgIcon;
