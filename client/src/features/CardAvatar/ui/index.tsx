import React from "react";
import { Flex } from "antd";

import BookPlaceholder from "@/shared/images/book.svg";

interface CardAvatarProps {
  src?: string;
  alt: string;
  style?: React.CSSProperties;
}
export const CardAvatar: React.FC<CardAvatarProps> = ({ src, alt, style }) => {
  return (
    <Flex justify="center" style={{ height: 250, width: "100%", ...style }}>
      {src ? (
        <img src={src} alt={alt} width="100%" height="100%" style={{ objectFit: "contain" }} />
      ) : (
        <img src={BookPlaceholder} alt={alt} width="100%" height="100%" style={{ objectFit: "contain" }} />
      )}
    </Flex>
  )
}
