import { createI18n } from "vue-i18n";
import en from "@/locales/en_us.json";
import zh from "@/locales/zh_cn.json";
const messages = {
  en,
  zhCN:zh,
};

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zh", // 设置默认语言
  messages: messages, // 设置资源文件对象
});

export default (app: any) => {
  app.use(i18n);
};
