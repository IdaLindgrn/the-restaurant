import { Wrapper, GeneralWrapper } from "../components/styled/Wrappers";
import { StyledP } from "../components/styled/StyledP";
import { useNavigate } from "react-router-dom";
import { LandingPageButton } from "../components/styled/Buttons";

const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <GeneralWrapper>
        <Wrapper>
          <StyledP>
            Vi behöver spara och behandla personuppgifter om dig, så som ___.
            Syftet med en sådan behandling är för att kunna ___. Vi har fått
            dina uppgifter från ___. Vi tillämpar vid var tid gällande
            integritetslagstiftning vid all behandling av personuppgifter. Den
            rättsliga grunden för att behandla dina personuppgifter är ___. Dina
            uppgifter kommer att sparas ___. De personuppgifter vi behandlar om
            dig delas med ___. Vi kan även komma att dela dina personuppgifter
            med en tredje part, förutsatt att vi är skyldiga att göra så enligt
            lag. Däremot kommer vi aldrig att överföra dina uppgifter till ett
            land utanför EU ___. Personuppgiftsansvarig är ___. Du har rätt att
            kontakta oss om du vill ha ut information om de uppgifter vi har om
            dig, för att begära rättelse, överföring eller för att begära att vi
            begränsar behandlingen, för att göra invändningar eller begära
            radering av dina uppgifter. Detta gör du enklast genom att kontakta
            oss på ___. Du når vårt dataskyddsombud på ___. Om du har klagomål
            på vår behandling av dina personuppgifter har du rätt att inge
            klagomål till tillsynsmyndigheten Datainspektionen.
          </StyledP>
          <LandingPageButton onClick={() => navigate(-1)}>
            Tillbaka
          </LandingPageButton>
        </Wrapper>
      </GeneralWrapper>
    </>
  );
};

export default ContactPage;
