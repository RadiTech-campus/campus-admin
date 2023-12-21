import axios from "axios";

export async function getAllPayments() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/payment`,
    { withCredentials: true },
  );
  return data;
}

export async function updatePayment(payload) {
  const { data } = await axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/payment`,
    data: payload,
    withCredentials: true,
  });
  return data;
}

export async function getNewAllProducts() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/product/all`,
    { withCredentials: true },
  );
  return data;
}

export async function getNewAllContents() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/content`,
    { withCredentials: true },
  );
  return data;
}

export async function getNewAllLectures() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lecture`,
    { withCredentials: true },
  );
  return data;
}

export async function getNewAllLectureDetails() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lectureDetail`,
    { withCredentials: true },
  );
  return data;
}
