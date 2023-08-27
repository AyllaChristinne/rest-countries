import { IconProps } from "./MoonIcon";

export const BackIcon = ({ classNames }: IconProps) => (
  <span className={classNames}>
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .cls-1 {
            fill: none;
            stroke: var(--color-text);
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2px;
          }
        `}
      </style>
      <g id="arrow-left">
        <line className="cls-1" x1="3" x2="29" y1="16" y2="16" />
        <line className="cls-1" x1="3" x2="7" y1="16" y2="11" />
        <line className="cls-1" x1="3" x2="7" y1="16" y2="21" />
      </g>
    </svg>
  </span>
);
