<template>
	<header class="title-bar">
		<a href="javascript:history.back();" class="back"></a>
		<h3>{{titleText}}</h3>
	</header>
</template>

<script>
	export default {
		props: ['titleText']
	}
</script>
