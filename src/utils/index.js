import axios from 'axios'
import Interval from 'real-interval'
const COOKIE = document.cookie
const BASEURL = 'https://saasm.360che.com.cn/carprice/' 		// 计算接口
const BBSCAR = 'https://product.360che.com/index.php?r=api/'	// 产品库车型


function getUid(callback){	// 获取userid
	let uid = COOKIE.match(/AbcfN_ajaxuid=([^;$]+)/)
	if(uid && uid[1])
	return uid[1]
	else
	location.href = 'https://sso.360che.com/?c=login'
	// &referer=
}

function getUrlcode (callback){	// 获取urlcode
	axios.get(`${BASEURL}api/carprice/geturlcode.aspx`)
	.then(callback)
	.catch(callback)
}

function actorTotal(callback){	// 获取参数人数
	axios.get(`${BASEURL}getindex.aspx?v1`)
	.then(callback)
	.catch(callback)
}

function getBrand(callback){		// 获取品牌
	axios.get(`${BBSCAR}calculator/brand`)
	.then(callback)
	.catch(callback)
}
function getSeries(callback,json){		// .获取车系
	axios.get(`${BBSCAR}calculator/series`,{params:json})
	.then(callback)
	.catch(callback)
}
function getProduct(callback,json){		// 获取车型
	axios.get(`${BBSCAR}calculator/product`,{params:json})
	.then(callback)
	.catch(callback)
}

// function getTotalData(callback,json){		// 获取购车价格项数据
// 	axios({
// 	  method: 'post',
// 	  url: `${BASEURL}api/carprice/total.aspx`,
// 	  data: json,
// 	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
// 	})
// 	.then(callback)
// 	.catch(callback)
// }

function getTotalData(callback,json){		// 购车价格项数据
	axios.get(`${BASEURL}api/carprice/total.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getThereData(callback,json){		// 获取第三者责任险选项数据
	axios.get(`${BASEURL}api/carprice/safe/dsz_list.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getGlassData(callback,json){		// 获取玻璃破碎险选项数据
	axios.get(`${BASEURL}api/carprice/safe/blp_list.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getAccidentData(callback,json){		// 获取人身意外险选项数据
	axios.get(`${BASEURL}api/carprice/safe/ryw_list.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getStolenData(callback,json){		// 获取盗抢险选项数据
	axios.get(`${BASEURL}api/carprice/safe/dqx_list.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getLoantotalData(callback,json){		// 获取贷款总利息
	axios.get(`${BASEURL}api/carprice/loantotal.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

function getRepayData(callback,json){		// 获取贷款还款表
	axios.get(`${BASEURL}api/carprice/repay.aspx`,{params:json})
	.then(callback)
	.catch(callback)
}

export default {
	uid: getUid,
	getUrlcode,
	getBrand,
	getSeries,
	getProduct,
	getTotalData,
	getThereData,
	getGlassData,
	getAccidentData,
	getStolenData,
	getLoantotalData,
	getRepayData
}
