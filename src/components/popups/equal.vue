<!-- 等额本金 -->
<template>
	<div class="tablecontainer globle-pop">
		<table>
			<thead>
				<tr>
					<th>期数</th>
					<th>还款本金(元)</th>
					<th>还款利息(元)</th>
				</tr>
			</thead>
		</table>
		<div class="scroll">
			<table>
				<tbody>
					<tr v-for="item in equalList">
						<td>{{item.num}}期</td>
						<td>{{parseInt(item.principal)}}</td>
						<td>{{parseInt(item.interest)}}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>合计</td>
						<td>{{principalTotal}}</td>
						<td>{{interestTotal}}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</template>

<script>
    export default {
        props: ['equalList','interestTotal','principalTotal'],
        data () {
            return {
            }
        },
		mounted () {
		},
		methods : {

		}
    }
</script>
