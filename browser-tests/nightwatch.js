module.exports = {
	"src_folders": [
		"./browser-tests/tests"
	],
	"custom_commands_path": "./browser-tests/commands",
	"custom_assertions_path": "",
	"page_objects_path": "",
	"output_folder": "./browser-tests/output",
	"globals_path": "./browser-tests/helpers/external-globals.js",
	"selenium": {
		"start_process": false
	},
	"test_settings": {
		"local": {
			"selenium_port": 9515,
			"selenium_host": "127.0.0.1",
			"default_path_prefix": "",
			"desiredCapabilities": {
				"browserName": "chrome"
			},
			"launch_url": "http://localhost:3005/publish?test=1",
			"globals": {
				"url_publish": "http://localhost:3005/publish?test=1",
				"url_delete_test_cuts": "http://test:pw@localhost:3007/api/delete-test-cuts",
				"url_marketplace": "http://localhost:3006/marketplace"
			}
		},
		"default": {
			"selenium_host": "ondemand.saucelabs.com",
			"silent": true,
			"username": process.env.SAUCE_USERNAME,
			"access_key": process.env.SAUCE_ACCESS_KEY,
			"selenium_port": 80,
			"launch_url": "http://ondemand.saucelabs.com:80",
			"globals": {
				"url_publish": "https://app-cow-publisher-staging.herokuapp.com/publish",
				"url_delete_test_cuts": "https://test:pw@service-b2b-market-staging.herokuapp.com/api/delete-test-cuts",
				"url_marketplace": "https://app-b2b-marketplace-staging.herokuapp.com/marketplace"
			},
			"desiredCapabilities": {
				"build": `build-${process.env.TRAVIS_JOB_NUMBER}`,
				"tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
			}
		},
		chrome: {
			desiredCapabilities: {
				browserName: "chrome",
				platform: "OS X 10.11",
				version: "47"
			}
		}
	}
};
