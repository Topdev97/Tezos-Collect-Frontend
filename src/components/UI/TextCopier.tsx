import { useState } from "react";

function TextCopier(props: { text: string }) {
  const { text } = props;
  const [isClicked, setIsClicked] = useState(false);

  const Check = () => (
    <svg
      className="w-6 h-6 animation-fade-in"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="#21BF96"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
      <title id="copied-address">Copied!</title>
    </svg>
  );

  return (
    <div className="size-1 font-medium flex items-center justify-center gap-3">
      {isClicked ? (
        <Check />
      ) : (
        <svg
          width="19"
          height="22"
          viewBox="0 0 19 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(text);
            setIsClicked(true);
            setTimeout(() => {
              setIsClicked(false);
            }, 2000);
          }}
        >
          <path
            d="M13.6668 0.916687H2.66683C1.6585 0.916687 0.833496 1.74169 0.833496 2.75002V15.5834H2.66683V2.75002H13.6668V0.916687ZM16.4168 4.58335H6.3335C5.32516 4.58335 4.50016 5.40835 4.50016 6.41669V19.25C4.50016 20.2584 5.32516 21.0834 6.3335 21.0834H16.4168C17.4252 21.0834 18.2502 20.2584 18.2502 19.25V6.41669C18.2502 5.40835 17.4252 4.58335 16.4168 4.58335ZM16.4168 19.25H6.3335V6.41669H16.4168V19.25Z"
            fill="url(#paint0_linear_262_1570)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_262_1570"
              x1="0.833496"
              y1="11"
              x2="18.2502"
              y2="11"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00FBFB" />
              <stop offset="1" stopColor="#0050EA" />
            </linearGradient>
          </defs>

          <title>Copy Address</title>
        </svg>
      )}
    </div>
  );
}

export default TextCopier;
