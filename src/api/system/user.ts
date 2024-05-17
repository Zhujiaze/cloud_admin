import request from "../../utils/request";
import type {
  UserListParamsType,
  ResponseUserListType,
  userdataaddType,
  Data,
  userpasswordType,
} from "../types/userType";

//用户列表接口
export const getUserList = (userListParams: UserListParamsType) => {
  return request<Data>("/system/user/search", "POST", userListParams);
};
//删除用户列表接口
export const delUser = (id: number) => {
  return request(`/system/user/${id}`, "DELETE");
};
//新增用户列表
export const addUser = (data: userdataaddType) => {
  return request("/system/user", "post", data);
};
//修改用户列表
export const editUser = (data: userdataaddType) => {
  return request("/system/user", "PUT", data);
};

//修改密码接口
export const editPwd = (data: userpasswordType) => {
  return request("/system/user/password", "PUT", data);
};
