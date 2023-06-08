import styled from "@emotion/styled";
import React from "react";

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
  color: ${(props: any) =>
    props.cell?.column?.id === "qty" ? "#30acc0" : "#1b3d7c"};
  font-weight: ${(props: any) =>
    props.cell?.column?.id === "qty" ? "bold" : "bold"};
  font-size: ${(props: any) =>
    props.cell?.column?.id === "qty" ? "18px" : "15px"};
`;

export default function TableCellContainer({ cell, flexRender }: any) {
  return (
    <TableCell>
      {cell?.column?.id === "payStatus" ? (
        <select name="" id="">
          <option>입금대기</option>
          <option>결제완료</option>
          <option>결제취소</option>
        </select>
      ) : (
        flexRender(cell?.column?.columnDef?.cell, cell?.getContext())
      )}
    </TableCell>
  );
}
