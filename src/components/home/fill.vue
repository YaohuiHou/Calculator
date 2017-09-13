<template>
	<ul class="info-list">
		<li>
			<span class="arrow" @click="brand" :style="[ brandText.length > 5 ? styleObject : '']">{{brandText}}</span>
			车型
		</li>
		<li>
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="7" @input="inputFun" v-model="headstock" />元</span>
			主车价格
		</li>
		<li v-show="isVehicle">
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="7" @input="inputFun" v-model="affiliated" />元</span>
			挂车价格
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['brandText','headstockValue','affiliatedValue','isVehicle'],
		data () {
			return {
				styleObject: {
					color: "#17181A"
				}
				,
				headstock:'',
				affiliated:''
			}
		},
		watch :{
			affiliatedValue: {
		      handler: function (val, oldVal) {
				  this.affiliated = this.affiliatedValue
			  },
		      deep: true
		    }
		},
		created () {
			this.headstock = this.headstockValue
			this.affiliated = this.affiliatedValue
		},
		methods: {
			brand () { 		// 调取弹窗
				this.$emit('brand',{
		            judge: true,
		        });
			},
			inputFun (){ 	// 输入
				var me = this;
				// 只允许数字
				this.headstock = this.headstock.replace(/[^\d]/g,'')
				if(this.isVehicle){
					this.affiliated = this.affiliated.replace(/[^\d]/g,'')
				}else{
					this.affiliated = ''
				}
				this.$emit('inputValue',{
		            headstock: me.headstock,
					affiliated: me.affiliated
		        });
			}
		}
	}
</script>
