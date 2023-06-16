import { Wrapper, GeneralWrapper } from "../components/styled/Wrappers";
import { StyledP } from "../components/styled/StyledP";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/styled/Buttons";

const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <GeneralWrapper flexdirection="row">
        <Wrapper>
          <StyledP>
            Vi behöver spara och behandla personuppgifter om dig, så som rätten
            att äga dina barn. Syftet med en sådan behandling är för att kunna
            äta barn. Vi har fått dina uppgifter från Mark Zuckerberg på
            Facebook. Vi tillämpar vid var tid gällande integritetslagstiftning
            vid all behandling av personuppgifter. Den rättsliga grunden för att
            behandla dina personuppgifter är baserad på hunger. Dina uppgifter
            kommer att sparas för evigt. De personuppgifter vi behandlar om dig
            delas med våra hungriga vänner. Vi kan även komma att dela dina
            personuppgifter med en tredje part, förutsatt att vi är skyldiga att
            göra så enligt lag. Däremot kommer vi aldrig att överföra dina
            uppgifter till ett land utanför EU. Personuppgiftsansvarig är Elon
            Musk. Du har rätt att kontakta oss om du vill ha ut information om
            de uppgifter vi har om dig, för att begära rättelse, överföring
            eller för att begära att vi begränsar behandlingen, för att göra
            invändningar eller begära radering av dina uppgifter. Detta gör du
            enklast genom att kontakta oss på fax eller via röksignal. Du når
            vårt dataskyddsombud på en bakgata i Gamla Stan. Om du har klagomål
            på vår behandling av dina personuppgifter har du rätt att inge
            klagomål till tillsynsmyndigheten Datainspektionen.
          </StyledP>
          <Button
            bgcolor="black"
            color="white"
            fontSize="1rem"
            onClick={() => navigate(-1)}
          >
            Tillbaka
          </Button>
        </Wrapper>
      </GeneralWrapper>
    </>
  );
};

export default ContactPage;
