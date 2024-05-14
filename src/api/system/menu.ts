import request from "@/utils/request";
import type {
  SearchParamsType,
  ResponseMenuListType,
  MenuParamsType,
  MenuselectType,
} from "../types/menuType";

// 获取菜单列表
export const getMenuList = (searchParams?: SearchParamsType) => {
  return request<ResponseMenuListType>(
    "/system/menu/search",
    "POST",
    searchParams
  );
};

//删除菜单
export const deleteMenu = (id: number | string) => {
  return request<ResponseMenuListType>(`/system/menu/${id}`, "DELETE");
};
//选择菜单接口
export const selectMenu = () => {
  return request<MenuselectType>(`/system/menu/select`, "GET");
};
//新增菜单接口
export const addMenu = (data: MenuParamsType) => {
  return request(`/system/menu`, "POST", data);
};
//修改菜单接口
export const editMenu = (data: MenuParamsType) => {
  return request(`/system/menu`, "PUT", data);
};
