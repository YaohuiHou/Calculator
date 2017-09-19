<template>
	<div class="vechile globle-pop" v-show="vechile">
		<ul>
			<!-- active 选中状态 -->
			<li v-for="(value , key ) in vechileList.data" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			vechileList: {
    			type: Object,
    			required: true
    		},
			vechile: {
                type: Boolean
            }
		},
		data () {
            return {
                activeIndex: 3,
				a:122
            }
        },
		methods :{
			vechileSelect (item) {
				var me = this
				this.activeIndex = item.id
				this.$emit('vechileOption',{
					judge: false,
					name: item.name,
<<<<<<< HEAD
					id: item.id,
					isVehicle: item.isVehicle ? item.isVehicle : 0
=======
					id: item.id
>>>>>>> bf6277ede4002c3b9b837612565cb7baf188cf1b
				})
			}
		}
	}
</script>
