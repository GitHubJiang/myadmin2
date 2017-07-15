<template>
	<div class="header-page padding-l-r-20">
		<div class="logo">
			后台管理系统
		</div>
		<div class="menu">
			<el-menu :default-active="defaultActive"  mode="horizontal" class="el-menu-demo">
				<template v-for="(item,index) in menuList">
					<el-menu-item v-if="!item.children||item.children.length==0" @click.native="changeMenu(item.id)" :index="item.href">{{item.title}}</el-menu-item>
					<el-submenu v-else :index="item.title">
				        <template slot="title"><i class="iconfont"></i>&nbsp;{{item.title}}</template>
			          	<el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="item2.href">{{item2.title}}</el-menu-item>
			      	</el-submenu>
				</template> 
		    </el-menu>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../../assets/scss/common/variable';
	.header-page {
		position: relative;
		z-index: 3;
		min-height: 60px;
		.el-submenu__title{
			color:$white;
			&+.el-menu>li{
				color:$gray;
			}
			&:hover{
				background-color: transparent;
			}
		}
		.menu .el-menu--horizontal>.el-menu-item:hover{
			background-color: transparent;
		}
		.el-menu--horizontal>.el-menu-item.is-active{
		    border-bottom: 5px solid $theme;
		}
	}
</style>
<style lang="scss" scoped>
	@import '../../assets/scss/common/variable';
	.header-page{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #393d49;
		.logo{
			color:$white;
		}
		.menu{
			&>.el-menu{
				background-color: transparent;
				&>li{
					color:$white;
				}
			}
		}
	}
</style>
<script>
	import { mapState } from 'vuex'
	import api_url from '../../config/url'
	export default{
		data() {
	      return {
	        defaultActive:'/',
			menuList:[]
	      };
	    },
	    created(){
	    	this.init();
	    	this.setActiveMenu();
	    },
	    methods: {
	    	init(){
				axios.get(api_url.top_menu,{params:{orgCode:'ORG_SYSTEM'}}).then((res)=>{
					this.menuList = res.data;
					this.changeMenu(res.data[0].id);
				});
			},
	      	handleSelect(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	setActiveMenu(){
				let _path_arr = location.hash.split('/'),
					_active_path = `/${_path_arr[1]}`;
				this.defaultActive = _active_path;
			},
			changeMenu(id){
				axios.get(api_url.top_menu,{params:{orgCode:'ORG_SYSTEM',pid:id}}).then((res)=>{
					// this.menuList = res.data;
					let _url;
					console.log(res)
					if(res.data[0]){
						if(res.data[0].children&&res.data[0].children.length>0){
							_url = res.data[0].children[0].href;
						}else{
							_url = res.data[0].href;
						}
					}
					console.log(_url)
					location.href='#'+_url;
					this.$store.commit('setLeftMenu',res.data)
				});
			}
	    },
	    watch:{
	    	$route:function(val){
	    		if(val.name=='home'){
	    			this.defaultActive = '/';
	    		}
	    	}
	    }
	}
</script>