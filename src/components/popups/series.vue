<template>
    <div class="globle-pop" v-show="series">
        <div class="series-list" v-for="item in seriesList.data">
            <header>{{item.subName}}</header>
            <ul>
                <li :class="[ (activeId == n.sId + n.subCateId) ? 'active' : '']" :ref="(n.sId+n.subCateId)" @click="seriesSelected(n.sId,n.subCateId)" v-for="n in item.list">{{n.name}}</li>
            </ul>
        </div>
        <div :class="[ (seriesList.data && seriesList.data.length) <= 0 ? 'nothing visible' : 'nothing']">
            暂无数据哦~
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seriesList: {
    			type: Object,
    			required: true
    		},
            series: {
                type: Boolean
            }
        },
        data () {
            return {
                activeId: '',
                serieShowView: true
            }
        },
        created () {
            
        },
        methods: {
            seriesSelected (sId,subCateId) {        // 车系参数
                this.activeId = sId + subCateId
                this.$emit('seriesId',{
                    judge: false,
                    sId: sId,
                    subCateId: subCateId
                })
            }
        }
    }
</script>

<style scrope>
    .nothing{
        display: none;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        color: #999;
        margin: 60px auto 0;;
    }
    .visible{
        display: block;
    }
</style>
