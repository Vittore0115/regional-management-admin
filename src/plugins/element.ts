import {
	ElSwitch,
	ElButton,
	ElContainer,
	ElAside,
	ElHeader,
	ElMain,
	ElFooter,
	ElMenu,
	ElSubMenu,
	ElMenuItemGroup,
	ElMenuItem,
	ElForm,
	ElFormItem,
	ElInput,
	ElPopover,
	ElTag,
	ElCard,
	ElTable,
	ElTableColumn,
	ElPagination,
	ElDialog,
	ElPopconfirm,
	ElUpload,
	ElLoading,
	ElSelect,
	ElOption,
	ElRadioGroup,
	ElRadio,
	ElCascader,
	ElCheckbox,
	ElInputNumber,
	ElDatePicker,
	ElMessage,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem
} from "element-plus";
const plugins = [
	ElSwitch,
	ElButton,
	ElContainer,
	ElAside,
	ElHeader,
	ElMain,
	ElFooter,
	ElSubMenu,
	ElMenu,
	ElMenuItemGroup,
	ElMenuItem,
	ElForm,
	ElFormItem,
	ElInput,
	ElPopover,
	ElTag,
	ElCard,
	ElTable,
	ElTableColumn,
	ElPagination,
	ElDialog,
	ElPopconfirm,
	ElUpload,
	ElLoading,
	ElSelect,
	ElOption,
	ElRadioGroup,
	ElRadio,
	ElCascader,
	ElCheckbox,
	ElInputNumber,
	ElDatePicker,
	ElMessage,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
];
// export const elementPlugins = {
//     install: function(vm:any) {
//       plugins.forEach(item => {
//         vm.component(item.name, item);
//       });
//     }
//   };
export default (app: any) => {
	plugins.forEach((element) => {
		app.use(element);
	});
};
