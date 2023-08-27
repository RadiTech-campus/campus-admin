import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { updatePayStatus } from "../../api/contents_api";

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
`;

export default function PaymentRow({ cell, flexRender }: any) {
  const [st, setSt] = useState("");
  useEffect(() => {
    setSt(cell?.row?.original?.payStatus);
  }, []);

  return (
    <TableCell key={cell?.id}>
      {cell?.column?.id === "payStatus" ? (
        <select
          name=""
          id=""
          value={st}
          onChange={(e) => {
            setSt(e.target.value);
            try {
              updatePayStatus({
                id: cell?.row?.original?.id,
                payStatus: e.target.value,
              });
              alert(`결제상태가 ${e.target.value}로 바뀌었습니다`);
            } catch (error) {
              alert("에러발생 개발자에게 문의해 주세요");
            }
          }}
        >
          <option value="입금대기">입금대기</option>
          <option value="결제완료">결제완료</option>
          <option value="결제취소">결제취소</option>
        </select>
      ) : (
        flexRender(cell?.column?.columnDef?.cell, cell?.getContext())
      )}
    </TableCell>
  );
}
