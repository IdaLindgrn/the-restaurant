import styled from "styled-components";

interface StyledH1Props {
  fontSize: string;
}
export const StyledH1 = styled.h1<StyledH1Props>`
  text-decoration: none;
  text-align: center;
  font-family: "Permanent Marker";
  color: white;
  font-size: ${(props: StyledH1Props) => props.fontSize || "2rem"};
`;
