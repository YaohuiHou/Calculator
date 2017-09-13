<template>
	<!-- add-height 加高 -->
	<div :class="[subtabShow ? 'data add-height':'data']">
		<ul>
			<li><span class="data-name">裸车价：</span><span class="data-price">{{priceDataObject.carPrice}}元</span></li>
			<li><span class="data-name">税：</span><span class="data-price">{{priceDataObject.taxPrice}}元</span></li>
			<li><span class="data-name">杂费：</span><span class="data-price">{{priceDataObject.incidentalPrice}}元</span></li>
			<li><span class="data-name">保险：</span><span class="data-price">{{priceDataObject.insurancePrice}}元</span></li>
		</ul>
		<figure>
			<canvas id="myChart" width="140" height="140"></canvas>
			<!-- <DoughnutChart :chart-data="datacollection"></DoughnutChart> -->
		</figure>
	</div>
</template>

<script>
    import Charts from 'chart.js'
	// import DoughnutChart from '../../vueChart.js'
	export default {
		props: ['priceDataObject','subtabShow'],
		// components: {
		// 	DoughnutChart
	    // },
		data () {
			var me = this
			return {
				datacollection: null,
			}
		},
		watch :{
			priceDataObject: {
		      handler: function (val, oldVal) {
				  this.chartCanvas()
			  },
		      deep: true
		    }
		},
		mounted () {
			this.chartCanvas()
	    },
		methods: {
            chartCanvas () {
				var me = this;
                me.datacollection = Charts.Doughnut(document.getElementById('myChart').getContext("2d"),{
					data:{
						datasets: [
							{
							data: [
								me.priceDataObject.carPrice,
								me.priceDataObject.taxPrice,
								me.priceDataObject.incidentalPrice,
								me.priceDataObject.insurancePrice
							],
							backgroundColor: [
							  "#358BF7",
							  "#753AF7",
							  "#FFBC00",
							  "#04C3EA"
							],
							hoverBackgroundColor: [
								"#358BF7",
							    "#753AF7",
								  "#FFBC00",
							    "#04C3EA"
							],
							borderWidth: 0
							}
						]
					}
				})
            }
		}
	}
</script>
