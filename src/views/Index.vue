<template>
	<div class="container clearfix">
        <ListMenu class="menu"></ListMenu> 
        <div class="section">
            <h1>蜂巢互助后台管理系统</h1>
        </div>
    </div>	
</template>


<script>
    import ListMenu from '../components/ListMenu.vue' 
    import {mapGetters} from 'vuex'
	export default {
        components:{
            ListMenu
        },
    }
</script>
<style lang="sass" scoped>
    .clearfix:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden
    }
	.container{
        width:1303px;
        border:1px solid #ccc;
        margin:0 auto;
        .menu{
            float:left;
        }
        .section{
            width:1100px;
            float:left;
            height:600px;
            border-left:1px solid #ccc;
            h1{
                text-align:center;
                margin-top:150px;
            }
        }
    }
</style>