import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: -apple-system, "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberations Sans", sans-serif;
    font-weight: 400; 
    white-space: nowrap;
    font-size: 11px; 
  }
  body {
    width: 100vw;
    height: 100vh;
  }
  .root {
    height: 100vh;
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root {
    --white: hsl(0,0%,100%);
    --black-025: hsl(210,8%,98%);
    --black-050: hsl(210,8%,95%);
    --black-070: hsl(210,10%,90%);
    --black-100: hsl(216,10%,90%);
    --black-200: hsl(210,8%,75%);
    --black-350: hsl(210,8%,60%);
    --black-500: hsl(210,8%,45%);
    --black-600: hsl(210,8%,35%);
    --black-700: hsl(210,8%,25%);
    --black-800: hsl(210,8%,15%);
    --black-900: hsl(210,8%,5%);
    --main-400: hsl(27,90%,55%);
    --red-400: hsl(358,68%,59%);
    --yellow-050: hsl(47,87%,94%);
    --yellow-100: hsl(47,83%,91%);
    --yellow-200: hsl(46,65%,84%);
    --blue-050: hsl(208,100%,97%);
    --blue-500: hsl(206,100%,52%);
    --blue-600: hsl(206,100%,40%);
    --blue-900: hsl(209,100%,26%);
    --powder-100: hsl(206,47%,97%);
    --powder-200: hsl(205,54%,88%);
    --powder-300: hsl(205,57%,81%);
    --powder-700: hsl(205,47%,42%);
  }
`;

export default GlobalStyles;
