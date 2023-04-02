import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const usersColumn: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: "가입일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.userId,
    id: "userId",
    header: "아이디",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.univName,
    id: "univName",
    header: "학교이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.userName,
    id: "userName",
    header: "이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.userStatus,
    id: "userStatus",
    header: "이용여부(유료)",
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
