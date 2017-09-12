<template>
    <div class="brands globle-pop" ref="scroll" @scroll="scrollBrands">
        <ul class="brands-index">
            <!-- active 选中状态 -->
            <li v-for="(value, key, index) in brandList" :class="[activeIndex == index ? 'active' :'' ]" @click="activeIndexFun(index,key)">{{key}}</li>
        </ul>
        <div class="brands-list" v-for="(value, key, index) in brandList">
            <header :ref="key">{{key}}</header>
            <ul>
                <li @click="brandSelected(item.id)" v-for="item in value">
                    <figure>
                        <span><img :src="item.src"></span>
                        <figcaption>{{item.name}}</figcaption>
                    </figure>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            brandList: {
    			type: Object,
    			required: true
    		}
    	},
        data () {
            return {
                list : [],
                listActive: [],
                activeIndex: ''
            }
        },
        created () {

        },
        methods : {
            brandSelected (n) {      // 选中的品牌
                this.$emit('brandId',{
                    judge: false,
                    id: n
                })
            },
            activeIndexFun (i,k) {      // 字母导航
                this.activeIndex = i
                // 高
                this.$refs['scroll'].scrollTop = this.$refs[k][0].offsetTop;
            },
            scrollBrands () {           // 导航滚动跟随
                var me = this;
                for (var key in me.$refs) {
                    if( key != 'scroll' ){
                        if( me.list.indexOf(key) ){
                            me.list.push(key)
                        }
                        if( me.$refs['scroll'].scrollTop >= me.$refs[key][0].offsetTop){
                            me.activeIndex = me.list.indexOf(key)
                        }
                    }
                }

            }
        }
    }
</script>
