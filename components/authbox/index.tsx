import styled from "@emotion/styled";
import React from "react";

const AuthBoxContainer = styled.div`
  color: #fbfeff;
  font-weight: bold;
  margin-right: 60px;
  font-size: larger;
  display: flex;
`;
const AuthBoxContent = styled.div`
  margin-right: 10px;
`;

export default function AuthBox() {
  return (
    <AuthBoxContainer>
      <AuthBoxContent>홈</AuthBoxContent>
      <AuthBoxContent>뒤로가기</AuthBoxContent>
      <AuthBoxContent>로그아웃</AuthBoxContent>
    </AuthBoxContainer>
  );
}
