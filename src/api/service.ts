import request from "@/plugins/axios";
import { LoginData } from "@/api/interface";
// 登录
export const login = (data: LoginData<string>) => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};

// 获取列表数据
export const getList = (params: { keyword: string }) => {
  return request({
    url: "/list",
    method: "get",
    params,
  });
};


// 查询数据
export const getAreaList = (params : object) => {
  return request({
    url: "/getAreaList",
    method: "get",
    params,
  });
};


// 新增数据
export const saveAreaList = (params : object) => {
  return request({
    url: "/getAreaList/save",
    method: "get",
    params,
  });
};

// 修改数据
export const updateAreaList = (params : object) => {
  return request({
    url: "/getAreaList/update",
    method: "get",
    params,
  });
};

// 删除数据
export const deleteAreaList = (params : object) => {
  return request({
    url: "/getAreaList/delete",
    method: "get",
    params,
  });
};
