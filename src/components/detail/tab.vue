<template>
	<div class="tab">
		<ul class="maintab clearfix">
			<li :class="[ !subtabShow ? 'active':'']" @click="subtabFun">全款买车</li>
			<li :class="[ subtabShow ? 'active buy':'buy']" @click="subtabFun">贷款买车</li>
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
			}
		},
		created () {
		},
		methods: {
			subtabFun () {
				var me = this;
				me.subtabShow = !me.subtabShow
				this.$emit('subtabLoan',{
		            judge: me.subtabShow,
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
