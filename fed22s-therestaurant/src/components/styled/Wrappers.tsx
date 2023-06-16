import styled from "styled-components";

interface IWrapperProps {
  flexdirection: string;
}

export const GeneralWrapper = styled.div<IWrapperProps>`
  position: absolute;
  display: flex;
  flex-direction: ${(props: IWrapperProps) => props.flexdirection || "row"};
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  background-color: #000000b2;
  opacity: 80%;
  margin: 20px;
  width: 700px;
  border-radius: 15px;
  padding: 10px;

  select {
    border: none;
    outline: none;
    opacity: 0.9;
  }

  .react-calendar {
    background-color: #ffffff;
    border: none;
  }

  #sittings {
    display: flex;
    flex-direction: row;
    div {
      display: flex;
      flex-direction: row;
      column-gap: 10px;
      margin: 0 20px 0 20px;
    }
  }
`;

export const Calendar = styled.div`
  background: #4a3535;
`;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 50vh;
  overflow-y: scroll;
  gap: 20px;
  background-color: #000000b2;
  opacity: 80%;
  margin: 20px;
  width: 700px;
  border-radius: 15px;
  padding: 10px;
`;
