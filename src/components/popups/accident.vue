<template>
	<div class="globle-pop" v-show="accident">
        <div class="series-list">
            <ul>
    			<!-- active 选中状态 -->
    			<li v-for="(value , key ) in accidentList.body" :class="[ activeIndex == value.id ? 'active' :'' ]" @click="vechileSelect(value)" >{{value.coverage}}</li>
    		</ul>
        </div>
	</div>
</template>

<script>
	export default {
		props: {
			accidentList: {
    			type: Object,
    			required: true
    		},
			accident: {
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
				this.$emit('accidentOption',{
					judge: false,
					coverage: coverage,
					id: item.id,
                    premium: item.premium
				})
			}
		}
	}
</script>
