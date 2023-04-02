import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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

export default function AddContent() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    firstCat: "",
    secondCat: "",
    paymentStatus: "",
    title: "",
    lectureChapter: "",
    lectureTime: "",
    teacher: "",
    lectureNote: "",
    timeTable: "",
    description: "",
    noteLink: "",
  });

  const {
    firstCat,
    secondCat,
    paymentStatus,
    title,
    lectureChapter,
    lectureTime,
    teacher,
    lectureNote,
    timeTable,
    description,
    noteLink,
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
      firstCat: "",
      secondCat: "",
      paymentStatus: "",
      title: "",
      lectureChapter: "",
      lectureTime: "",
      teacher: "",
      lectureNote: "",
      timeTable: "",
      description: "",
      noteLink: "",
    });
  };
  // const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const con = window.confirm("컨텐츠를 등록 하시겠습니까?");
    if (con) {
      if (
        firstCat.length < 1 ||
        secondCat.length < 1 ||
        paymentStatus.length < 1 ||
        title.length < 1 ||
        lectureChapter.length < 1 ||
        lectureTime.length < 1 ||
        teacher.length < 1 ||
        lectureNote.length < 1 ||
        timeTable.length < 1 ||
        description.length < 1 ||
        noteLink.length < 1
      ) {
        alert("빈칸이 없어야함");
      } else {
        alert("등록 완료");
      }
    }
  };

  return (
    <AddProductContainer>
      <TopContainer>
        <MenuName>컨텐츠 등록</MenuName>
        <AuthBox />
      </TopContainer>
      <TableContainer>
        <TopButtonContainer>
          <TopButton selected={router.asPath.includes("/contents/")}>
            <Link href="/contents">등록</Link>
          </TopButton>
          <TopButton>
            <Link href="/contents/contentlist">리스트</Link>
          </TopButton>
        </TopButtonContainer>
        <form>
          <AddProductInputContainer>
            <AddProductInputText>대분류</AddProductInputText>
            <AddProductSelect
              name="firstCat"
              onChange={onChange}
              value={firstCat}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { firstcat: "일반강의", id: "asdasd" },
                { firstcat: "특별강의", id: "asdasasdd" },
                { firstcat: "일반강의", id: "asdasdf" },
              ].map((firstcat: any) => {
                return (
                  <AddProductOption key={firstcat.id} value={firstcat.firstcat}>
                    {firstcat.firstcat}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>중분류</AddProductInputText>
            <AddProductSelect
              name="secondCat"
              onChange={onChange}
              value={secondCat}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { secondCat: "일촬", id: "asdasdbnd" },
                { secondCat: "특촬", id: "asdasasdd" },
                { secondCat: "일촬", id: "asdasdgjk" },
              ].map((secondcat: any) => {
                return (
                  <AddProductOption
                    key={secondcat.id}
                    value={secondcat.secondCat}
                  >
                    {secondcat.secondCat}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>결제 구분</AddProductInputText>
            <AddProductSelect
              name="paymentStatus"
              onChange={onChange}
              value={paymentStatus}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { paymentStatus: "유료", id: "asdasasdd" },
                { paymentStatus: "무료", id: "asdasd" },
              ].map((status: any) => {
                return (
                  <AddProductOption
                    key={status.id}
                    value={status.paymentStatus}
                  >
                    {status.paymentStatus}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강연명 상세</AddProductInputText>
            <AddProductInput
              type="text"
              name="title"
              placeholder="강연명 상세"
              onChange={onChange}
              value={title}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강의 분량</AddProductInputText>
            <AddProductInput
              type="number"
              name="lectureChapter"
              placeholder="강의 분량"
              onChange={onChange}
              value={lectureChapter}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강의 시간</AddProductInputText>
            <AddProductInput
              type="number"
              name="lectureTime"
              placeholder="강의 시간"
              onChange={onChange}
              value={lectureTime}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강사</AddProductInputText>
            <AddProductSelect
              name="teacher"
              onChange={onChange}
              value={teacher}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {[
                { teacherName: "심지나", id: "asdasasdd" },
                { teacherName: "심지나", id: "asdasd" },
              ].map((teacherLi: any) => {
                return (
                  <AddProductOption
                    key={teacherLi.id}
                    value={teacherLi.teacherName}
                  >
                    {teacherLi.teacherName}
                  </AddProductOption>
                );
              })}
            </AddProductSelect>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강연 자료</AddProductInputText>
            <AddProductInput
              type="text"
              name="lectureNote"
              placeholder="강연자료"
              onChange={onChange}
              value={lectureNote}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>강연 링크</AddProductInputText>
            {/* TODO */}
            <AddProductInput type="text" />
          </AddProductInputContainer>

          <AddProductInputContainer>
            <AddButton
              name="addCategory"
              type="button"
              // onClick={(e) => handleAddOnSubmit(e)}
            >
              추가
            </AddButton>
            <AddButton
              name="addCategory"
              type="button"
              // onClick={(e) => handleAddOnSubmit(e)}
            >
              삭제
            </AddButton>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>Time Table</AddProductInputText>
            <AddProductInput
              type="text"
              name="timeTable"
              placeholder="Time Table"
              onChange={onChange}
              value={timeTable}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>상세</AddProductInputText>
            <AddProductInput
              type="text"
              name="description"
              placeholder="상세"
              onChange={onChange}
              value={description}
            />
          </AddProductInputContainer>
        </form>
        <ProductButton
          type="submit"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          등록하기
        </ProductButton>
      </TableContainer>
    </AddProductContainer>
  );
}
