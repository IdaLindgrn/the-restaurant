import { Link, useNavigate } from "react-router-dom";
import { Ul } from "./styled/Ul";
import { Li } from "./styled/Li";
import { Button } from "./styled/Buttons";
import { StyledHeader } from "./styled/Header";
import { StyledH1 } from "./styled/StyledH1";

export const Header = () => {
  const navigate = useNavigate();
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
          <Button
            bgcolor="red"
            color="white"
            fontSize="1rem"
            onClick={() => navigate("/book")}
          >
            Boka Bord
          </Button>
        </Li>
      </Ul>
    </StyledHeader>
  );
};
