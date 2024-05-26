import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";

interface certificateProps {
  icon?: string;
}

export default function CertificateBox({
  icon,
  children,
  ...props
}: PropsWithChildren<certificateProps>) {
  return (
    <div
      id="certificateb-box"
      css={css`
        ${DESIGN_SYSTEM_TEXT.B2}
        border-radius: 0.2rem;
        padding: 0.5rem 1.1rem;
        background: ${icon ? `transparent` : DESIGN_SYSTEM_COLOR.BRAND_BLUE};
        color: ${DESIGN_SYSTEM_COLOR.GRAY_50};
        white-space: nowrap;
        width: auto;
        ${icon && `padding-right: 0`}
      `}
      {...props}
    >
      {icon ? <img src={icon} /> : children}
    </div>
  );
}
