<template>
	<div class="check-box clearfix">
		<ul class="clearfix">
			<li :class="[ !subtabShow ? 'active':'']" @click="subtabFun(0)"><span class="check"></span>等额本息</li>
			<li :class="[ subtabShow ? 'active':'']" @click="subtabFun(1)"><span class="check"></span>等额本金</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				subtabShow: false
			}
		},
		created () {
		},
		methods: {
			subtabFun (i) {
				var me = this;
				me.subtabShow = !me.subtabShow
				this.$emit('checkValue',{
		            id: i,
		        });
			}
		}
	}
</script>
