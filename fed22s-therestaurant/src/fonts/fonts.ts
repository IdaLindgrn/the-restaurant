import { createGlobalStyle } from "styled-components";
import PoppinsLight from "./Poppins-Light.ttf";
import PermanentMarker from "./PermanentMarker-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: "Poppins";
        src: local("Poppins"),
        url(${PoppinsLight}) format("truetype");
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: "Permanent Marker";
        src: local("Permanent Marker"),
        url(${PermanentMarker}) format("truetype");
        font-weight: 400;
        font-style: normal;
    }
`;
