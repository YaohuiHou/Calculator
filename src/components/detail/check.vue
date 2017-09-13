<template>
	<div class="check-box clearfix">
		<ul class="clearfix">
			<li :class="[ subtabArr[0].class ? 'active':'']" @click="subtabFun(0)"><span class="check"></span>等额本息</li>
			<li :class="[ subtabArr[1].class ? 'active':'']" @click="subtabFun(1)"><span class="check"></span>等额本金</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				subtabShow: false,
				subtabArr:[
					{
						class: true
					},
					{
						class: false
					}
				]
			}
		},
		created () {
		},
		methods: {
			subtabFun (i) {
				var me = this;
				this.subtabArr.forEach(function(e){
					e.class = false
				});
				this.subtabArr[i].class = true
				// me.subtabShow = !me.subtabShow
				this.$emit('checkValue',{
		            id: i,
		        });
			}
		}
	}
</script>
