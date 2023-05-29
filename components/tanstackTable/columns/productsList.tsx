import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const productsList: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.firstCat,
    id: "firstCat",
    header: "대분류",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.firstCat,
    id: "firstCat",
    header: "중분류",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.productTitle,
    id: "productTitle",
    header: "상품명",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "가격",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
