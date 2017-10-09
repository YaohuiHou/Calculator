<template>
	<header class="title-bar" v-if="titleShow">
		<a href="javascript:history.back();" class="back"></a>
		<h3>{{titleText}}</h3>
	</header>
</template>

<script>
	export default {
		props: ['titleText'],
		data () {
			return {
				titleShow : true
			}
		},
		created () {
			if(/360CHE/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent)){
				this.titleShow = false
				this.$emit('titleShow',{
					titleShow: false,
				});
			}
		}
	}
</script>
