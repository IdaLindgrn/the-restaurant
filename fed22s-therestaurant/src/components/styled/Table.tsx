import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  font-family: "Poppins";
`;

export const TableRow = styled.tr`
  height: 40px;
`;

export const TableHeader = styled.th`
  width: 100px;
  font-size: 1.2;
`;

export const TableData = styled.td`
  font-size: 0.8rem;
  text-align: center;
  width: 100px;

  .input__text {
    height: 30px;
    width: 120px;
  }

  .input__number {
    height: 30px;
    width: 50px;
  }
`;
