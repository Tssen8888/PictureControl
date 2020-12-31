<template>
	<div>
		<div>
			<h1>注册</h1>
		</div>
		<div>
			<input placeholder="请输入用户名" type="text" v-model="userName" />
		</div>
		<div>
			<input placeholder="请输入密码" type="password" v-model="password" />
		</div>
		<div>
			<button @click="toRegister">注册</button>
		</div>
	</div>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				userName: "",
				password: ""
			}
		},
		created() {
			_this = this;
		},
		methods: {
			toRegister() {
				let param = {
					userName: _this.userName,
					password: _this.password
				}
				_this.$axios.get(_this.$PJS.url + "/login/addUser", {
					params: param
				}).then(data => {
					alert(data.data.content);
					if (data.data.type == "success") {
						_this.$router.push({
							path: '/home1.html'
						});
					}
					return;
				}).catch(err => {
					alert("注册失败");
				});
			}
		}
	}
</script>

<style>

</style>
