import { useEffect } from "react";
import { getAllBookings } from "../services/bookingServices";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/styled/Buttons";
import { StyledH1 } from "../components/styled/StyledH1";
import { GeneralWrapper } from "../components/styled/Wrappers";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      <GeneralWrapper flexdirection="column">
        <StyledH1 fontSize="8rem">WAIO</StyledH1>
        <Button
          bgcolor="red"
          color="white"
          fontSize="1.3rem"
          onClick={() => navigate("/book")}
        >
          Boka Bord
        </Button>
      </GeneralWrapper>
    </>
  );
};

export default LandingPage;
