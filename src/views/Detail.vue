<template>
    <div class="detail">
        <titleBar :titleText="titleText"></titleBar>
        <div class="detail-view" :style="[ totalShow ? styleObjeat : '']">
            <!-- tab -->
            <detailTab :fullPayment="fullPayment" :loansMonthPayment="loansMonthPayment" :loantype="loantype" :subtabShow="subtabShow" :loansPayment="loansPayment" v-on:subtabLoan="subtabLoanFun" v-on:equalShow="equalShowFun"></detailTab>
            <detailData :priceDataObject="priceDataObject" :carPrice='carPrice' :subtabShow="subtabShow" :taxPrice="taxPrice" :incidentalPrice="incidentalPrice" :insurancePrice="insurancePrice"></detailData>

            <!-- 等额本金 -->
            <div class="equal-view" v-show="subtabShow">
<<<<<<< HEAD
                <detailCheck v-on:checkValue="checkFun" :loantypeProp="loantypeProp"></detailCheck>
                <!-- <detailWay></detailWay> -->
                <detailProcess v-on:loanObjeact="loanFun" :loanratioProp="loanratioProp" :loanmonthsProp="loanmonthsProp"></detailProcess>
            </div>

            <!-- 车型 价格筛选 -->
            <FillList v-on:brand="brandshow" :isVehicle="isVehicle" :brandText="brandText" :headstockValue="headstockValue" :affiliatedValue="affiliatedValue" v-on:inputValue="formEleOption"></FillList>
=======
                <detailCheck v-on:checkValue="checkFun"></detailCheck>
                <!-- <detailWay></detailWay> -->
                <detailProcess v-on:loanObjeact="loanFun"></detailProcess>
            </div>

            <!-- 车型 价格筛选 -->
            <FillList v-on:brand="brandshow" :brandText="brandText" :headstockValue="headstockValue" :affiliatedValue="affiliatedValue" v-on:inputValue="formEleOption"></FillList>
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
            <!-- 保险 -->
            <router-link to="/Insurance">
                <detailItem :insurancePrice="insurancePrice"></detailItem>
            </router-link>
            <!-- 税 -->
            <detailTax :taxPrice="taxPrice" :taxObject="taxObject"></detailTax>
            <!-- 杂费 -->
            <insurance :incidentalPrice="incidentalPrice" :incidentalObject="incidentalObject" v-on:insuranceOptions="insuranceFun"></insurance>
        </div>
        <!-- 弹层 -->
        <div class="popups" v-show="popupsShow">
            <!-- 遮罩层 -->
            <div class="mask" @click="popupsFun"></div>
            <!-- 弹层内容 -->
            <div class="popcontainer">
                <headerPop :titlePop="titlePop" :superior="superior" v-on:headClose="popupsFun" v-on:backPar="backSuperior"></headerPop>
                <brandsPop v-on:brandId="brandsFun" v-show="brandsShow" :brandList="brandList"></brandsPop>
                <seriesPop :series="series" :seriesList="seriesList" v-on:seriesId="seriesFun"></seriesPop>
                <vechilePop :vechile="vechile" :vechileList="vechileList" v-on:vechileOption="vechileFun"></vechilePop>
                <equalPop v-show="equal" :equalList="equalList" :principalTotal="principalTotal" :interestTotal="interestTotal"></equalPop>
            </div>
        </div>
        <!-- footer -->
        <detailFooter :totalPayment='totalPayment' :totalShow='totalShow'></detailFooter>
        <Loading v-show="loadingShow"></Loading>
    </div>
</template>

<script>
    import utils from "../utils"
    import { financialDetail } from '../financial.js'
    import FillList from "../components/home/fill"
    import titleBar from "../components/title-bar/title-bar"
    import brandsPop from "../components/popups/brands"
    import headerPop from "../components/popups/header"
    import seriesPop from "../components/popups/series"
    import vechilePop from "../components/popups/vehicle"
    import equalPop from "../components/popups/equal"
    // Detail
    import detailTab from "../components/detail/tab"
    import detailData from "../components/detail/data"
    import detailItem from "../components/detail/item"
    import insurance from "../components/detail/insurance"
    import detailFooter from "../components/detail/footer"
    import detailTax from "../components/detail/tax"
    import detailCheck from "../components/detail/check"
    import detailProcess from "../components/detail/process"
    import detailWay from "../components/detail/way"
    import Loading from "../components/popups/loading"

    export default {
        components: {
            titleBar,FillList,brandsPop,headerPop,seriesPop,vechilePop,
            detailTab,detailData,detailItem,insurance,detailFooter,
            detailTax,detailCheck,detailProcess,detailWay,equalPop,Loading
        },
        data () {
            var me = this
            return {
                titleText: '购车计算器',        // title
                titlePop: '选择品牌',         // 弹出层title
                popupsShow: false,          // 弹出层
                superior: false,            // 弹窗层返回上级按钮
                brandText: '请选择',
                headstockValue: '',
                affiliatedValue: '',
                series: false,              // 车系
                vechile: false,             // 车型
                seriesNum: -1,              // 品牌id
                brandsShow: true,            // 品牌
                brandList: {},
                seriesList: {},
                vechileList: {},
                productId: 0,               // 车型id
                buttonPitch: false,         // button
                Urlcode:'',
                formValue: {                // 提交信息
                    productid:'',           // 车型id
                    carprice:'',            // 裸车价格
                    urlcode:'',
                    safe_dsz: 1,
                    safe_dqx: 1
                },
                carDataLocal: {},           // Local修改数据
                PriceObj:{},
                updata: false,               // chart更新
                fullPayment: '',             // 全款金额
                loansPayment: '',            // 贷款金额
                carPrice: '',                // 裸车价
                taxPrice: 0,               // 税
                taxObject: {},              // 所有税
                incidentalPrice: 0,        // 杂费
                incidentalObject: [        // 杂费项
                    {
                        safe: true,
                        name: "上牌费",
                        icon: false,
                        needNum: 0,
                        input: true,
                        price: 500,
                        id: ''
                    },
					{
                        safe: false,
                        name: "办证",
                        icon: false,
                        needNum: 0,
                        input: true,
                        price: '',
                        id: ''
                    }
				],
                insurancePrice: '',         // 保险
                subtabShow: false,          // 贷款选项
                liabilityInCar: 0,          // 车上人员责任险金额
                loantype: 0,              // 还款方式
                loanmonths: 36,           // 还款月数
                loanratio: 0.3,              // 首付比例
                totalPayment: 0,            // 总成本
                totalShow: false,
                styleObjeat: {
                    'paddingBottom': '56px'
                },
                equal: false,                // 等额本金
                equalList: [],
                priceDataObject: {          // 图标子组件
                    carPrice: '',
                    incidentalPrice: '',
                    insurancePrice: '',
                    taxPrice: ''
                },
                loansMonthPayment:0,
                loadingShow: false,
                interestTotal:0,
                principalTotal: 0,
                loansPayInterest:0,         // 总利息
<<<<<<< HEAD
                isVehicle: true,             // 挂车输入框
                loanratioProp: 50.1,        // 进度条
				loanmonthsProp: 100,
                loantypeProp: 0             // 缓存等额本金本息记录
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
            }
        },
        created () {
            var me = this;
            // 提交信息
            if(this.$route && this.$route.query){
                this.formValue = this.$route.query
            }
            this.formValue.safe_dsz = 1
            this.formValue.safe_dqx = 1

            // home 通信
            var carData = localStorage.getItem('CARVALUE');
            if(carData){
                carData = me.carDataLocal = JSON.parse( carData );
<<<<<<< HEAD
                me.isVehicle = carData.isVehicle
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                me.brandText = carData.brandText
                me.headstockValue = carData.headstockValue
                me.affiliatedValue = carData.affiliatedValue
                me.formValue.urlcode = carData.Urlcode == undefined ? me.$route.query.urlcode : carData.Urlcode
<<<<<<< HEAD
                me.formValue.carprice = parseInt(me.headstockValue) + parseInt(me.affiliatedValue == '' ? 0 : me.affiliatedValue)
=======
                me.formValue.carprice = parseInt(carData.headstockValue) + parseInt(carData.affiliatedValue)
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                // 读取保险缓存数据
                if(carData.everData){
                    me.incidentalPrice = carData.everData.incidental
                    for (var key in carData.everData) {
                        me.formValue[key] = carData.everData[key]
                    }
                }
<<<<<<< HEAD
                // 默认加第三责任险
                this.formValue.safe_dsz = this.formValue.safe_dsz == '' ? 1 : this.formValue.safe_dsz
                this.formValue.safe_dqx = this.formValue.safe_dqx == '' ? 1 : this.formValue.safe_dqx

            }else{
                // 没有缓存数据直接回首页
                me.$router.push({ path: '/'})
            }

            // 获取数据
            me.getTotal()

            // 保留贷款页信息
            var subtabLoan = localStorage.getItem('SUBTABloan');
            if(subtabLoan){
                subtabLoan = JSON.parse( subtabLoan );
                if(subtabLoan.subtabShow){
                    var o = {judge:true}
                    me.subtabShow = subtabLoan.subtabShow
                    me.totalShow = subtabLoan.totalShow
                    // 贷款
                    me.subtabLoanFun(o,subtabLoan.dataObj)

                    // 赋值
                    me.formValue.urlcode = subtabLoan.dataObj.urlcode
                    me.formValue.productid = subtabLoan.dataObj.id
                    me.loansPayment = subtabLoan.dataObj.loanmoney
                    me.loantype = subtabLoan.dataObj.loantype
                    me.loanmonths = subtabLoan.dataObj.loanmonths
                    me.loanratioProp = subtabLoan.loanratioProp
    				me.loanmonthsProp = subtabLoan.loanmonthsProp
                    me.loantypeProp = subtabLoan.loantypeProp
                }
            }
=======
             }
            // 获取数据
            me.getTotal()
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
        },
        methods:{
            getTotal() {            // 计算总数 请求数据
                var me = this;
                // 获取数据
<<<<<<< HEAD
=======
                console.log(me.formValue);
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                utils.getTotalData(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.state == 1){
                            var body = data.body
                            // 数据渲染
                            me.carPrice = me.priceDataObject.carPrice = body.carprice                                 // 裸车价
                            me.incidentalPrice = me.priceDataObject.incidentalPrice = body.incidental                        // 杂费
                            me.insurancePrice = me.priceDataObject.insurancePrice = me.Calculation(body.safetotal,1);         // 保险
                            me.taxPrice  = me.priceDataObject.taxPrice = me.Calculation(body.taxtotal)               // 税
                            me.taxObject = body.taxtotal
                            me.fullPayment =  me.carPrice + me.incidentalPrice + me.insurancePrice + me.taxPrice    // 全款金额
                            //loansPayment: '',            // 贷款金额
                            me.updata = true;
                            // 车上人员责任险金额
                            me.liabilityInCar = body.safetotal.safe_chrz

                            // 总成本计算
                            me.totalPayment = me.loansPayInterest + me.fullPayment

                            // 保险obj
                            var insuranceData = localStorage.getItem('INSURANCEpriceDATA');
                            insuranceData && localStorage.removeItem('INSURANCEpriceDATA');
                            try {
                              var InsurancePriceDataSafe = body.safetotal
                              localStorage.setItem('INSURANCEpriceDATA',JSON.stringify(InsurancePriceDataSafe));
                            } catch(e){};

                            me.cacheData();
                        }
                    }
                },me.formValue)
            },
            cacheData () {          // 缓存数据
                var me = this;
                // 实时计算贷款
                if(me.subtabShow){
                    this.subtabLoanFun({'judge':true})
                }

                // 跳转保险页的时候缓存所得数据
                var carData = localStorage.getItem('CARVALUE');
                carData && localStorage.removeItem('carData');
<<<<<<< HEAD
                me.affiliatedValue = this.isVehicle ? me.affiliatedValue : ""
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                try {
                  var CarData = {
                      'brandText': me.brandText,
                      'headstockValue': me.headstockValue,
                      'affiliatedValue': me.affiliatedValue,
                      'Urlcode' : me.formValue.urlcode,
<<<<<<< HEAD
                      'isVehicle': me.isVehicle,
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                      'everData':{
                          'isv': 0,
                          'safe_chrz': me.liabilityInCar,       // 车上人员责任险金额
                          'incidental': me.incidentalPrice,     // 杂费
                          'safe_dsz': '1',       // 第三者责任险主键id
                          'safe_dqx': '1',       // 盗抢险主键id
                          'safe_blp': '',       // 玻璃破碎险主键id
                          'safe_ryw': '',       // 人身意外险主键id
                      }
                  }
                  localStorage.setItem('CARVALUE',JSON.stringify(CarData));
                } catch(e){};
            },
            Calculation (o,n){        // 计算保险 税
                var num = 0;
                var insurance = localStorage.getItem('CalculatioN');
                if( n==1 && insurance ){       // 计算缓存的保险金额
                    var obj = JSON.parse( insurance );
                    obj.forEach(function(ele,index){
                        if(ele.safe){
                            num += parseInt(ele.price)
                        }
                    })
                }else{
                    for (var key in o) {
                        num += parseInt(o[key])
                    }
                }

                return num;
            },
            insuranceFun (o) {       // 杂费计算
                var num = 0;
                var me = this
                o.forEach(function(ele,index){
                    if(ele.safe){
                        num += parseInt(ele.price == '' ? 0 : ele.price)
                    }
                })
                this.incidentalPrice = num
                this.fullPayment += num
                me.formValue.incidental = this.incidentalPrice
                this.cacheData()
                me.getTotal();

                // 跳转保险页的时候缓存所得数据
                var incidental = localStorage.getItem('IncidentalOBJ');
                incidental && localStorage.removeItem('IncidentalOBJ');
                try {
                  localStorage.setItem('IncidentalOBJ',JSON.stringify(o));
                } catch(e){};
            },
            brandshow (o) {      // 品牌展示
                var me = this;
                this.popupsShow = o.judge
                this.brandsShow = true
                this.loadingShow = true
                this.titlePop = '选择品牌'
                // 请求品牌
                utils.getBrand(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.status == 1){
                            me.brandList = data.data
                            me.loadingShow = false
                        }
                    }
                })
                if(this.popupsShow){
                    document.querySelector('.detail-view').style.overflow = 'hidden'
                }else{
                    document.querySelector('.detail-view').style.overflow = 'scroll'
                }
            },
            checkFun (o) {           // 等额本金 & 本息
                var me = this
                me.loantype = o.id
<<<<<<< HEAD

                me.loantypeProp = o.id
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                // 实时计算贷款
                if(me.subtabShow){
                    this.subtabLoanFun({'judge':true})
                }
            },
            equalShowFun (o) {         // 等额本金展示
                this.equal = o.judge
                this.popupsShow = o.judge;
                this.titlePop = '等额本金'

                // 等额本金 本息
                this.repayDataFun()

                // 关闭
                this.brandsShow = false
                this.series = false
                this.vechile = false

                if(this.popupsShow){
                    document.querySelector('body').style.overflow = 'hidden'
                }else{
                    document.querySelector('body').style.overflow = 'scroll'
                }

            },
            repayDataFun () {               // 等额本金 本息 （月供还是计划表请求）
                var me = this
                var dataObj = {
                    'urlcode': me.formValue.urlcode,
                    'id': me.formValue.productid,       //车型id
                    'loanmoney': me.loansPayment,       //贷款金额
                    'loantype': me.loantype,            //还款方式
                    'loanmonths': me.loanmonths,        //还款月数
<<<<<<< HEAD
                    'safe_dsz': me.formValue.safe_dsz,
                    'safe_dqx': me.formValue.safe_dqx
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                }
                utils.getRepayData(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.state == 1){
                            if(me.loantype){
                                me.equalList = data.body.list
                                me.Total(me.equalList)
                            }else{
                                me.loansMonthPayment = parseInt(data.body.money)
                            }
                        }
                    }
                },dataObj);
            },
            Total (o){
				var me = this;
				o.forEach(function(e,i){
					me.principalTotal += parseInt(e.principal)
					me.interestTotal += parseInt(e.interest)
				})
			},
            loanFun (o) {            // 首付比例 & 还款时间
                // 贷款金额  比例
                this.loanratio = o.ratio
                // 还款月数
                this.loanmonths = o.months
<<<<<<< HEAD

                this.loanratioProp = o.loanratio
                this.loanmonthsProp = o.loanmonths

=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                // 实时计算贷款
                if(this.subtabShow){
                    this.subtabLoanFun({'judge':true})
                }
            },
<<<<<<< HEAD
            subtabLoanFun (o,data) {     // 贷款 or 全款
                var me = this
                var dataObj = {}
=======
            subtabLoanFun (o) {     // 贷款 or 全款
                var me = this
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                this.subtabShow = o.judge
                this.totalShow = o.judge
                //贷款金额   贷款金额=（总价-杂费）X（100%-首付比例）
                me.loansPayment = parseInt((me.fullPayment - me.incidentalPrice)*(1-me.loanratio))
                if(this.subtabShow){
<<<<<<< HEAD
                    if(data){dataObj = data}else{
                        dataObj = {
                            'urlcode': me.formValue.urlcode,
                            'id': me.formValue.productid,       //车型id
                            'loanmoney': me.loansPayment,       //贷款金额
                            'loantype': me.loantype,            //还款方式
                            'loanmonths': me.loanmonths,        //还款月数
                        }
=======
                    var dataObj = {
                        'urlcode': me.formValue.urlcode,
                        'id': me.formValue.productid,       //车型id
                        'loanmoney': me.loansPayment,       //贷款金额
                        'loantype': me.loantype,            //还款方式
                        'loanmonths': me.loanmonths,        //还款月数
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
                    }
                    utils.getLoantotalData(function(res){
                        if( res.status == 200){
                            var data = res.data;
                            if(data.state == 1){
                                me.loansPayInterest = parseInt(data.body.interest)
                                // me.totalPayment = me.loansPayInterest + me.loansPayment
                                me.totalPayment = me.loansPayInterest + me.fullPayment
                            }
                        }
                    },dataObj);
                }
<<<<<<< HEAD
                // 添加贷款选中参数
                var subtabLoan = localStorage.getItem('SUBTABloan');
                try {
                    var o = {}
                    o.dataObj = dataObj;
                    o.subtabShow = me.subtabShow
                    o.totalShow = me.totalShow
                    o.loanratioProp = me.loanratioProp
                    o.loanmonthsProp = me.loanmonthsProp
                    o.loantypeProp = me.loantypeProp
                  localStorage.setItem('SUBTABloan',JSON.stringify(o));
                } catch(e){};

=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b

                // 等额本金 本息
                this.repayDataFun()
            },
            popupsFun (o) {       // 关闭弹出层
                this.equal = false
                this.popupsShow = false;

                // 关闭
                // this.brandsShow = false
                // this.series = false
                // this.vechile = false

                if(this.popupsShow){
                    document.querySelector('.detail-view').style.overflow = 'hidden'
                }else{
                    document.querySelector('.detail-view').style.overflow = 'scroll'
                }
            },
            brandsFun (o) {          // 品牌筛选车系
                var me = this;
                this.brandsShow = true
                this.equal = false
                me.loadingShow = true
                // 请求车系
                var dataObj = {'brand_id':o.id};
                utils.getSeries(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.status == 1){
                            me.seriesList = data
                            me.loadingShow = false
                        }
                    }
                },dataObj);

                this.brandsShow = o.judge;
                this.series = !o.judge;
                this.superior = !o.judge;
                this.titlePop = '选择车系';
            },
            seriesFun (o){          // 车系选中车型
                var me = this;
                me.loadingShow = true
                // 请求车系
                var dataObj = {'sub_id': o.subCateId,'series_id': o.sId };
                utils.getProduct(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.status == 1){
                            me.vechileList = data
                            me.loadingShow = false
                        }
                    }
                },dataObj);

                this.brandsShow = o.judge;
                this.series = o.judge;
                this.vechile = !o.judge;
                this.titlePop = '选择车型';
            },
            vechileFun (o) {         // 车型
                this.brandText = o.name
                this.popupsShow = o.judge
                // id
                this.formValue.productid = o.id
<<<<<<< HEAD
                this.isVehicle = o.isVehicle

                // 是否挂靠
                if(!this.isVehicle){
                    this.formValue.carprice = parseInt(this.headstockValue)
                    this.affiliatedValue = 0
                    this.getTotal();
                    this.cacheData();
                }

                if(this.popupsShow){
                    document.querySelector('.detail-view').style.overflow = 'hidden'
                }else{
                    document.querySelector('.detail-view').style.overflow = 'scroll'
                }
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
            },
            backSuperior (o) {      //返回上一级
                var me = this;
                if(this.series){
                    this.brandsShow = !o.judge
                    this.series = o.judge
                    this.superior = o.judge
                    this.titlePop = '选择品牌';
                }else{
                    this.series = !o.judge
                    this.vechile = o.judge
                    this.titlePop = '选择车系';
                }
            },
            formEleOption (o) {    // 获取用户填写内容
                var me = this
                me.headstockValue = o.headstock == '' ? 0:o.headstock
<<<<<<< HEAD
                me.affiliatedValue = this.isVehicle ? '' : o.affiliated
                me.formValue.carprice = parseInt(me.headstockValue) + parseInt(o.affiliated == '' ? 0:o.affiliated)
=======
                me.affiliatedValue = o.affiliated == '' ? 0:o.affiliated
                me.formValue.carprice = parseInt(me.headstockValue) + parseInt(me.affiliatedValue)
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b

                // 按钮颜色
                if(me.formValue.carprice > 0 && me.formValue.productid != ''){
                    me.getTotal();
                    me.cacheData();
                }
            }
        }
    }
</script>

<style scoped>
    .detail{
        height: 100%;
        overflow: hidden;
    }
    .detail-view{
        height: calc(100vh);
        padding-top: 44px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
</style>
