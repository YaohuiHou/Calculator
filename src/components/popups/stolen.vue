<template>
	<div class="globle-pop" v-show="stolen">
        <div class="series-list">
            <ul>
    			<!-- active 选中状态 -->
    			<li v-for="(value , key ) in stolenList.body" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.coverage}}</li>
    		</ul>
        </div>
	</div>
</template>

<script>
	export default {
		props: {
			stolenList: {
    			type: Object,
    			required: true
    		},
			stolen: {
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
                var premium = 140+parseInt(item.coverage*0.0044)
				this.$emit('stolenOption',{
					judge: false,
					coverage: coverage,
					id: item.id,
                    premium: premium
				})
			}
		}
	}
</script>
