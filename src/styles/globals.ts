import { css } from "@emotion/react";
import "@fontsource/work-sans";
import "@fontsource/inter";

export default css`
  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
  }
  html {
    word-break: normal;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px white inset;
  }

  #nprogress .bar {
    height: 5px;
  }

  select {
    option {
      background-color: hsl(150, 6.7%, 13.1%) !important;
      color: hsl(0, 0%, 100%) !important;
    }
  }

  *,
  *::before,
  *::after {
    border-color: hsl(150, 5.8%, 19.9%) !important;
  }
`;
