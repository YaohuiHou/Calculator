<template>
	<div class="insurance-view">
		<div class="charges">
			<ul>
				<li>杂费<i>元</i><span class="prices">{{incidentalPrice}}</span></li>
			</ul>
		</div>
		<div class="insurance">
			<div class="panel">
				<ul>
					<li v-for="(item, index) in insuranceObj">
                        <var @click="safeFun(index)">
                            <span :class="[ item.safe ? 'check active':'check']"></span>
                            {{item.name}}
                        </var>
                        <div class="price-box">
                            <i v-if="!item.icon" class="yuan">元</i>
                            <i v-else class="ico"></i>
                            <span v-if="!item.input" class="price">{{parseInt(item.price)}}</span>
                            <input v-else type="tel" class="input-price" placeholder="请输入价格" v-model="item.price" maxlength="8" @input="inputFun(index)"/>
                            <em v-show="item.needNum != 0">{{item.needNum}}</em>
                        </div>
                    </li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
            incidentalObject: {
    			type: Array,
    			required: true
    		},
			incidentalPrice: {
				type: Number
			}
    	},
		data () {
			var me = this;
			return {
				Anchored: '',
				Certificates: '',
				incidentalNum: 0,
				insuranceObj: [
                    {
                        safe: true,
                        name: "上牌费",
                        icon: false,
                        needNum: 0,
                        input: true,
                        price: me.incidentalPrice,
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
				]
			}
		},
		created () {
			var me = this
			var incidental = localStorage.getItem('IncidentalOBJ');
			if( incidental ){
				incidental = JSON.parse( incidental );
				me.insuranceObj = incidental
			}else{
				me.timer = setTimeout(function(){
					me.insuranceObj[0].price = me.incidentalPrice == undefined ? 500 : me.incidentalPrice
					clearTimeout(me.timer)
				},600)
			}
		},
		methods: {
			inputFun (i){ 	// 输入
				var me = this;
				// 只允许数字
				this.insuranceObj[i].price = this.insuranceObj[i].price.replace(/[^\d]/g,'')

				if(this.insuranceObj[i].price > 0){
					this.insuranceObj[i].safe = true
				}else{
					this.insuranceObj[i].safe = false
				}
				this.$emit('insuranceOptions',me.insuranceObj);
			},
			safeFun (i) {            // 点击事件
				var me = this;
                this.insuranceObj[i].safe = !this.insuranceObj[i].safe
				this.$emit('insuranceOptions',me.insuranceObj);
            },
		}
	}
</script>

<style scrope>
	.insurance-view{
		margin-top: 8px;
	}
</style>
