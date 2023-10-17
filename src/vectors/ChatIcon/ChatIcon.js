import React from "react";
import styles from "./ChatIcon.module.css";

export const ChatIcon = () => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 100"
        fill="none"
        width="25"
      >
        <g clipPath="url(#clip0_101_6)">
          <path
            d="M21.76 53.94V21.44H7.56C3.38 21.44 0 24.84 0 29.02V96.2C0 99.58 4.08 101.26 6.46 98.88L22.08 83.26H66.56C70.74 83.26 74.12 79.88 74.12 75.7V61.5H29.34C25.16 61.5 21.76 58.12 21.76 53.94Z"
            fill="#ffffff"
          />
          <path
            d="M66.56 21.44H21.76V53.92C21.76 58.1 25.14 61.48 29.32 61.48H74.1V29.02C74.12 24.84 70.74 21.44 66.56 21.44Z"
            fill="#ffffff"
          />
        </g>
        <g>
          <path
            d="M88.32 0H29.34C25.16 0 21.78 3.38 21.78 7.56V21.44H66.56C70.74 21.44 74.12 24.82 74.12 29V61.48H88.32C92.5 61.48 95.88 58.1 95.88 53.92V7.56C95.88 3.38 92.5 0 88.32 0Z"
            fill="#ffffff"
          />
        </g>

        <defs>
          <clipPath id="clip0_101_6">
            <rect width="95.88" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    <div className={styles.redDot}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 122.88 122.88"
        xmlSpace="preserve"
      >
        <style type="text/css">
          {`.st0 {
          fill-rule: evenodd;
          clip-rule: evenodd;
          fill: #FF4141;
        }`}
        </style>
        <g>
          <path
            className="st0"
            d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44S0,95.37,0,61.44S27.51,0,61.44,0L61.44,0z"
          />
        </g>
      </svg>
      </div>
    </div>
  );
};
