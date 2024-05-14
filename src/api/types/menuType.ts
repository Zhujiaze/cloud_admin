/**
 * 查询菜单的参数类型
 */
export type SearchParamsType = {
  keyword?: string;
};

/**
 * 后台返回的菜单列表数据类型
 */
export type ResponseMenuListType = {
  children: DatumChild[];
  code: string;
  component: null | string;
  createTime: string;
  id: string;
  meta: DatumMeta;
  name: string;
  parentId: null;
  path: string;
  redirect: null | string;
  remark: string;
  sort: number;
  type: string;
  updateTime: string;
};
export type DatumChild = {
  children: ChildChild[];
  code: string;
  component: string;
  createTime: string;
  id: string;
  meta: FluffyMeta;
  name: string;
  parentId: string;
  path: string;
  redirect: null;
  remark: string;
  sort: number;
  type: string;
  updateTime: string;
};

export type ChildChild = {
  children: string[];
  code: string;
  createTime: string;
  id: string;
  meta: PurpleMeta;
  name: null;
  parentId: string;
  path: null;
  redirect: null;
  remark: string;
  sort: number;
  type: string;
  updateTime: string;
};

export type PurpleMeta = {
  cache: boolean;
  hidden: boolean;
  icon: null;
  title: string;
};

export type FluffyMeta = {
  cache: boolean;
  hidden: boolean;
  icon: string;
  title: string;
};

export type DatumMeta = {
  cache: boolean;
  hidden: boolean;
  icon: string;
  linkTo: string;
  title: string;
};

//菜单添加类型
export type formDataMenuType = {
  /**
   * 权限标识
   */
  code?: string;
  /**
   * 组件路径
   */
  component: string;
  /**
   * 路由信息
   */
  meta: Meta;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 上级菜单
   */
  parentId: string;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 重定向
   */
  redirect: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 菜单类型
   */
  type: string;
};

/**
 * 路由信息
 */
export type Meta = {
  /**
   * 是否缓存
   */
  cache: boolean;
  /**
   * 是否显示为菜单
   */
  hidden: boolean;
  /**
   * 菜单图标
   */
  icon: string;
  /**
   * 菜单名称
   */
  title: string;
};

//添加接口类型
export type MenuParamsType = {
  createTime?: string;
  updateTime?: string;
  id?: string;
  children?: string[];
  /**
   * 组件路径
   */
  component: string;
  /**
   * 路由信息
   */
  meta: Meta;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 上级菜单
   */
  parentId: string;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 重定向
   */
  redirect: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 菜单类型
   */
  type: string;
  /**
   * 权限标识
   */
  code?: string;
};

//选择菜单数据类型
export type MenuselectType = {
  code: number;
  data: Datum[];
  message: string;
  [property: string]: any;
};

export type Datum = {
  children: Child[];
  id: string;
  parentId: null;
  title: string;
  [property: string]: any;
};

export type Child = {
  children: string[];
  id: string;
  parentId: string;
  title: string;
  [property: string]: any;
};
