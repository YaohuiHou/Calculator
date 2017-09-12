<template>
	<div class="globle-pop" v-show="Strong">
        <div class="series-list">
            <ul>
    			<!-- active 选中状态 -->
    			<li v-for="(value , key ) in StrongList" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.name}}</li>
    		</ul>
        </div>
	</div>
</template>

<script>
	export default {
		props: {
			Strong: {
                type: Boolean
            }
		},
		data () {
            return {
                activeIndex: '',
                StrongList: [
                    {
                        "id": 0,
                        "name": '非营运'
                    },
                    {
                        "id": 1,
                        "name": '营运'
                    }
                ]
            }
        },
        created () {
        },
		methods :{
			vechileSelect (item) {
				var me = this
				this.activeIndex = item.id
				this.$emit('StrongOption',{
					judge: false,
					id: item.id,
                    name: item.name
				})
			}
		}
	}
</script>
