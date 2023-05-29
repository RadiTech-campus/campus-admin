import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const usersColumn: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.Username,
    id: "Username",
    header: "아이디",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.Attributes[0].Value,
    id: "Attributes[0].Value",
    header: "이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.Attributes[1].Value,
    id: "Attributes[1].Value",
    header: "휴대폰 번호",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.Attributes[2].Value,
    id: "Attributes[2].Value",
    header: "이메일",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];

export const usersData = [
  {
    createdAt: "2023-03-21T18:58:30",
    userId: "rudghksldl",
    univName: "중앙대",
    userName: "김경환",
    userStatus: "이용",
    id: "vnm",
  },
  {
    createdAt: "2023-03-21T18:58:30",
    userId: "rudghksldl2",
    univName: "중앙대",
    userName: "김경환",
    userStatus: "종료",
    id: "vnmfdi",
  },
];
