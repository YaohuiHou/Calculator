<template>
	<footer v-show="totalShow">
		<span class="month-payment">总成本<span class="price">{{totalPayment}}<i>元</i></span></span>
		<!-- 总成本<span class="total">{{totalPayment}}<i>元</i></span> -->
	</footer>
</template>

<script>
	export default {
		props: ['totalPayment','totalShow'],
	}
</script>
