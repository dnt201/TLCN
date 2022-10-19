import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title />
    <path
      d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Zm0 14.2c-2.5 0-4.7-1.3-6-3.2 0-2 4-3.1 6-3.1s6 1.1 6 3.1c-1.3 1.9-3.5 3.2-6 3.2Z"
      fill="#000"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgComponent;
