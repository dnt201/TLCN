import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 256 256"
    xmlSpace="preserve"
    {...props}
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
    >
      <path
        d="M28.303 81.565c33.962 0 52.538-28.138 52.538-52.538 0-.799 0-1.595-.054-2.387a37.557 37.557 0 0 0 9.212-9.558 36.845 36.845 0 0 1-10.606 2.905 18.527 18.527 0 0 0 8.118-10.213 36.995 36.995 0 0 1-11.725 4.482c-6.993-7.436-18.69-7.795-26.126-.802a18.483 18.483 0 0 0-5.342 17.643A52.424 52.424 0 0 1 6.264 11.804c-4.901 8.437-2.398 19.231 5.717 24.649A18.331 18.331 0 0 1 3.6 34.142v.234a18.471 18.471 0 0 0 14.814 18.101c-2.718.741-5.571.85-8.338.317a18.485 18.485 0 0 0 17.251 12.823A37.053 37.053 0 0 1 0 73.27a52.279 52.279 0 0 0 28.303 8.28"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "#1da1f2",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </g>
  </svg>
);

export default SvgComponent;
