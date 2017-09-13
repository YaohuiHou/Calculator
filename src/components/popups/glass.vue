<template>
	<div class="globle-pop" v-show="glass">
        <div class="series-list">
            <ul>
    			<!-- active 选中状态 -->
    			<li v-for="(value , key ) in glassList.body" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.des}}</li>
    		</ul>
        </div>
	</div>
</template>

<script>
	export default {
		props: {
			glassList: {
    			type: Object,
    			required: true
    		},
			glass: {
                type: Boolean
            }
		},
		data () {
            return {
                activeIndex: '',
            }
        },
        created () {
        },
		methods :{
			vechileSelect (item) {
				var me = this
				this.activeIndex = item.id
				this.$emit('glassOption',{
					judge: false,
					des: item.des,
					id: item.id,
                    lct: item.lct
				})
			}
		}
	}
</script>
