<template>
	<div class="tab">
		<ul class="maintab clearfix">
			<li :class="[ subtabArr[0].class ? 'active':'']" @click="subtabFun(0)">全款买车</li>
			<li :class="[ subtabArr[1].class ? 'active buy':'buy']" @click="subtabFun(1)">贷款买车</li>
		</ul>
		<div class="total">
			<span class="info">全款总价（以实际到店为准）</span>
			<span :class="[subtabShow ? 'price add-height':'price']">{{ fullPayment }}<i>元</i></span>
			<div class="subtab" v-show="subtabShow">
				<ul>
					<li class="">
						<span class="name">贷款金额</span>
						<span class="sub-price">{{loansPayment}}</span>
					</li>
					<li v-if="!loantype">
						<span class="name">月供金额</span>
						<span class="sub-price">{{loansMonthPayment}}</span>
					</li>
					<li v-if="loantype" class="tab-center" @click="Schedule"><span>还款计划表</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['fullPayment','loansPayment','loantype','subtabShow','loansMonthPayment'],
		data () {
			return {
				subtabArr:[
					{
						name: '全款买车',
						class: true
					},
					{
						name: '贷款买车',
						class: false
					}
				]
			}
		},
		created () {
			this.subtabArr[0].class = !this.subtabShow
			this.subtabArr[1].class = this.subtabShow
		},
		methods: {
			subtabFun (i) {
				var me = this;
				this.subtabArr.forEach(function(e){
					e.class = false
				});
				this.subtabArr[i].class = true
				// me.subtabShow = !me.subtabShow
				this.$emit('subtabLoan',{
		            judge: i,
		        });
			},
			Schedule () {
				this.$emit('equalShow',{
		            judge: true,
		        });
			}
		}
	}
</script>
