module.exports = [{
		path: '/index.html',
		name: 'index',
		meta: {
			title: '首页',
			author: '--',
			parentRouter: '--'
		},
		component: () => import('../views/index.vue')
	},
	{
		path: '/home.html',
		name: 'home',
		meta: {
			title: 'home页',
			author: '--',
			parentRouter: '--'
		},
		component: () => import('../views/login.vue'),
		children: []
	},
	{
		path: '/order.html',
		name: 'order',
		meta: {
			title: '订单页',
			author: '--',
			parentRouter: '--'
		},
		component: () => import('../views/order.vue'),
		children: []
	},
	{
		path: '/home1.html',
		name: 'home1',
		meta: {
			title: '首页',
			author: '--',
			parentRouter: '--'
		},
		component: () => import('../views/home.vue'),
		children: []
	},
	{
		path: '/register.html',
		name: 'register',
		meta: {
			title: '注册',
			author: '--',
			parentRouter: '--'
		},
		component: () => import('../views/register.vue'),
		children: []
	}
];
