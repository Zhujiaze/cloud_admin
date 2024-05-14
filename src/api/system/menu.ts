import request from "@/utils/request";
import type { SearchParamsType, ResponseMenuListType } from "../types/menuType";

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
