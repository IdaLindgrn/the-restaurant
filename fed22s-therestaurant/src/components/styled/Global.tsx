import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background: #000000;
    color: hsl(0, 0%, 100%);
    font-family: sans-serif; 
    font-size: 1.35em;
    margin: 0;
    max-width: 100vw;
}

p {
    opacity: 1;
    line-height: 1.5;
}

img {
    max-width: 100% 
}

a {
    text-decoration: none;
    color: inherit;
}

/* React calendar */

`;
