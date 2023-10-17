// https://www.svgrepo.com/svg/26036/left-arrow

import { accentColor } from "../app/globalStyles";

export const LeftArrow = (props) => {
  return (
    <div {...props} className={`${props.className ? props.className : '' } w-7`} >
      <svg
        fill={accentColor}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 558.957 558.957"
      >
        <g>
          <g>
            <polygon points="462.745,0 96.212,279.479 462.745,558.957 462.745,419.221 278.713,279.479 462.745,139.738 		" />
          </g>
        </g>
      </svg>
    </div>
  );
};
