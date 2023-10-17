import { accentColor } from "../app/globalStyles";

export const ProfileImage = (props) => {
  const profileColor = "#a3a3a3";

  return (
    <div
      onClick={() => {
        props.onClick();
      }}
      className="w-16"
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25%",
          backgroundColor: "#f9f9f9",
          boxShadow: `0 0 0 4px ${accentColor}`,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="401px"
        height="401px"
        version="1.1"
        viewBox="312.809 0 401 401"
      >
        <g transform="matrix(1.223 0 0 1.223 -467.5 -843.44)">
          <rect
            x="601.45"
            y="653.07"
            width="401"
            height="401"
            fill="#EEEEEE00"
          />
          <path
            d="m802.38 908.08c-84.515 0-153.52 48.185-157.38 108.62h314.79c-3.87-60.44-72.9-108.62-157.41-108.62z"
            fill={profileColor}
          />
          <path
            d="m881.37 818.86c0 46.746-35.106 84.641-78.41 84.641s-78.41-37.895-78.41-84.641 35.106-84.641 78.41-84.641c43.31 0 78.41 37.9 78.41 84.64z"
            fill={profileColor}
          />
        </g>
      </svg>
    </div>
  );
};
