/* eslint-disable no-param-reassign */
import styled from "@emotion/styled";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fuzzyFilter } from "../../components/tanstackTable/filter/fuzzyFilter";
import { useCreateProducts, useGetProducts } from "../../query/product";
import { GetUser } from "../../api/user_api";
import { productsList } from "../../components/tanstackTable/columns/productsList";
import Search from "../../components/icons/Search";
import ArrowDown from "../../components/icons/ArrowDown";
import ArrowUp from "../../components/icons/ArrowUp";

// 스타일 컴포넌트
const ProductListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  background-color: #0f3479;
  height: 100px;
`;

const MenuName = styled.div`
  color: #fbfeff;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;

const UserName = styled.div`
  color: #fbfeff;
  font-weight: bold;
  margin-right: 60px;
  font-size: larger;
`;

const TableContainer = styled.div`
  padding: 15px 20px;
  margin: -50px 40px 10px;
  border-radius: 10px;
  background-color: #fbfeff;
`;

const TopButtonContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(77, 130, 141, 0.2);
  justify-content: space-between;
  align-items: flex-start;
`;

const TopButtonLeft = styled.div``;

const TopButtonRight = styled.div``;

const ProductButton = styled.button`
  background-color: #2a62ff;
  color: white;
  outline: none;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Fileupload = styled.input`
  width: 200px;
`;

// const TopButton = styled.div<any>`
//   font-size: larger;
//   font-weight: 700;
//   color: ${(props: any): any => (props.dd ? "#2a62ff" : "gray")};
//   padding: 5px 10px 15px;
//   margin-bottom: -2px;
//   border-bottom: 2px
//     ${(props: any): any => (props.dd ? "#2a62ff" : "transparent")} solid;
// `;

const SearchContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 600px;
  border: 1px solid #1b3d7c;
  border-radius: 20px;
  padding: 10px;
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;

  > svg {
    color: #1b3d7c;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  /* caret-color: white; */
  padding-left: 10px;
  /* color: white; */
  ::placeholder {
    color: rgb(161, 161, 161);
  }
`;

const TotalPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: #999bac;
  font-weight: bold;
`;

const PerPage = styled.select`
  height: 25px;
  margin: 0px 5px;
  font-size: 18px;
  border-radius: 5px;
  border-color: rgba(77, 130, 141, 0.7);
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.tr`
  background-color: #f4f7f9;
  color: #999bac;
  font-size: 18px;
`;

const TableHeaderCellWrapper = styled.th`
  padding: 10px 20px;
`;

const TableHeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  text-align: center;
`;

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
  color: ${(props: any) =>
    props.cell.column.id === "qty" ? "#30acc0" : "#1b3d7c"};
  font-weight: ${(props: any) =>
    props.cell.column.id === "qty" ? "bold" : "bold"};
  font-size: ${(props: any) =>
    props.cell.column.id === "qty" ? "18px" : "15px"};
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#152b7b")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};
  border: none;
  height: 26px;
  width: 30px;
  font-weight: bold;
`;

const NavText = styled.span`
  font-weight: bold;
  color: #1b3d7c;
  margin: 0px 5px;
`;
const NavInput = styled.input`
  border: 1px solid lightgray;
  height: 22px;
  width: 50px;
  text-align: center;
  font-size: medium;
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchContainer>
      <SearchInput
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Search />
    </SearchContainer>
  );
}

export default function Products() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const productData = [
    {
      productCode: "A_A01_01",
      contentCode: "A_A01",
      firstCat: "ALL PASS",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "A_A01_01",
    },
    {
      productCode: "A_A01_03",
      contentCode: "A_A01",
      firstCat: "ALL PASS",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "A_A01_03",
    },
    {
      productCode: "A_A01_06",
      contentCode: "A_A01",
      firstCat: "ALL PASS",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "A_A01_06",
    },
    {
      productCode: "A_A01_09",
      contentCode: "A_A01",
      firstCat: "ALL PASS",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "A_A01_09",
    },
    {
      productCode: "A_A01_12",
      contentCode: "A_A01",
      firstCat: "ALL PASS",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "A_A01_12",
    },
    {
      productCode: "C_B01_01",
      contentCode: "C_B01",
      firstCat: "일촬",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B01_01",
    },
    {
      productCode: "C_B01_03",
      contentCode: "C_B01",
      firstCat: "일촬",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B01_03",
    },
    {
      productCode: "C_B01_06",
      contentCode: "C_B01",
      firstCat: "일촬",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B01_06",
    },
    {
      productCode: "C_B01_09",
      contentCode: "C_B01",
      firstCat: "일촬",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B01_09",
    },
    {
      productCode: "C_B01_12",
      contentCode: "C_B01",
      firstCat: "일촬",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B01_12",
    },
    {
      productCode: "C_B02_01",
      contentCode: "C_B02",
      firstCat: "투시",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B02_01",
    },
    {
      productCode: "C_B02_03",
      contentCode: "C_B02",
      firstCat: "투시",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B02_03",
    },
    {
      productCode: "C_B02_06",
      contentCode: "C_B02",
      firstCat: "투시",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B02_06",
    },
    {
      productCode: "C_B02_09",
      contentCode: "C_B02",
      firstCat: "투시",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B02_09",
    },
    {
      productCode: "C_B02_12",
      contentCode: "C_B02",
      firstCat: "투시",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B02_12",
    },
    {
      productCode: "C_B03_01",
      contentCode: "C_B03",
      firstCat: "CT",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B03_01",
    },
    {
      productCode: "C_B03_03",
      contentCode: "C_B03",
      firstCat: "CT",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B03_03",
    },
    {
      productCode: "C_B03_06",
      contentCode: "C_B03",
      firstCat: "CT",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B03_06",
    },
    {
      productCode: "C_B03_09",
      contentCode: "C_B03",
      firstCat: "CT",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B03_09",
    },
    {
      productCode: "C_B03_12",
      contentCode: "C_B03",
      firstCat: "CT",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B03_12",
    },
    {
      productCode: "C_B04_01",
      contentCode: "C_B04",
      firstCat: "혈관촬영",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B04_01",
    },
    {
      productCode: "C_B04_03",
      contentCode: "C_B04",
      firstCat: "혈관촬영",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B04_03",
    },
    {
      productCode: "C_B04_06",
      contentCode: "C_B04",
      firstCat: "혈관촬영",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B04_06",
    },
    {
      productCode: "C_B04_09",
      contentCode: "C_B04",
      firstCat: "혈관촬영",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B04_09",
    },
    {
      productCode: "C_B04_12",
      contentCode: "C_B04",
      firstCat: "혈관촬영",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B04_12",
    },
    {
      productCode: "C_B05_01",
      contentCode: "C_B05",
      firstCat: "심혈관 중재술",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B05_01",
    },
    {
      productCode: "C_B05_03",
      contentCode: "C_B05",
      firstCat: "심혈관 중재술",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B05_03",
    },
    {
      productCode: "C_B05_06",
      contentCode: "C_B05",
      firstCat: "심혈관 중재술",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B05_06",
    },
    {
      productCode: "C_B05_09",
      contentCode: "C_B05",
      firstCat: "심혈관 중재술",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B05_09",
    },
    {
      productCode: "C_B05_12",
      contentCode: "C_B05",
      firstCat: "심혈관 중재술",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B05_12",
    },
    {
      productCode: "C_B06_01",
      contentCode: "C_B06",
      firstCat: "초음파",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B06_01",
    },
    {
      productCode: "C_B06_03",
      contentCode: "C_B06",
      firstCat: "초음파",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B06_03",
    },
    {
      productCode: "C_B06_06",
      contentCode: "C_B06",
      firstCat: "초음파",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B06_06",
    },
    {
      productCode: "C_B06_09",
      contentCode: "C_B06",
      firstCat: "초음파",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B06_09",
    },
    {
      productCode: "C_B06_12",
      contentCode: "C_B06",
      firstCat: "초음파",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B06_12",
    },
    {
      productCode: "C_B07_01",
      contentCode: "C_B07",
      firstCat: "MR",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B07_01",
    },
    {
      productCode: "C_B07_03",
      contentCode: "C_B07",
      firstCat: "MR",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B07_03",
    },
    {
      productCode: "C_B07_06",
      contentCode: "C_B07",
      firstCat: "MR",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B07_06",
    },
    {
      productCode: "C_B07_09",
      contentCode: "C_B07",
      firstCat: "MR",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B07_09",
    },
    {
      productCode: "C_B07_12",
      contentCode: "C_B07",
      firstCat: "MR",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B07_12",
    },
    {
      productCode: "C_B08_01",
      contentCode: "C_B08",
      firstCat: "핵의학",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B08_01",
    },
    {
      productCode: "C_B08_03",
      contentCode: "C_B08",
      firstCat: "핵의학",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B08_03",
    },
    {
      productCode: "C_B08_06",
      contentCode: "C_B08",
      firstCat: "핵의학",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B08_06",
    },
    {
      productCode: "C_B08_09",
      contentCode: "C_B08",
      firstCat: "핵의학",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B08_09",
    },
    {
      productCode: "C_B08_12",
      contentCode: "C_B08",
      firstCat: "핵의학",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B08_12",
    },
    {
      productCode: "C_B09_01",
      contentCode: "C_B09",
      firstCat: "영상품질관리",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B09_01",
    },
    {
      productCode: "C_B09_03",
      contentCode: "C_B09",
      firstCat: "영상품질관리",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B09_03",
    },
    {
      productCode: "C_B09_06",
      contentCode: "C_B09",
      firstCat: "영상품질관리",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B09_06",
    },
    {
      productCode: "C_B09_09",
      contentCode: "C_B09",
      firstCat: "영상품질관리",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B09_09",
    },
    {
      productCode: "C_B09_12",
      contentCode: "C_B09",
      firstCat: "영상품질관리",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B09_12",
    },
    {
      productCode: "C_B10_01",
      contentCode: "C_B10",
      firstCat: "대학병원 분석",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B10_01",
    },
    {
      productCode: "C_B10_03",
      contentCode: "C_B10",
      firstCat: "대학병원 분석",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B10_03",
    },
    {
      productCode: "C_B10_06",
      contentCode: "C_B10",
      firstCat: "대학병원 분석",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B10_06",
    },
    {
      productCode: "C_B10_09",
      contentCode: "C_B10",
      firstCat: "대학병원 분석",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B10_09",
    },
    {
      productCode: "C_B10_12",
      contentCode: "C_B10",
      firstCat: "대학병원 분석",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B10_12",
    },
    {
      productCode: "C_B11_01",
      contentCode: "C_B11",
      firstCat: "N회차 분석",
      secondCode: "_01",
      period: "1개월",
      price: 10000,
      id: "C_B11_01",
    },
    {
      productCode: "C_B11_03",
      contentCode: "C_B11",
      firstCat: "N회차 분석",
      secondCode: "_03",
      period: "3개월",
      price: 30000,
      id: "C_B11_03",
    },
    {
      productCode: "C_B11_06",
      contentCode: "C_B11",
      firstCat: "N회차 분석",
      secondCode: "_06",
      period: "6개월",
      price: 60000,
      id: "C_B11_06",
    },
    {
      productCode: "C_B11_09",
      contentCode: "C_B11",
      firstCat: "N회차 분석",
      secondCode: "_09",
      period: "9개월",
      price: 90000,
      id: "C_B11_09",
    },
    {
      productCode: "C_B11_12",
      contentCode: "C_B11",
      firstCat: "N회차 분석",
      secondCode: "_12",
      period: "12개월",
      price: 120000,
      id: "C_B11_12",
    },
  ];

  // 데이터 초기화
  const data = useMemo(() => productData, []);
  const columns = useMemo<ColumnDef<any, any>[]>(() => productsList, []);

  // 테이블 훅
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: { pagination: { pageSize: 30 } },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <ProductListContainer>
      <TopContainer>
        <MenuName>상품목록</MenuName>
        {/* {!isLoading && (
          <UserName>
            {user.companyName}-{user.userName}
          </UserName>
        )}{" "} */}
      </TopContainer>
      <TableContainer>
        {/* <TopButtonContainer>
          <TopButtonLeft>
            <Link href="/products/">
              <ProductButton type="button">상품목록</ProductButton>
            </Link>
            <Link href="/products/addproduct">
              <ProductButton type="button">상품등록</ProductButton>
            </Link>
            <ProductButton type="button">상품수정</ProductButton>
            <ProductButton type="button">상품삭제</ProductButton>
          </TopButtonLeft>
          <TopButtonRight>
            <form>
              <ProductButton
                type="submit"
                onClick={(e) => {
                  handleOnSubmit(e);
                }}
                disabled={file === null && true}
              >
                대량추가
              </ProductButton>
              <ProductButton>
                <a download href="/example.csv">
                  양식 받기
                </a>
              </ProductButton>

              <Fileupload
                type="file"
                id="csvFileInput"
                accept=".csv"
                ref={ref}
                onChange={handleOnChange}
              />
            </form>
          </TopButtonRight>

          <TopButton dd>
              전체 {table.getPrePaginationRowModel().rows.length}
            </TopButton>
            <TopButton dd>CD 2</TopButton>
            <TopButton>GOODS {productData && productData?.length}</TopButton>
            <TopButton>PHOTOBOOK 0</TopButton>
        </TopButtonContainer> */}
        <SearchContainerWrapper>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value: any) => setGlobalFilter(String(value))}
            placeholder="Search all columns..."
          />
          <TotalPerPageContainer>
            <span>
              {" "}
              Total : {table.getPrePaginationRowModel().rows.length} 개 / 페이지
              당{" "}
            </span>
            <PerPage
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[30, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </PerPage>
            개
          </TotalPerPageContainer>
        </SearchContainerWrapper>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHeaderCellWrapper
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <TableHeaderCell
                          {...{
                            // className: header.column.getCanSort()
                            //   ? "cursor-pointer select-none"
                            //   : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <div style={{ marginRight: "10px" }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                          {{
                            asc: <ArrowDown />,
                            desc: <ArrowUp />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowDown />
                          )}
                        </TableHeaderCell>
                      )}
                    </TableHeaderCellWrapper>
                  );
                })}
              </TableHeader>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any) => {
                  return (
                    <TableCell key={cell.id} cell={cell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
        <NavButtonContainer>
          <NavButton
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </NavButton>
          <NavButton
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </NavButton>
          <NavText>
            {table.getState().pagination.pageIndex + 1} page of{" "}
            {table.getPageCount()}
          </NavText>
          <span>
            <NavInput
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <NavButton
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </NavButton>
          <NavButton
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </NavButton>
        </NavButtonContainer>
      </TableContainer>
    </ProductListContainer>
  );
}
