import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const univlist: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "대학교 이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.discount,
    id: "discount",
    header: "할인율",
    cell: (info) => `${info.getValue()} %`,
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.domain,
    id: "domain",
    header: "도메인",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.to,
    id: "to",
    header: "시작일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.from,
    id: "from",
    header: "종료일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];

export const univData = [
  {
    id: "asdasd",
    univName: "중앙대",
    discount: 20,
    userQty: 120,
    domain: "cau.ac",
    startPeriod: "2022-03-21T18:58:30",
    endPeriod: "2023-03-21T18:58:30",
  },
  {
    id: "asdasd2",
    univName: "연세대",
    discount: 10,
    userQty: 520,
    domain: "yau.ac",
    startPeriod: "2022-03-21T18:58:30",
    endPeriod: "2023-03-21T18:58:30",
  },
  {
    id: "asdasd3",
    univName: "서울대",
    discount: 90,
    userQty: 20,
    domain: "sau.ac",
    startPeriod: "2022-03-21T18:58:30",
    endPeriod: "2023-03-21T18:58:30",
  },
];
