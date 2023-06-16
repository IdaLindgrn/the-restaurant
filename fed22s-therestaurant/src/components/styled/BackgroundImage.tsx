import styled from "styled-components";
import backgroundImage from "../../assets/pizza_background.jpg";

export const BackgroundImage = styled.div`
  max-width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${backgroundImage});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
