<template>
    <div class="home" v-bind:style="[titleBarShow ? styleObjs : '']">
        <titleBar :titleText="titleText" v-on:titleShow="titleShowFun"></titleBar>
        <div class="prompts">请选择车型并输入价格</div>
        <FillList v-on:brand="brandshow" :isVehicle="isVehicle" :brandText="brandText"  :headstockValue="headstockValue" :affiliatedValue="affiliatedValue" v-on:inputValue="formEleOption"></FillList>
        <!-- 完成后加 pitch -->
        <div class="button" :class="[buttonPitch ? 'pitch' : '']" @click="financial">计算</div>

        <!-- 弹层 -->
		<div class="popups" v-show="popupsShow">
			<!-- 遮罩层 -->
			<div class="mask" @click="popupsShow = !popupsShow"></div>
			<!-- 弹层内容 -->
			<div class="popcontainer">
                <headerPop :titlePop="titlePop" :superior="superior" v-on:headClose="popupsFun" v-on:backPar="backSuperior"></headerPop>
                <brandsPop v-on:brandId="brandsFun" v-show="brandsShow" :brandList="brandList"></brandsPop>
                <seriesPop :series="series" :seriesList="seriesList" v-on:seriesId="seriesFun"></seriesPop>
                <vechilePop :vechile="vechile" :vechileList="vechileList" v-on:vechileOption="vechileFun"></vechilePop>
			</div>
		</div>
        <Loading v-show="loadingShow"></Loading>
    </div>
</template>

<script>
    import utils from "../utils";
    import { financialDetail } from '../financial.js'
    import FillList from "../components/home/fill"
    import titleBar from "../components/title-bar/title-bar"
    import brandsPop from "../components/popups/brands"
    import headerPop from "../components/popups/header"
    import seriesPop from "../components/popups/series"
    import vechilePop from "../components/popups/vehicle"
    import Loading from "../components/popups/loading"
    export default {
        components: {
            titleBar,
            FillList,
            brandsPop,
            headerPop,
            seriesPop,
            vechilePop,
            Loading
        },
        data () {
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
                PriceObj: {},               // 信息填写数据
                formValue: {                // 提交信息
                    productid:'',           // 车型id
                    carprice:'',            // 裸车价格
                    urlcode:''
                },
                loadingShow: false,
                isVehicle: true,             // 挂车输入框
                titleBarShow: false,        // titleBar
                styleObjs: {
                    'paddingTop': 0
                }
            }
        },
        created () {
            var me = this;
            // Urlcode

            utils.getUrlcode(function(res){
                if( res.status == 200){
                    var data = res.data;
                    if(data.state == 1){
                        me.Urlcode = data.body
                        me.formValue.urlcode = data.body
                    }
                }
            })
        },
        methods:{
            titleShowFun (o) {
                this.titleBarShow = true;
            },
            brandshow (o) {      // 品牌展示
                var me = this;
                this.loadingShow = true
                this.popupsShow = o.judge
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
            },
            popupsFun (o) {       // 关闭弹出层
                this.popupsShow = o.judge;
                // this.brandsShow = !o.judge;
                // this.series = o.judge;
                // this.superior = o.judge;
            },
            brandsFun (o) {          // 品牌筛选车系
                var me = this;
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
                this.isVehicle = o.isVehicle
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
                me.affiliatedValue = this.isVehicle ? o.affiliated : ''
                me.formValue.carprice = parseInt(me.headstockValue) + parseInt(o.affiliated == '' ? 0:o.affiliated)
                me.PriceObj = o;
                // 按钮颜色
                if(me.formValue.carprice > 0 && me.formValue.productid != ''){
                    me.buttonPitch = true
                }else {
                    me.buttonPitch = false
                }
            },
            cacheData () {
                var me = this;
                var carData = localStorage.getItem('CARVALUE');
                carData && localStorage.removeItem('carData');
                me.affiliatedValue = this.isVehicle ? me.affiliatedValue : ''
                try {
                  var CarData = {
                      'brandText': me.brandText,
                      'Urlcode' : me.formValue.urlcode,
                      'headstockValue': me.headstockValue,
                      'affiliatedValue': me.affiliatedValue,
                      'isVehicle': me.isVehicle
                  }
                  localStorage.setItem('CARVALUE',JSON.stringify(CarData));
                } catch(e){};
            },
            financial () {          // 跳计算器页
                var me = this
                var o =  {
                    brandText : me.brandText,
                    headstock : me.PriceObj.headstock,
                    affiliated : me.PriceObj.affiliated,
                    Urlcode : me.Urlcode
                };
                financialDetail.financialValue = o;
                if(me.buttonPitch){
                    var insuranceData = localStorage.getItem('INSURANCEpriceDATA');
                    var insuranceObj = localStorage.getItem('IncidentalOBJ');
                    var insurance = localStorage.getItem('CalculatioN');
                    var subtabLoan = localStorage.getItem('SUBTABloan');
                    if(insuranceData){
                        localStorage.removeItem('INSURANCEpriceDATA');
                    }
                    if(insuranceObj){
                        localStorage.removeItem('IncidentalOBJ');
                    }
                    if(insurance){
                        localStorage.removeItem('CalculatioN');
                    }
                    if(subtabLoan){
                        localStorage.removeItem('SUBTABloan');
                    }
                    me.cacheData()
                    me.$router.push({ path: '/Detail', query: me.formValue})
                }
            }
        }
    }
</script>
<style scoped>
    .home{
        position: relative;
        overflow: hidden;
        padding-top:44px;
    }
</style>
