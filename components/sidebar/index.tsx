import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  /* flex: 0.1; */
  width: 200px;
  background-color: #fbfeff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const TopContainer = styled.div`
  width: 100%;
`;
const BottomContainer = styled.div`
  width: 100%;
`;

const CompanyName = styled.div`
  width: 100%;
  color: #2a62ff;
  font-size: 18px;
  text-align: center;
  margin: 30px auto;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuButton = styled.div<any>`
  width: 100%;
  border-left: ${(props) =>
    props.selected ? "3px #2A62FF solid" : "3px transparent"};
  padding: 5px 0px 5px 10px;
  color: ${(props) => (props.selected ? "#2A62FF" : "#a4a4a4")};
  font-size: large;
  background-color: ${(props) => (props.selected ? "#eff6fd" : "")};
  margin: 10px 0px 10px 20px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Sidebar(): any {
  const router = useRouter();

  return (
    <SidebarContainer>
      <TopContainer>
        <CompanyName>
          <Link href="/">Radi-Tech Admin</Link>
        </CompanyName>
        <Link href="/users" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/users/")}>
            회원정보
          </MenuButton>
        </Link>

        <Link href="/new-payments" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/new-payments/")}>
            (신)결제정보
          </MenuButton>
        </Link>

        <Link href="/payments" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/payments/")}>
            (구)결제정보
          </MenuButton>
        </Link>

        {/* <Link href="/contents/contentlist" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/contents/")}>
            컨텐츠
          </MenuButton>
        </Link> */}
        {/* <Link href="/products" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/products/")}>
            상품목록
          </MenuButton>
        </Link> */}

        {/* <Link href="/univ/univlist" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/univ")}>
            대학정보
          </MenuButton>
        </Link> */}

        {/* {!isLoading && (
          <MenuButton>
            <a
              href={`${user.storeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              STORE
            </a>
          </MenuButton>
        )} */}
        <MenuButton>
          <a
            href="https://raditech-campus.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CAMPUS
          </a>
        </MenuButton>
      </TopContainer>

      <BottomContainer>
        {/* <MenuButton style={{ fontSize: "14px" }}>로그아웃</MenuButton> */}
      </BottomContainer>
    </SidebarContainer>
  );
}
