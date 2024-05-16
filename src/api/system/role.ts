import request from "../../utils/request";
import type {
  AddRoleParamsType,
  ResponseRoleListType,
  roleListType,
  Record,
} from "../types/roleType";

//获取角色列表数据
export const getRoleList = (data: roleListType) => {
  return request<ResponseRoleListType>("/system/role/search", "POST", data);
};
//新增角色列表数据
export const addRole = (data: AddRoleParamsType) => {
  return request("/system/role", "POST", data);
};
//编辑角色列表数据
export const EditRole = (data: AddRoleParamsType) => {
  return request("/system/role", "PUT", data);
};
//删除角色列表数据
export const delRole = (id: string | number) => {
  return request(`/system/role/${id}`, "DELETE");
};
