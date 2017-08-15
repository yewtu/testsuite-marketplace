module.exports = {
	apps: [
		{
			name: "service-b2b-marketplace",
			script: "../service-b2b-marketplace/index.js",
			cwd: "../service-b2b-marketplace",
			watch: true,
			node_args: ["--harmony"],
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development"
			}
		},
		{
			name: "app-cow-publisher",
			script: "../app-cow-publisher/dist/server/index.js",
			cwd: "../app-cow-publisher",
			watch: true,
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development"
			}
		},
		{
			name: "app-b2b-marketplace",
			script: "../app-b2b-marketplace/dist/server/index.js",
			watch: true,
			cwd: "../app-b2b-marketplace",
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development"
			}
		},
		{
			name: "service-b2c-store",
			script: "../service-b2c-store/index.js",
			cwd: "../service-b2c-store",
			watch: true,
			node_args: ["--harmony"],
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development",
				"STRIPE_API_KEY": "sk_test_uWKuYyQbCdyXXiR5G94v9Ogf"
			}
		},
		{
			name: "app-b2c-store",
			script: "../app-b2c-store/dist/server/index.js",
			cwd: "../app-b2c-store",
			watch: true,
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development"
			}
		},
		{
			name: "app-b2c-shopfront",
			script: "../app-b2c-shopfront/dist/server/index.js",
			cwd: "../app-b2c-shopfront",
			watch: true,
			env: {
				"SERVICE_ENV": "test",
				"NODE_ENV": "development"
			}
		}
	]
};
