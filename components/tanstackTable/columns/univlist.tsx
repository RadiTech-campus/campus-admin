import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const univlist: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.univName,
    id: "univName",
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
    accessorFn: (row) => row.userQty,
    id: "userQty",
    header: "가입인원",
    cell: (info) => `${info.getValue()} 명`,
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
    accessorFn: (row) => row.startPeriod,
    id: "startPeriod",
    header: "시작일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.endPeriod,
    id: "endPeriod",
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
