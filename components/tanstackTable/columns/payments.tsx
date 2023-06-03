import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const paymentsColumn: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: "id",
    header: "주문번호",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.applyDate,
    id: "applyDate",
    header: "주문일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.payedDate,
    id: "payedDate",
    header: "종료일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.userId,
    id: "userId",
    header: "유저아이디",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.productCode,
    id: "productCode",
    header: "상품코드",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.productTitle,
    id: "productTitle",
    header: "상품이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.payStatus,
    id: "payStatus",
    header: "상태",
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
  {
    accessorFn: (row) => row.watched,
    id: "watched",
    header: "조회수",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];

export const paymentsData = [
  {
    id: "fjkrhg",
    createdAt: "2023-03-21T18:58:30",
    orderId: "4346346",
    userId: "rudghksldl",
    productCode: "C_B01_01",
    firstCat: "일촬",
    period: "1개월",
    price: "30000",
    orderStatus: "미입금",
  },
  {
    id: "fjkrhgddg",
    createdAt: "2022-03-21T18:58:30",
    orderId: "533",
    userId: "rudghksldl2",
    productCode: "C_B01_03",
    firstCat: "일촬",
    period: "3개월",
    price: "60000",
    orderStatus: "입금확인",
  },
];
