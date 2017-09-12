 <template>
    <div class="insurance-vue">
        <titleBar :titleText="titleText"></titleBar>
        <div class="insurance">
            <div class="panel">
    			<ul ref="list">
                    <li v-for="(item, index) in insuranceObj">
                        <var @click="safeFun(index)">
                            <span :class="[ item.safe ? 'check active':'check']"></span>
                            {{item.name}}
                        </var>
                        <div class="price-box" @click="priceFunction(index)">
                            <i v-if="!item.icon" class="yuan">元</i>
                            <i v-else class="ico"></i>
                            <span v-if="!item.input" class="price">{{parseInt(item.price)}}</span>
                            <input v-else type="tel" class="input-price" placeholder="请输入价格" v-model="item.price" maxlength="8" @input="priceFun(index)"/>
                            <em v-show="item.needNum != 0">{{item.needNum}}</em>
                        </div>
                    </li>
    			</ul>
    		</div>
        </div>
        <footer>
    		<span class="month-payment"><span class="price">{{ priceNum }}<i>元</i></span></span>
    		保险
    	</footer>

        <!-- 弹层 -->
		<div class="popups" v-show="popupsShow">
			<!-- 遮罩层 -->
			<div class="mask" @click="popupsFun"></div>
			<!-- 弹层内容 -->
			<div class="popcontainer">
                <headerPop :titlePop="titlePop" :superior="superior" v-on:headClose="popupsFun" v-on:backPar="backSuperior"></headerPop>
                <vechilePop :vechile="vechile" :vechileList="vechileList" v-on:vechileOption="vechileFun"></vechilePop>
                <therePop :there="there" :thereList="thereList" v-on:thereOption="thereFun"></therePop>
                <accidentPop :accident="accident" :accidentList="accidentList" v-on:accidentOption="accidentFun"></accidentPop>
                <glassPop :glass="glass" :glassList="glassList" v-on:glassOption="glassFun"></glassPop>
                <stolenPop :stolen="stolen" :stolenList="stolenList" v-on:stolenOption="stolenFun"></stolenPop>
                <StrongPop :Strong="Strong" v-on:StrongOption="StrongFun"></StrongPop>
			</div>
		</div>
    </div>
</template>


<script>
    import utils from "../utils"
    import { financialDetail } from '../financial.js'
    import titleBar from "../components/title-bar/title-bar"
    import vechilePop from "../components/popups/vehicle"
    import headerPop from "../components/popups/header"
    import therePop from "../components/popups/there"
    import glassPop from "../components/popups/glass"
    import accidentPop from "../components/popups/accident"
    import stolenPop from "../components/popups/stolen"
    import StrongPop from "../components/popups/Strong"
    export default {
        components: {
            titleBar,
            vechilePop,
            headerPop,
            therePop,
            glassPop,
            accidentPop,
            stolenPop,
            StrongPop
        },
        data () {
            return {
                titleText: '保险',        // title
                insuranceObj: [
                    {
                        safe: true,
                        name: "交强险",
                        icon: true,
                        needNum: 0,
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "第三者责任险",
                        icon: true,
                        needNum: '',
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "车辆损失险",
                        icon: false,
                        needNum: 0,
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "全车抢盗险",
                        icon: true,
                        needNum: 0,
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "玻璃破碎险",
                        icon: true,
                        needNum: '',
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "自然损失险",
                        icon: false,
                        needNum: 0,
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "不计免赔特约险",
                        icon: false,
                        needNum: 0,
                        input: false,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "无故责任险",
                        icon: false,
                        needNum: 0,
                        input: false,
                        price: 100
                    },
                    {
                        safe: true,
                        name: "车上人员责任险",
                        icon: false,
                        needNum: 0,
                        input: true,
                        price: 0,
                        id: ''
                    },
                    {
                        safe: true,
                        name: "人身意外险",
                        icon: true,
                        needNum: "赔付10万",
                        input: false,
                        price: 0,
                        id: ''
                    }
                ],
                priceNum: 0,
                safeWgz: 0,
                titlePop: '',               // 弹出层title
                superior: false,            // 弹窗层返回上级按钮
                vechile: false,             // 车型
                vechileList: {},
                popupsShow: false,
                there: false,               // 第三者责任险
                thereList: {},
                Urlcode:'',
                glass: false,               // 玻璃种类
                glassList: {},
                glassPrice: 0,              // 玻璃价格
                accidentShow: false,
                accident: true,             // 人身意外险
                accidentList: {},
                stolen: false,              // 抢盗险
                stolenList: {},
                Strong: false,              // 强险
            }
        },
        created () {
            var me = this
            // 读取缓存
            var insuranceData = localStorage.getItem('INSURANCEpriceDATA');
            var insuranceList = localStorage.getItem('CalculatioN');
            if(insuranceList){
                insuranceList = JSON.parse( insuranceList );
                me.insuranceObj = insuranceList
            }
            if(insuranceData){
                var forInIndex = 0;
                insuranceData = JSON.parse( insuranceData );
                for (var key in insuranceData) {
                    me.insuranceObj[forInIndex].price = parseInt(insuranceData[key])
                    forInIndex++
                }
            }

            // 获取 Urlcode
            var carData = localStorage.getItem('CARVALUE');
            if(carData){
                carData = me.carDataLocal = JSON.parse( carData );
                me.Urlcode = carData.Urlcode
                me.glassPrice = carData.headstockValue
                me.brandText = carData.brandText
                me.affiliatedValue = carData.affiliatedValue
                me.incidentalPrice = carData.everData.incidentalPrice
                if(!carData.Urlcode){
                    utils.getUrlcode(function(res){
                        if( res.status == 200){
                            var data = res.data;
                            if(data.state == 1){
                                me.Urlcode = data.body
                            }
                        }
                    })
                }
            }

            // 吸低总数计算
            this.Calculation(me.insuranceObj);
        },
        methods: {
            safeFun (i) {            // 点击事件
                var me = this
                this.insuranceObj[i].safe = !this.insuranceObj[i].safe
                if( this.insuranceObj[i].safe ){
                    this.priceNum += parseInt(this.insuranceObj[i].price)
                }else{
                    this.priceNum -= parseInt(this.insuranceObj[i].price)
                }
                // 存入缓存
                me.insuranceLocalStorage()
            },
            insuranceLocalStorage(){        // 存入缓存
                var me = this
                var insurance = localStorage.getItem('CalculatioN');
                if(insurance) localStorage.removeItem('CalculatioN');
                try {
                  var obj = me.insuranceObj
                  localStorage.setItem('CalculatioN',JSON.stringify(obj));
                } catch(e){};
            },
            priceFunction (i) {           // 弹窗
                var o = {},
                    me = this;
                switch (i) {
                    case 0:
                        me.popupsShow = true
                        me.titlePop = '交强险';
                        me.Strong = true;
                        break;
                    case 1:
                        me.popupsShow = true
                        me.titlePop = '赔偿金额';
                        me.there = true;
                        utils.getThereData(function(res){
                            if( res.status == 200){
                                var data = res.data;
                                if(data.state == 1){
                                    me.thereList = data
                                }
                            }
                        },{'urlcode':me.Urlcode})
                        break;
                    case 3:
                        me.popupsShow = true
                        me.titlePop = '全车抢盗险';
                        me.stolen = true;
                        if (me.stolenList.length >= 0) return;
                        utils.getStolenData(function(res){
                            if( res.status == 200){
                                var data = res.data;
                                if(data.state == 1){
                                    me.stolenList = data
                                }
                            }
                        },{'urlcode':me.Urlcode})
                        break;
                    case 4:
                        me.popupsShow = true
                        me.titlePop = '玻璃种类';
                        me.glass = true;
                        if (me.glassList.length >= 0) return;
                        utils.getGlassData(function(res){
                            if( res.status == 200){
                                var data = res.data;
                                if(data.state == 1){
                                    me.glassList = data
                                }
                            }
                        },{'urlcode':me.Urlcode})
                        break;
                    case 9:
                        me.popupsShow = true
                        me.titlePop = '人生意外险';
                        me.accident = true;
                        if (me.accidentList.length >= 0) return;
                        utils.getAccidentData(function(res){
                            if( res.status == 200){
                                var data = res.data;
                                if(data.state == 1){
                                    me.accidentList = data
                                }
                            }
                        },{'urlcode':me.Urlcode})
                        break;
                }
            },
            Calculation (o){        // 计算
                var me = this
                this.priceNum = 0;
                for (var key in o) {
                    if( o[key].safe ){      // 选中的进行计算
                        me.priceNum += parseInt(o[key].price == '' ? 0 : o[key].price)
                    }
                }

                //
                var carData = localStorage.getItem('CARVALUE');
                try {
                  var CarData = {
                      'brandText': me.brandText,
                      'headstockValue': me.glassPrice,
                      'affiliatedValue': me.affiliatedValue,
                      'Urlcode' : me.urlcode,
                      'everData':{
                          'isv': me.insuranceObj[0].id,
                          'safe_chrz': me.insuranceObj[8].price,       // 车上人员责任险金额
                          'incidental': me.incidentalPrice,     // 杂费
                          'safe_dsz': me.insuranceObj[1].id,       // 第三者责任险主键id
                          'safe_dqx': me.insuranceObj[3].id,       // 盗抢险主键id
                          'safe_blp': me.insuranceObj[4].id,       // 玻璃破碎险主键id
                          'safe_ryw': me.insuranceObj[9].id,       // 人身意外险主键id
                      },
                      'insurancePrice': me.priceNum
                  }
                  localStorage.setItem('CARVALUE',JSON.stringify(CarData));
                } catch(e){};


                // 存入列表 ’insuranceObj‘ 的缓存
                me.insuranceLocalStorage()
            },
            priceFun (i) {   // 总数价格计算
                var me = this
                // 只允许数字
				this.insuranceObj[i].price = this.insuranceObj[i].price.replace(/[^\d]/g,'')

                this.insuranceObj[i].safe = true

                me.Calculation(me.insuranceObj)

                // 存入缓存
                me.insuranceLocalStorage()
            },
            popupsFun (o) {       // 关闭弹出层
                this.popupsShow = false;
                this.there = false;
                this.accident = false;
                this.glass = false;
                this.stolen = false
                this.Strong = false
            },
            thereFun (o){         // 第三责任
                this.popupsShow = o.judge;
                this.there = o.judge;

                this.insuranceObj[1].needNum = o.coverage
                this.insuranceObj[1].price = o.premium
                this.insuranceObj[1].id = o.id
                this.insuranceObj[1].safe = true
                // 无故责任险 = 第三责任险*20%
                this.insuranceObj[7].price = parseInt(o.premium * 0.2)
                // 【不计免赔险】=(车辆损失险+第三者责任险)×15%
                this.insuranceObj[6].price = parseInt( ( parseInt(o.premium) + parseInt(this.insuranceObj[2].price) ) * 0.15 )

                // jisuan
                this.Calculation(this.insuranceObj)
            },
            accidentFun (o) {     // 人身意外险
                this.popupsShow = o.judge;
                this.accident = o.judge;

                this.insuranceObj[9].needNum = o.coverage
                this.insuranceObj[9].price = o.premium
                this.insuranceObj[9].id = o.id
                this.insuranceObj[9].safe = true

                this.Calculation(this.insuranceObj)
            },
            stolenFun (o){         // 抢盗 险
                this.popupsShow = o.judge;
                this.stolen = o.judge;

                this.insuranceObj[3].needNum = o.coverage
                this.insuranceObj[3].price = o.premium
                this.insuranceObj[3].id = o.id
                this.insuranceObj[3].safe = true

                this.Calculation(this.insuranceObj)
            },
            StrongFun (o) {      // 强险 运营
                this.popupsShow = o.judge;
                this.Strong = o.judge;

                this.insuranceObj[0].safe = true
                this.insuranceObj[0].id = o.id

                this.Calculation(this.insuranceObj)
            },
            glassFun (o) {       // 玻璃种类
                var me = this
                this.popupsShow = o.judge;
                this.glass = o.judge;

                this.insuranceObj[4].needNum = o.des
                this.insuranceObj[4].id = o.id
                var num = 0
                if(o.lct <= 0.0019 ){
                    num = 0.003
                }else{
                    num = 0.0019
                }
                this.insuranceObj[4].price = parseInt(this.insuranceObj[4].price/num * o.lct)
                this.insuranceObj[4].safe = true

                this.Calculation(this.insuranceObj)
            },
            backSuperior (o) {      //返回上一级
                var me = this;
            },
            vechileFun (o) {         // 车型
                this.brandText = o.name
                this.popupsShow = o.judge
                // id
                this.formValue.productid = o.id
            }
        }
    }
</script>

<style lang="less" scoped>
    .insurance-vue{
        padding-top: 44px;
        padding-bottom: 56px;
    }
</style>
