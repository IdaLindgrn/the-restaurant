import styled from "styled-components";

interface IButtonProps {
  bgcolor: string;
  color: string;
  fontSize: string;
}

export const Button = styled.button<IButtonProps>`
  background-color: ${(props: IButtonProps) => props.bgcolor || "grey"};
  color: ${(props: IButtonProps) => props.color || "white"};
  padding: 0.5rem;
  border-radius: 15px;
  border: none;
  font-family: "Poppins";
  transition: 300ms;
  transform: scale(0.9);
  font-size: ${(props: IButtonProps) => props.fontSize || "1rem"};
  &:hover {
    cursor: pointer;
    transform: scale(1);
  }
`;

export const GDPRButton = styled(Button)`
  padding: 0.5rem;
  border-radius: 15px;
  margin: 15px;
`;
