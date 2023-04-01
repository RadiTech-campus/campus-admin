import axios from "axios";

export async function GetUsers(): Promise<any> {
  const { data } = await axios(
    "http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/users",
  );
  return data;
}

export async function GetUser(userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/users/${userId}`,
  );
  return data;
}

export async function GetUsersByCompany(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/usersbycompanyid/${companyId}`,
  );
  return data;
}

export async function GetUserWithOrders(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/userswithorders/${companyId}`,
    // `http://localhost:8080/userswithorders/${companyId}`,
  );
  return data;
}

export async function CreateUser(userdata: any): Promise<any> {
  const { data } = await axios.post(
    "http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/users",
    userdata,
  );
  return data;
}
