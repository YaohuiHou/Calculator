<template>
	<ul class="info-list">
		<li>
			<span class="arrow" @click="brand" :style="[ brandText.length > 5 ? styleObject : '']">{{brandText}}</span>
			车型
		</li>
		<li>
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="8" @input="inputFun" v-model="headstock" />元</span>
			裸车车头价格
		</li>
		<li>
			<span class="input-txt"><input type="tel" placeholder="请输入" maxlength="8" @input="inputFun" v-model="affiliated" />元</span>
			裸车挂车价格
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['brandText','headstockValue','affiliatedValue'],
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
				this.affiliated = this.affiliated.replace(/[^\d]/g,'')

				this.$emit('inputValue',{
		            headstock: me.headstock,
					affiliated: me.affiliated
		        });
			}
		}
	}
</script>
