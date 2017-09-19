<template>
	<div class="process">
		<ul>
			<li class="bar-row row1">首付比例
				<span class="bar-wrap">
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-start" v-bind:style="{ width: loanratio + '%' }"></i>
					<input type="range" v-model="loanratio" class="range" max="100" @input="rangeFun(0)" step="16.66"/>
				</span>
				<span class="prices">{{ratioArr[ratioIndex]}}</span>
			</li>
			<li class="bar-row row2">贷款年限
				<span class="bar-wrap">
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-stop"></i>
					<i class="bar-start" v-bind:style="{ width: loanmonths + '%' }"></i>
					<input type="range" v-model="loanmonths" class="range" max="100" @input="rangeFun(1)" step="20"/>
				</span>
				<span class="prices">{{monthsArr[monthsIndex]}}月</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
<<<<<<< HEAD
		props: ['loanratioProp','loanmonthsProp'],
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
		data () {
			return {
				loanratio: 50.1,
				loanmonths: 100,
				ratioArr: [ '0%', '10%', '20%', '30%', '40%','50%','60%'],
				ratioNumArr: [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
				monthsArr: ['6','12','18','24','30','36'],
				ratioIndex: 3,
				monthsIndex: 5
			}
		},
<<<<<<< HEAD
		created () {
			var me = this
			this.loanratio = this.loanratioProp
			this.loanmonths = this.loanmonthsProp
			me.ratioIndex = parseInt(me.loanratio/16.6)
			me.monthsIndex = parseInt(me.loanmonths/20)
		},
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
		methods: {
			rangeFun (i) { 		// 拖动
				var me = this
				switch (i) {
					case 0:
						// 首付比例
						me.ratioIndex = parseInt(me.loanratio/16.6)
						break;
					default:
						// 还款时间
						me.monthsIndex = parseInt(me.loanmonths/20)
				}
				this.$emit('loanObjeact',{
					ratio: me.ratioNumArr[me.ratioIndex],
		            months: me.monthsArr[me.monthsIndex],
<<<<<<< HEAD
					loanratio: me.loanratio,
					loanmonths: me.loanmonths
=======
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
		        });
			}
		}
	}
</script>
