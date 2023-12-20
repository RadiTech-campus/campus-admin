import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const newlectures: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.lectureTitle,
    id: "lectureTitle",
    header: "강좌명",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.description,
    id: "description",
    header: "설명",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.previewURL,
    id: "previewURL",
    header: "미리보기 주소",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.thumbnailURL,
    id: "thumbnailURL",
    header: "썸네일 주소",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.sorting,
    id: "sorting",
    header: "정렬번호",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
