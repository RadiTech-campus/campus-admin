import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const newcontents: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.contentTitle,
    id: "contentTitle",
    header: "상품명",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.isFree,
    id: "isFree",
    header: "무료공개",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
