// 数据列表树
function getTree(arr: any) {
	for (let i = 0; i < arr.length; i++) {
		arr.forEach((temp: any) => {
			temp.value = temp.id
			temp.label = temp.name
			if (temp.hasOwnProperty('children') && temp.children.length > 0) {
				getTree(temp.children)
			}
		})
	}
	return arr
}

// 递归判断列表，把最后的children设为undefined
export function getTreeData(data: any) {
	let Array: any = getTree(data)
	for (var i = 0; i < Array.length; i++) {
		if (Array[i].hasOwnProperty('children') && Array[i].children.length < 1) {
			// children若为空数组，则将children设为undefined
			Array[i].children = undefined
		} else if (Array[i].hasOwnProperty('children')) {
			// children若不为空数组，则继续 递归调用 本方法
			getTreeData(Array[i].children)
		}
	}
	return Array
}

// 清除对象元素内的值，条件自定义
export function emptyObject(obj: Object, callback: Function) {
	return Object.keys(obj).forEach((key) => { callback(obj, key) });
}

