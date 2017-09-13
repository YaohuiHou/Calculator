<template>
	<div>
		<div class="charges">
			<ul>
				<li>税<i>元</i><span class="prices">{{taxPrice}}</span></li>
			</ul>
		</div>
		<ul class="info-list">
			<li>
				<span class="input-txt input1">{{parseInt(taxObject.tax_gzs)}}<i>元</i></span>
				购置税
			</li>
			<li>
				<!-- <span class="arrow">{{taxObject.tax_chc}}</span> -->
				<span class="input-txt input1">{{parseInt(taxObject.tax_chc)}}<i>元</i></span>
				车船使用税
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
            taxObject: {
    			type: Object,
    			required: true
    		},
			taxPrice: {
				type: Number
			}
    	},
		data () {
			return {
			}
		},
	}
</script>
<style scoped>
	.info-list li .input-txt.input1{
		float: right;
		font-size: 16px;
		color: #17181A;
		padding-right: 16px;
		height: 48px;
	}
	.info-list li .input-txt.input1 i{
		display: inline-block;
		font-size: 12px;
		color: #A1A9B3;
		margin-left:8px;
	}
</style>
