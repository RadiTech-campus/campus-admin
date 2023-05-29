import {
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAUniv,
  getContentDetail,
  getContents,
  getPayment,
  getPayments,
  getProduct,
  getProducts,
  getUniv,
  getUsers,
} from "../api/contents_api";

export const useGetContents = () => {
  return useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const data = await getContents();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetContentDetails = (contentCode) => {
  return useQuery({
    queryKey: [contentCode],
    queryFn: async () => {
      const data = await getContentDetail(contentCode);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetPayment = (userId) => {
  return useQuery({
    queryKey: [userId],
    queryFn: async () => {
      const data = await getPayment(userId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const data = await getPayments();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetUniv = () => {
  return useQuery({
    queryKey: [`univs`],
    queryFn: async () => {
      const data = await getUniv();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
export const useGetAUniv = (domain) => {
  return useQuery({
    queryKey: [`${domain}`],
    queryFn: async () => {
      const data = await getAUniv(domain);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetProduct = (productCode) => {
  return useQuery({
    queryKey: [`${productCode}`],
    queryFn: async () => {
      const data = await getProduct(productCode);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetProductss = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getUsers();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
