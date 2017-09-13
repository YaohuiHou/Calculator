<template>
	<header class="pop-title">
		<span class="close" @click="close">关</span>
		<h3>{{titlePop}}</h3>
		<span class="back" v-show="superior" @click="backParent">返回上级</span>
	</header>
</template>

<script>
	export default {
		props: ['titlePop','superior','backid'],
		data () {
			return {

			}
		},
		methods: {
			close (){
				this.$emit('headClose',{
					judge: false
				})
			},
			backParent () {
				this.$emit('backPar',{
                    judge: false
                })
			}
		}
	}
</script>
