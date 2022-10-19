import * as React from "react";
import { SVGProps } from "react";

const Tutorial = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.695 20C5.073 20 .5 15.514.5 10S5.073 0 10.695 0c3.064 0 5.937 1.333 7.883 3.658.378.451.46.971 0 1.342-.325.261-.896.217-1.078 0-1.535-1.834-4-3.5-6.805-3.5C6.262 1.5 2 5.652 2 10s4.262 8.5 8.695 8.5c2.784 0 5.822-1.998 7.305-4.314.317-.495.736-.493.995-.334.541.334.656.963.34 1.458-1.88 2.937-5.11 4.69-8.64 4.69Z"
      fill="#3ED6A4"
    />
    <path d="m8.5 5 7 4.718L8.5 14V5Z" fill="#3ED6A4" />
  </svg>
);

export default Tutorial;
