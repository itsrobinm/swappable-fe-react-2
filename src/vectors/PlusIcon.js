import React from "react";
import { darkGrey, lightGrey } from "../app/globalStyles";

export const PlusIcon = ({enabled}) => {
  return (
    <svg
    style={{ width: "25%" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <defs></defs>
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
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 45 90 c -6.075 0 -11 -4.925 -11 -11 V 11 c 0 -6.075 4.925 -11 11 -11 s 11 4.925 11 11 v 68 C 56 85.075 51.075 90 45 90 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: `${enabled ?  darkGrey : lightGrey}`,
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
          strokeLinecap="round"
        />
        <path
          d="M 79 56 H 11 C 4.925 56 0 51.075 0 45 s 4.925 -11 11 -11 h 68 c 6.075 0 11 4.925 11 11 S 85.075 56 79 56 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: `${enabled ?  darkGrey : lightGrey}`,
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
