import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetUser } from "../../api/user_api";
// import { useCreateArtist, useGetArtists } from "../../query/artist";
// import { useCreateCategory, useGetCategory } from "../../query/category";
import { useCreateEnt, useGetEnt } from "../../query/ent";
import { useCreateProduct } from "../../query/product";
import AuthBox from "../../components/authbox";

const AddProductContainer = styled.div``;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  background-color: #0f3479;
  height: 100px;
`;
const TableContainer = styled.div`
  padding: 15px 20px;
  margin: -50px 40px 10px;
  border-radius: 10px;
  background-color: #fbfeff;
`;

const TopButtonContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(77, 130, 141, 0.2);
`;

const TopButton = styled.div<any>`
  font-size: larger;
  font-weight: 700;
  color: ${(props: any): any => (props.selected ? "#2a62ff" : "gray")};
  padding: 5px 10px 15px;
  margin-bottom: -2px;
  border-bottom: 2px
    ${(props: any): any => (props.selected ? "#2a62ff" : "transparent")} solid;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const MenuName = styled.div`
  color: #fbfeff;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;
const AddProductInputContainer = styled.div`
  display: flex;
  font-size: large;
  padding: 20px;
  align-items: center;
`;
const AddProductInputText = styled.div`
  width: 200px;
`;
const AddProductInput = styled.input``;
const AddProductSelect = styled.select``;
const AddProductOption = styled.option``;

const AddButton = styled.button`
  background-color: #2a62ff;
  color: white;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const ProductButton = styled.button`
  background-color: #2a62ff;
  color: white;
  outline: none;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function AddProduct() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    barcode: "",
    price: "",
    desc: "",
    purchase: "",
    deadline: "",
    release: "",
    sku: "",
    stock: "",
    thumb: "",
    weight: "",
    artist: "",
    category: "",
    ent: "",
    addArtist: "",
    addCategory: "",
    addEnt: "",
  });

  const {
    title,
    barcode,
    price,
    desc,
    purchase,
    deadline,
    release,
    sku,
    stock,
    thumb,
    weight,
    artist,
    category,
    ent,
    addArtist,
    addCategory,
    addEnt,
  } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    setInputs(nextInputs);
  };
  const onReset = () => {
    setInputs({
      title: "",
      barcode: "",
      price: "",
      desc: "",
      purchase: "",
      deadline: "",
      release: "",
      sku: "",
      stock: "",
      thumb: "",
      weight: "",
      artist: "",
      category: "",
      ent: "",
      addArtist: "",
      addCategory: "",
      addEnt: "",
    });
  };
  // const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));
  // const {
  //   data: artistData,
  //   isLoading: isArtistLoading,
  //   isSuccess: isArtistSuccess,
  // } = useGetArtists(user?.companyId);
  // const {
  //   data: categoryData,
  //   isLoading: isCategoryLoading,
  //   isSuccess: isCategorySuccess,
  // } = useGetCategory(user?.companyId);
  // const {
  //   data: entData,
  //   isLoading: isEntLoading,
  //   isSuccess: isEntSuccess,
  // } = useGetEnt(user?.companyId);

  // const productMutate = useCreateProduct(user?.companyId, inputs);
  // const artistMutate = useCreateArtist(user?.companyId, {
  //   artistName: addArtist,
  //   companyId: user?.companyId,
  // });
  // const categoryMutate = useCreateCategory(user?.companyId, {
  //   categoryName: addCategory,
  //   companyId: user?.companyId,
  // });
  // const entMutate = useCreateEnt(user?.companyId, {
  //   entName: addEnt,
  //   companyId: user?.companyId,
  // });

  // const handleAddOnSubmit = (e: any) => {
  //   e.preventDefault();
  //   const con = window.confirm("추가 하시겠습니까?");
  //   if (con) {
  //     if (e.target.name === "addArtist") {
  //       if (addArtist.length < 1) {
  //         alert("추가할 가수의 이름을 작성해 주세요.");
  //       } else {
  //         artistMutate.mutateAsync();
  //         onReset();
  //       }
  //     } else if (e.target.name === "addCategory") {
  //       if (addCategory.length < 1) {
  //         alert("추가할 카테고리 이름을 작성해 주세요.");
  //       } else {
  //         categoryMutate.mutateAsync();
  //         onReset();
  //       }
  //     } else if (e.target.name === "addEnt") {
  //       if (addEnt.length < 1) {
  //         alert("추가할 소속사 이름을 작성해 주세요.");
  //       } else {
  //         entMutate.mutateAsync();
  //         onReset();
  //       }
  //     }
  //   }
  // };
  // const handleOnSubmit = (e: any) => {
  //   e.preventDefault();
  //   const con = window.confirm("추가 하시겠습니까?");
  //   if (con) {
  //     if (
  //       title.length < 1 ||
  //       barcode.length < 1 ||
  //       desc.length < 1 ||
  //       deadline.length < 1 ||
  //       release.length < 1 ||
  //       sku.length < 1 ||
  //       thumb.length < 1 ||
  //       stock.length < 1 ||
  //       price.length < 1 ||
  //       purchase.length < 1 ||
  //       weight.length < 1 ||
  //       artist.length < 1 ||
  //       category.length < 1 ||
  //       ent.length < 1
  //     ) {
  //       alert("빈칸이 없어야함");
  //     } else {
  //       productMutate.mutateAsync();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (productMutate.data) {
  //     if (productMutate.data.errorMessage) {
  //       alert(productMutate.data.errorMessage);
  //     } else {
  //       // alert(`${productMutate.data} 개의 상품이 저장되었습니다`);
  //     }
  //   }
  //   if (productMutate.status === "success") {
  //     if (productMutate.data.title) {
  //       alert(`${productMutate.data.title}가 등록되었습니다`);
  //       onReset();
  //     }
  //   }
  // }, [productMutate.data]);
  // console.log("input", inputs);
  // console.log("productMutate.isError", productMutate.isError);
  // console.log("productMutate.isLoading", productMutate.isLoading);
  // console.log("productMutate.data", productMutate.data);
  // console.log("productMutate.status", productMutate.status);

  return (
    <AddProductContainer>
      <TopContainer>
        <MenuName>대학 등록</MenuName>
        <AuthBox />
      </TopContainer>
      <TableContainer>
        <TopButtonContainer>
          <TopButton selected={router.asPath.includes("/univ/")}>
            <Link href="/univ">등록</Link>
          </TopButton>
          <TopButton>
            <Link href="/univ/univlist">리스트</Link>
          </TopButton>
        </TopButtonContainer>
        <form>
          <AddProductInputContainer>
            <AddProductInputText>대학교 이름</AddProductInputText>
            <AddProductInput
              name="title"
              placeholder="엘범 제목"
              onChange={onChange}
              value={title}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>도메인</AddProductInputText>
            <AddProductInput
              name="barcode"
              placeholder="바코드"
              onChange={onChange}
              value={barcode}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>할인율</AddProductInputText>
            <AddProductInput
              type="number"
              name="barcode"
              placeholder="바코드"
              onChange={onChange}
              value={barcode}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>할인기간</AddProductInputText>
            <AddProductInput
              type="date"
              name="barcode"
              placeholder="바코드"
              onChange={onChange}
              value={barcode}
            />{" "}
            ~{" "}
            <AddProductInput
              type="date"
              name="barcode"
              placeholder="바코드"
              onChange={onChange}
              value={barcode}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>결제 구분</AddProductInputText>
            <AddProductSelect
              name="category"
              onChange={onChange}
              value={category}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { firstcat: "유료", id: "asdasasdd" },
                { firstcat: "무료", id: "asdasd" },
              ].map((cat: any) => {
                return (
                  <AddProductOption key={cat.id} value={cat.id}>
                    {cat.firstcat}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>상품 코드</AddProductInputText>
            <AddProductSelect
              name="category"
              onChange={onChange}
              value={category}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { firstcat: "유료", id: "asdasasdd" },
                { firstcat: "무료", id: "asdasd" },
              ].map((cat: any) => {
                return (
                  <AddProductOption key={cat.id} value={cat.id}>
                    {cat.firstcat}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>배너 1</AddProductInputText>
            <AddProductInput
              name="desc"
              placeholder="배너 주소"
              onChange={onChange}
              value={desc}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>배너 2</AddProductInputText>
            <AddProductInput
              name="desc"
              placeholder="배너 주소"
              onChange={onChange}
              value={desc}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>배너 3</AddProductInputText>
            <AddProductInput
              name="desc"
              placeholder="배너 주소"
              onChange={onChange}
              value={desc}
            />
          </AddProductInputContainer>
        </form>
        <ProductButton
          type="submit"
          onClick={(e) => {
            // handleOnSubmit(e);
          }}
        >
          등록하기
        </ProductButton>
      </TableContainer>
    </AddProductContainer>
  );
}
