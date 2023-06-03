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
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fuzzyFilter } from "../../../components/tanstackTable/filter/fuzzyFilter";
import Search from "../../../components/icons/Search";
import ArrowDown from "../../../components/icons/ArrowDown";
import ArrowUp from "../../../components/icons/ArrowUp";
import { contentlist } from "../../../components/tanstackTable/columns/contentlist";
import AuthBox from "../../../components/authbox";
import {
  // univData,
  univlist,
} from "../../../components/tanstackTable/columns/univlist";
import { useGetUniv } from "../../../query/contents";

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
`;

const TopButton = styled.div<any>`
  font-size: larger;
  font-weight: 700;
  color: ${(props: any): any => (props.selected ? "#2a62ff" : "gray")};
  padding: 5px 10px 15px;
  margin-bottom: -2px;
  border-bottom: 2px
    ${(props: any): any => (props.selected ? "#2a62ff" : "transparent")} solid;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

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
  const router = useRouter();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: univData } = useGetUniv();
  const data = useMemo(() => univData?.Items || [], [univData]);

  // const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));
  // const testData = [
  //   {
  //     id: "asdasd",
  //     contentCode: "A_A01",
  //     firstCat: "ALLPASS",
  //     secondCat: "일촬",
  //     title: "초음파: 영상 확인 부터 파악하기",
  //     teacher: "심지나",
  //     playtime: 3,
  //   },
  //   {
  //     id: "asdasasdd",
  //     contentCode: "C_B01",
  //     firstCat: "일반강의",
  //     secondCat: "일촬",
  //     title: "초음파: 영상 확인 부터 파악하기",
  //     teacher: "심지나",
  //     playtime: 3,
  //   },
  //   {
  //     id: "asdasasfgsddd",
  //     contentCode: "C_C01",
  //     firstCat: "취업",
  //     secondCat: "일촬",
  //     title: "초음파: 영상 확인 부터 파악하기",
  //     teacher: "심지나",
  //     playtime: 3,
  //   },
  // ];

  // 데이터 초기화
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const { data: univData } = useGetUniv();

  // const data = useMemo(() => univData?.Items || [], [univData]);
  console.log("data", data);

  const columns = useMemo<ColumnDef<any, any>[]>(() => univlist, []);

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
        <MenuName>대학 리스트</MenuName>
        <AuthBox />
      </TopContainer>
      <TableContainer>
        <TopButtonContainer>
          <TopButton selected={router.asPath.includes("/univ/univlist/")}>
            <Link href="/univ/univlist">리스트</Link>
          </TopButton>
          <TopButton>
            <Link href="/univ">등록</Link>
          </TopButton>
        </TopButtonContainer>
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
