import styled from "@emotion/styled";
import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import ContentDetail from "../../../components/contentdetail";

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  text-align: center;
  border-top: 1px solid rgba(77, 130, 141, 0.2);
  background-color: bisque;
`;

const TableCell = styled.td<any>`
  padding: 5px 5px;
  color: #1b3d7c;
  font-weight: bold;
  font-size: 15px;
`;

const ListButton = styled.button``;

export default function TableRowContainer({ row }: any) {
  console.log("row", row);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <TableRow>
        {row?.getVisibleCells().map((cell: any) => {
          return (
            <TableCell key={cell.id} cell={cell}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
        <TableCell>
          <ListButton onClick={() => handleOpen()}>리스트</ListButton>
        </TableCell>
      </TableRow>
      {open ? <ContentDetail code={row?.original?.code} /> : null}
    </>
  );
}
