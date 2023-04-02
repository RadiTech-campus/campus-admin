import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const contentlist: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.contentCode,
    id: "contentCode",
    header: "컨텐츠코드",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.firstCat,
    id: "firstCat",
    header: "대분류",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.secondCat,
    id: "secondCat",
    header: "중분류",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    header: "강연명 상세",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.teacher,
    id: "teacher",
    header: "강사",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.playtime,
    id: "playtime",
    header: "분량",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];

export const contentData = [
  {
    id: "asdasd",
    contentCode: "A_A01",
    firstCat: "ALLPASS",
    secondCat: "일촬",
    title: "초음파: 영상 확인 부터 파악하기",
    teacher: "심지나",
    playtime: 3,
  },
  {
    id: "asdasasdd",
    contentCode: "C_B01",
    firstCat: "일반강의",
    secondCat: "일촬",
    title: "초음파: 영상 확인 부터 파악하기",
    teacher: "심지나",
    playtime: 3,
  },
  {
    id: "asdasasfgsddd",
    contentCode: "C_C01",
    firstCat: "취업",
    secondCat: "일촬",
    title: "초음파: 영상 확인 부터 파악하기",
    teacher: "심지나",
    playtime: 3,
  },
];
