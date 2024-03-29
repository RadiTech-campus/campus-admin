import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPayments,
  getNewAllContents,
  getNewAllLectureDetails,
  getNewAllLectures,
  getNewAllProducts,
  updatePayment,
} from "../api/new_apis";

export const useGetNewPayments = () => {
  return useQuery({
    queryKey: ["new", "payments"],
    queryFn: async () => {
      const data = await getAllPayments();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

interface IUpdateGorupMutation {
  id: number | undefined;
  payStatus: string | undefined;
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IUpdateGorupMutation) => updatePayment(payload),
    {
      onSuccess: () => {
        console.log("onSuccess");
        queryClient.invalidateQueries(["new", "payments"]);
      },
      onError: (e) => {
        console.log("e", e);
      },
      onSettled(data, error, variables, context) {
        console.log("data", data);
        console.log("error", error);
        console.log("variables", variables);
        console.log("context", context);
      },
    },
  );
}

export const useGetNewProducts = () => {
  return useQuery({
    queryKey: ["new", "payments"],
    queryFn: async () => {
      const data = await getNewAllProducts();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetNewContents = () => {
  return useQuery({
    queryKey: ["new", "contents"],
    queryFn: async () => {
      const data = await getNewAllContents();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetNewLectures = () => {
  return useQuery({
    queryKey: ["new", "lectures"],
    queryFn: async () => {
      const data = await getNewAllLectures();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetNewLectureDetails = () => {
  return useQuery({
    queryKey: ["new", "lectureDetails"],
    queryFn: async () => {
      const data = await getNewAllLectureDetails();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
