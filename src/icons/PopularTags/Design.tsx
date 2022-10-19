import * as React from "react";
import { SVGProps } from "react";

const Design = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.723 5c-1.128 0-2.051.862-2.215 1.983h-3.385V5H7.61v1.983H4.472C4.287 5.863 3.364 5 2.256 5 1.006 5 0 6.056 0 7.371s1.005 2.37 2.256 2.37C3.2 9.742 4 9.139 4.35 8.277H5.64C3.446 9.656 2 12.5 2.77 16H4c-.5-3.5 1.046-6.41 3.61-7.25v.992h4.513V8.75C14.687 9.59 17 12.5 16 16h1.23c.77-4-.943-6.345-3.117-7.724h1.538C16 9.138 16.8 9.74 17.744 9.74c1.25 0 2.256-1.056 2.256-2.37C20 6.056 18.974 5 17.723 5Z"
      fill="#5D95E8"
    />
  </svg>
);

export default Design;
