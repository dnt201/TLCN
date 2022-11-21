import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
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
        d="M59.66 57.578a20.6 20.6 0 0 0 6.075-14.665 20.6 20.6 0 0 0-6.075-14.665 20.57 20.57 0 0 0-12.18-5.912v-8.147l5.783 3.188 2.4-4.353-5.52-3.043 5.52-3.043-2.4-4.353-5.783 3.187V0h-4.97v5.773l-5.783-3.188-2.4 4.353 5.52 3.043-5.52 3.043 2.4 4.353 5.783-3.188v8.147a20.57 20.57 0 0 0-12.181 5.912c-8.085 8.086-8.086 21.244 0 29.33 3.411 3.411 7.726 5.365 12.18 5.898v5.144h-6.178v4.97h6.178v6.896l-4.42-4.42-3.514 3.514L44.995 90l10.419-10.419-3.514-3.515-4.42 4.42V73.59h6.177v-4.97H47.48v-5.144c4.454-.533 8.769-2.488 12.18-5.898zM33.844 31.761c2.979-2.978 6.939-4.619 11.151-4.619s8.172 1.64 11.15 4.619a15.64 15.64 0 0 1 4.407 8.665H29.445a15.667 15.667 0 0 1 4.399-8.665zm-4.398 13.637h31.107a15.64 15.64 0 0 1-4.407 8.665c-6.148 6.147-16.152 6.147-22.301 0a15.663 15.663 0 0 1-4.399-8.665z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "#fff",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </g>
  </svg>
);

export default SvgComponent;
