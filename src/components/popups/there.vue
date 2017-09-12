<template>
	<div class="globle-pop" v-show="there">
        <div class="series-list">
            <ul>
    			<!-- active 选中状态 -->
    			<li v-for="(value , key ) in thereList.body" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.coverage}}</li>
    		</ul>
        </div>
	</div>
</template>

<script>
	export default {
		props: {
			thereList: {
    			type: Object,
    			required: true
    		},
			there: {
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
                var coverage = parseInt(item.coverage/10000) + "万元"
				this.$emit('thereOption',{
					judge: false,
					coverage: coverage,
					id: item.id,
                    premium: item.premium
				})
			}
		}
	}
</script>
