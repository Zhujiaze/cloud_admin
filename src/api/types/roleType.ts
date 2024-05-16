export type roleListType = {
  /**
   * 页码
   */
  current: number;
  /**
   * 角色名称
   */
  name: string;
  /**
   * 条数
   */
  size: number;
};

export type ResponseRoleListType = {
  records: Record[];
  total: number;
};

export type Record = {
  createTime: string;
  id: number;
  remark: string;
  roleCode: string;
  roleName: string;
  status: boolean;
  updateTime: string;
};

export type AddRoleParamsType = {
  updateTime?: string;
  id?: number | string;
  createTime?: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 角色编码
   */
  roleCode: string;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 角色状态
   */
  status: boolean;
};
