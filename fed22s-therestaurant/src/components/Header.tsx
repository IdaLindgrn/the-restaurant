import { Link } from "react-router-dom";
import { Nav } from "./styled/Nav";
import { Ul } from "./styled/Ul";
import { Li } from "./styled/Li";
import { Button } from "./styled/Buttons";
import { StyledHeader } from "./styled/Header";
import { StyledH1 } from "./styled/StyledH1";

export const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <StyledH1 fontSize="1.5rem">WAIO</StyledH1>
      </Link>
      <Ul>
        <Li>
          <Link to="/">Hem</Link>
        </Li>
        <Li>
          <Link to="/contact">Kontakt</Link>
        </Li>
        <Li>
          <Link to="/book">
            <Button bgcolor="red" color="white" fontSize="1rem">
              Boka Bord
            </Button>
          </Link>
        </Li>
      </Ul>
    </StyledHeader>
  );
};
