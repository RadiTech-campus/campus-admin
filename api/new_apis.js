import axios from "axios";

export async function getAllPayments() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/payment`,
    { withCredentials: true },
  );
  return data;
}
