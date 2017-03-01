<template>
    <div class="section"></div>
</template>

<script>
	export default {
		name: 'ListSection',
		data (){
			return {
				modules: {},
				words: [],
			}
		}
	}
</script>
<style lang="sass" scoped>
    .section{
        width:1000px;
        border-left:1px solid #ccc;
    }
</style>