import { MouseEventHandler } from "react";

const SendIcon = ({className, eventhandler}: {className: string, eventhandler: MouseEventHandler}) => {
  return (
    <svg
      fill="#000000"
      width="100px"
      height="100px"
      viewBox="0 0 24 24"
      id="send"
      data-name="Line Color"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon line-color ${className}`}
      onClick={eventhandler}
    >
      <line
        id="secondary"
        x1="7"
        y1="12"
        x2="11"
        y2="12"
        fill="none"
        stroke="rgb(44,169,188)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></line>
      <path
        id="primary"
        d="M5.44,4.15l14.65,7a1,1,0,0,1,0,1.8l-14.65,7A1,1,0,0,1,4.1,18.54l2.72-6.13a1.06,1.06,0,0,0,0-.82L4.1,5.46A1,1,0,0,1,5.44,4.15Z"
        fill="none"
        stroke="rgb(0,0,0)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};

export default SendIcon;
