<template>
    <div class="aside">
        <ul>
            <li><router-link to='/QuotationList'>报价管理</router-link></li>
            <li><router-link to='/OrderList'>订单管理</router-link></li>
            <li><router-link to='/FinanceList'>财务管理</router-link></li>
        </ul>
    </div>
</template>

<script>
	export default {
		name: 'ListMenu',
		data (){
			return {
				modules: {},
				words: [],
			}
		}
	}
</script>
<style lang="sass" scoped>
    *{
        margin:0;
        padding:0;
    }
	.aside{
        width:200px;
    }
    ul{
        list-style:none;
        margin-top:40px;
    }
    ul li{
        cursor:pointer;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        display:block;
        text-align:center;
        padding:10px 0;
    }
</style>