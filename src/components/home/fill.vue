<template>
	<ul class="info-list">
		<li>
			<span class="arrow" @click="brand" :style="[ brandText.length > 5 ? styleObject : '']">{{brandText}}</span>
			车型
		</li>
		<li>
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="7" @input="inputFun" v-model="headstock" />元</span>
<<<<<<< HEAD
			主车价格
		</li>
		<li v-show="isVehicle">
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="7" @input="inputFun" v-model="affiliated" />元</span>
			挂车价格
=======
			裸车车头价格
		</li>
		<li>
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="7" @input="inputFun" v-model="affiliated" />元</span>
			裸车挂车价格
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
		</li>
	</ul>
</template>

<script>
	export default {
<<<<<<< HEAD
		props: ['brandText','headstockValue','affiliatedValue','isVehicle'],
=======
		props: ['brandText','headstockValue','affiliatedValue'],
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
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
<<<<<<< HEAD
		watch :{
			affiliatedValue: {
		      handler: function (val, oldVal) {
				  this.affiliated = this.affiliatedValue
			  },
		      deep: true
		    }
		},
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
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
<<<<<<< HEAD
				if(this.isVehicle){
					this.affiliated = this.affiliated.replace(/[^\d]/g,'')
				}else{
					this.affiliated = ''
				}
=======
				this.affiliated = this.affiliated.replace(/[^\d]/g,'')

>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
				this.$emit('inputValue',{
		            headstock: me.headstock,
					affiliated: me.affiliated
		        });
			}
		}
	}
</script>
