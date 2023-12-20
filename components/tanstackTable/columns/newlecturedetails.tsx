import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const newlecturedetails: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.lectureDetailTitle,
    id: "lectureDetailTitle",
    header: "강의명",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.videoURL,
    id: "videoURL",
    header: "영상주소",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.sorting,
    id: "sorting",
    header: "정렬 번호",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
