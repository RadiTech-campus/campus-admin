import React, { useEffect, useMemo, useState } from "react";
import { useGetContentDetails } from "../../query/contents";
import styled from "@emotion/styled";

const ContentDetailContainer = styled.table`
  background-color: aqua;
`;
const HeaderContainer = styled.tr`
  display: flex;
`;

const HeaderContent = styled.td``;

export default function ContentDetail({ code }: any) {
  const { data: contentDetailData } = useGetContentDetails(code);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, code],
  );

  console.log("data", data);
  console.log("code", code);

  return (
    <ContentDetailContainer>
      <HeaderContainer>
        <HeaderContent>제목</HeaderContent>
        <HeaderContent>주소</HeaderContent>
        <HeaderContent>서브</HeaderContent>
        <HeaderContent></HeaderContent>
      </HeaderContainer>
      {/* {data?.map((li: any, key: any) => (
        <div key={key}>
          <span>{li.contentDetailCode}</span>{" "}
          <span>{li.contentDetailTitle}</span> <span>{li.contentURL}</span>
          <span>{li.contentDetailSubTitle}</span>{" "}
          <span>
            <button>수정</button>
          </span>
        </div>
      ))}

      <div style={{ display: "flex" }}>
        <input placeholder="제목" />
        <input placeholder="주소" />
        <select>
          <option>강의</option>
          <option>기출</option>
        </select>

        <button>추가하기</button>
      </div> */}
    </ContentDetailContainer>
  );
}
