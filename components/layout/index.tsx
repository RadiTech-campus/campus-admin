import styled from "@emotion/styled";
import React from "react";
import Sidebar from "../sidebar";

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftContainer = styled.div`
  /* flex: 0.15; */
`;

const RightContainer = styled.div`
  /* flex: 0.85; */
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #e7f1fb;
`;

export default function Layout({ children }: any) {
  return (
    <LayoutContainer>
      <LeftContainer>
        <Sidebar />
      </LeftContainer>
      <RightContainer>{children}</RightContainer>
    </LayoutContainer>
  );
}
