import { useQuery } from "@tanstack/react-query";
import { getAllPayments } from "../api/new_apis";

export const useGetNewPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const data = await getAllPayments();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
