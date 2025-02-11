import { SVGProps } from 'react';

export function HelpSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="IconifyId194eed4d04433006b0">
          <g fill="none">
            <path
              fill="#fff"
              stroke="#fff"
              strokeLinejoin="round"
              stroke-width="4"
              d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
            />
            <path
              stroke="#000"
              stroke-linecap="round"
              strokeLinejoin="round"
              stroke-width="4"
              d="M24 28.625v-4a6 6 0 1 0-6-6"
            />
            <path
              fill="#000"
              fill-rule="evenodd"
              d="M24 37.625a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"
              clip-rule="evenodd"
            />
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#IconifyId194eed4d04433006b0)"
      />
    </svg>
  );
}
