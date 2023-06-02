import { createGlobalStyle } from 'styled-components';

export const StylesReset = createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
    word-break: normal;
    -moz-tab-size: 4;
    tab-size: 4;
  }

  *,
  ::before,
  ::after {
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  ::before,
  ::after {
    text-decoration: inherit;
    vertical-align: inherit;
  }

  * {
    padding: 0;
    margin: 0;
  }

  hr {
    overflow: visible;
    height: 0;
  }

  details,
  main {
    display: block;
  }

  summary {
    display: list-item;
  }

  small {
    font-size: 80%;
  }

  [hidden] {
    display: none;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
  }

  a {
    background-color: transparent;
    color: #000;
    text-decoration: none;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    overflow-y: hidden;
  }

  pre {
    font-size: 1em;
  }

  b,
  strong {
    font-weight: bolder;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -.25em;
  }

  sup {
    top: -.5em;
  }

  input {
    border-radius: 0;
  }

  [disabled] {
    cursor: default;
  }

  [type=number]::-webkit-inner-spin-button,
  [type=number]::-webkit-outer-spin-button {
    height: auto;
  }

  [type=search] {
    -webkit-appearance: textfield;
    appearance: textfield;
    outline-offset: -2px;
  }

  [type=search]::-webkit-search-cancel-button,
  [type=search]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
  }

  optgroup {
    font-weight: bold;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type=button],
  [type=reset],
  [type=submit],
  [role=button] {
    cursor: pointer;
    color: inherit;
  }

  button::-moz-focus-inner,
  [type=button]::-moz-focus-inner,
  [type=reset]::-moz-focus-inner,
  [type=submit]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type=button]::-moz-focus-inner,
  [type=reset]::-moz-focus-inner,
  [type=submit]::-moz-focus-inner {
    outline: 1px dotted black;
  }

  button,
  html [type=button],
  [type=reset],
  [type=submit] {
    -webkit-appearance: button;
    appearance: button;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border-style: none;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  select::-ms-value {
    color: currentColor;
  }

  legend {
    border: 0;
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    color: inherit;
    font: inherit;
  }

  img {
    border-style: none;
  }

  progress {
    vertical-align: baseline;
  }

  svg:not([fill]) {
    fill: currentColor;
  }

  @media screen {
    [hidden~=screen] {
      display: inherit;
    }
    [hidden~=screen]:not(:active):not(:focus):not(:target) {
      position: absolute !important;
      clip: rect(0 0 0 0) !important;
    }
  }

  [aria-busy=true] {
    cursor: progress;
  }

  [aria-controls], label {
    cursor: pointer;
  }

  [aria-disabled=true] {
    cursor: default;
  }
`;
