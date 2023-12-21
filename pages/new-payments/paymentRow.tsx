import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { useUpdatePayment } from "../../query/new_quries";

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
`;

export default function PaymentRow({ cell }: any) {
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    setStatus(cell?.row?.original?.payStatus);
    setId(cell?.row?.original?.id);
  }, [cell]);

  const { mutate: paymentMutate } = useUpdatePayment();

  return (
    <TableCell key={cell?.id}>
      {cell?.column?.id === "payStatus" ? (
        <select
          value={status}
          onChange={(e) => {
            e.preventDefault();
            setStatus(e.target.value);
            try {
              paymentMutate({ id, payStatus: e.target.value });
              alert(`결제상태가 ${e.target.value}로 바뀌었습니다`);
            } catch (error) {
              alert("에러발생 개발자에게 문의해 주세요");
            }
          }}
        >
          <option value="결제대기">결제대기</option>
          <option value="결제완료">결제완료</option>
          <option value="결제취소">결제취소</option>
          <option value="기간만료">기간만료</option>
        </select>
      ) : (
        flexRender(cell?.column?.columnDef?.cell, cell?.getContext())
      )}
    </TableCell>
  );
}
