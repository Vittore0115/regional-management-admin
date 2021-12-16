import { Commit } from "vuex";
import { login, getAreaList } from "@/api/service";
import { LoginData } from "@/api/interface";
const state = {
	userInfo: {},
};

const user = {
	state,
	actions: {
		// 用户登录
		login(context: { commit: Commit; state: any }, reqData: LoginData<string>) {
			return new Promise((resolve, reject) => {
				try {
					// 这里写请求
					interface ResData {
						code: number;
						message: string;
						data: object;
					}
					let resData: ResData = {
						code: 200,
						message: "success",
						data: {
							...reqData,
						},
					};
					resolve(resData);
				} catch (error) {
					reject(error)
				}
				context.commit("SET_INFO", reqData);
			});
		},
		// 获取省市区
		getList(pageIndex : any,limit: any) {
			return new Promise(async (resolve, reject) => {
				let params: any = {
					pageIndex,
					limit
				}
				try {
					// 这里写请求
					const data = await getAreaList(params);	
					resolve(data);
				} catch (error) {
					reject(error)
				}
			});
		}
	},
	mutations: {
		SET_INFO(state: any, data: LoginData<string>) {
			// 变更状态
			state.userInfo = data;
		},
	},
};

export default user;
