# Calculator
卡车之家 购车计算器：税 保险 杂费等计算

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### chart.js 地址：[https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)
### vue-chartjs地址：[https://github.com/apertureless/vue-chartjs](https://github.com/apertureless/vue-chartjs)

## 接口文档说明

#### 1.1 [获取urlcode](https://saasm.360che.com.cn/carprice/api/carprice/geturlcode.aspx)

#### 2.1 [获取盗抢险选项数据](https://saasm.360che.com.cn/carprice/api/carprice/safe/dqx_list.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o)
#### 2.2 [获取第三者责任险选项数据](https://saasm.360che.com.cn/carprice/api/carprice/safe/dsz_list.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o)
#### 2.3 [获取玻璃破碎险选项数据](https://saasm.360che.com.cn/carprice/api/carprice/safe/blp_list.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o)
#### 2.4 [获取人身意外险选项数据](https://saasm.360che.com.cn/carprice/api/carprice/safe/ryw_list.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o)

#### 3.1 [获取购车价格项数据](https://saasm.360che.com.cn/carprice/api/carprice/total.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o&productid=43119&carprice=300000&incidental=750&safe_dsz=1&safe_dqx=2)
#### 3.2 [获取贷款总利息](https://saasm.360che.com.cn/carprice/api/carprice/loantotal.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o&id=5&loanmoney=120000)

#### 3.3 [获取贷款还款表](https://saasm.360che.com.cn/carprice/api/carprice/repay.aspx?urlcode=p91302jx6dhqh245yrcgf83gq4ksnl8o&id=5&loanmoney=120000)

## 请求说明                             
    接口地址：
    测试接口：https://saasm.360che.com.cn/carprice/

    调用方式：POST

    备注：测试环境，支持GET和POST两种方式请求

######     返回示例
    ```
    {
        "state":1,
        "errcode":0,
        "errmsg":"",
        "fpt":"a0a05eb5a510cefddf9679e0ca996ec7",
        "cstamp":1502936595,
        "body":object
    }

    ```
######     返回说明
name | type | value | remark
---|---|---|---
state | int |1|1：成功返回、0：返回失败
errcode | int |1|错误码
errmsg | string |帐号权限不足|失败描述
fpt | string |a0a05eb5a510cefddf9679e0ca996ec7|32位指纹码
cstamp | int |1502936595|时间戳
body | object |{"sn":"110000","nm":"北京"}|业务数据
######     所有接口都会返回以上信息，以下接口返回说明剩略以上返回说明


### 1.1 获取urlcode
######     地址
    api/carprice/geturlcode.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
bbsid | int |否|用户论坛id


######     返回说明 - body
name | type | value | remark
---|---|---|---
body | string |gu6khfop6n2a1u1wa62rc3cggz4ae1lx|返回urlcode；以下所有接口都必传urlcode

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502936585,
    "body":"gu6khfop6n2a1u1wa62rc3cggz4ae1lx"
}
```
### 2.1 获取盗抢险选项数据
######     地址
    api/carprice/safe/dqx_list.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取


######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|保额标识 id
coverage | float |100000|保额

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502947384,
    "body":[
        {
            "id":1,
            "coverage":50000
        },
        {
            "id":2,
            "coverage":100000
        },
        {
            "id":3,
            "coverage":150000
        },
        {
            "id":4,
            "coverage":200000
        },
        {
            "id":5,
            "coverage":250000
        },
        {
            "id":6,
            "coverage":300000
        },
        {
            "id":7,
            "coverage":350000
        },
        {
            "id":8,
            "coverage":400000
        },
        {
            "id":9,
            "coverage":450000
        },
        {
            "id":10,
            "coverage":500000
        }
    ]
}
```

### 2.2 获取第三者责任险选项数据
######     地址
    api/carprice/safe/dsz_list.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取


######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|保额标识 id
coverage | float |50000|保额
premium | float |464.4|保费

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502947391,
    "body":[
        {
            "id":1,
            "coverage":50000,
            "premium":464.4
        },
        {
            "id":2,
            "coverage":100000,
            "premium":671.4
        },
        {
            "id":3,
            "coverage":150000,
            "premium":765
        },
        {
            "id":4,
            "coverage":200000,
            "premium":831.6
        },
        {
            "id":5,
            "coverage":250000,
            "premium":938.7
        },
        {
            "id":6,
            "coverage":300000,
            "premium":1126.8
        },
        {
            "id":7,
            "coverage":500000,
            "premium":1467
        },
        {
            "id":8,
            "coverage":1000000,
            "premium":1802.1
        },
        {
            "id":9,
            "coverage":1500000,
            "premium":2133.79
        }
    ]
}
```
### 2.3 获取玻璃破碎险选项数据
######     地址
    api/carprice/safe/blp_list.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取


######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|主键id
des | string |国产|描述
lct | float |0.0019|赔偿系数

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502947398,
    "body":[
        {
            "id":0,
            "des":"国产",
            "lct":0.0019
        },
        {
            "id":1,
            "des":"进口",
            "lct":0.003
        }
    ]
}
```
### 2.4 获取人身意外险选项数据
######     地址
    api/carprice/safe/ryw_list.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取


######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|主键id
coverage | float |100000|保额
premium | float |200|保费

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502939823,
    "body":[
        {
            "id":0,
            "coverage":100000,
            "premium":200
        },
        {
            "id":0,
            "coverage":200000,
            "premium":400
        }
    ]
}
```

### 3.1 获取购车价格项数据

######     地址
    api/carprice/total.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取
productid | int |是|车型主键id
carprice | float |是|裸车价格
id | int |否|系统返回本次计算主键id
bbsid | int |否|用户论坛帐号id
isv | int |否|1：营运，0：非营运；
incidental | float |否|杂费
safe_dsz | int |否|第三者责任险主键id
safe_dqx | int |否|盗抢险主键id
safe_blp | int |否|玻璃破碎险主键id
safe_ryw | int |否|人身意外险主键id
safe_chrz | float |否|车上人员责任险金额


######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|本次计算记录主键
productid | int |43119|车型id
carprice | float |300000|裸车价
incidental | float |750|杂费

######     返回说明 - body - taxtotal
name | type | value | remark
---|---|---|---
tax_gzs | float |30000|购置税
tax_chc | float |3600|车船使用税

######     返回说明 - body - safetotal
name | type | value | remark
---|---|---|---
safe_jqx | float |4480|交强险
safe_dsz | float |464.4|第三者责任险
safe_chs | float |5256|车辆损失险
safe_dqx | float |580|盗抢险
safe_blp | float |570|玻璃破碎险
safe_zrs | float |450|自然损失险
safe_bjp | float |858.06|不计免赔险
safe_wgz | float |92.88|无故责任险
safe_chrz | float |100|车上人员责任险
safe_ryw | float |200|人身意外险

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502948604,
    "body":{
        "id":5,
        "productid":43119,
        "carprice":300000,
        "incidental":750,
        "taxtotal":{
            "tax_gzs":30000,
            "tax_chc":3600
        },
        "safetotal":{
            "safe_jqx":4480,
            "safe_dsz":464.4,
            "safe_chs":5256,
            "safe_dqx":580,
            "safe_blp":570,
            "safe_zrs":450,
            "safe_bjp":858.06,
            "safe_wgz":92.88,
            "safe_chrz":100,
            "safe_ryw":200
        }
    }
}
```

### 3.2 获取贷款总利息
######     地址
    api/carprice/loantotal.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取
id | int |是|主键id
loanmoney | float |是|贷款金额
loantype | int |否|还款方式；0：等额本息；1：等额本金；不添默认 0；
loanmonths | int |否|还款月数；不添默认 36

######     返回说明 - body
name | type | value | remark
---|---|---|---
id | int |1|主键id
coverage | float |100000|保额
premium | float |200|保费

######     返回示例
```
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502949387,
    "body":{
        "id":5,
        "interest":16171.6752564936
    }
}
```

### 3.3 获取贷款还款表
######     地址
    api/carprice/repay.aspx

######     请求参数
name | type | 必填 | remark
---|---|---|---
urlcode | string |是|urlcode 接口1.1获取
id | int |是|主键id
loanmoney | float |是|贷款金额
loantype | int |是|还款方式；0：等额本息；1：等额本金；不添默认 0；
loanmonths | int |是|还款月数；不添默认 36


######     返回示例
```
等额本金
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502949387,
    "body":{
        list: [
            {
                num: 1,    //期数
                principal: 277.777777777778,  //本金
                interest: 70    //利息
            },
            ...
    }
}

等额本息
{
    "state":1,
    "errcode":0,
    "errmsg":"",
    "fpt":"",
    "cstamp":1502949387,
    "body":{
        num: 1,
        money: 315.212211241883    //月供
    }
}
```
