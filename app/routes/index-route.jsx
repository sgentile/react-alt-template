import App from 'components/App';
//import AuthActions from 'actions/AuthActions';
//import AuthStore from 'stores/AuthStore';

module.exports = {
	path: '/',
	component: App,
	getIndexRoute(location, callback) {
		require.ensure([], function (require) {
			// if (!AuthStore.getState().isAuth) {
			// 	callback(null, {
			// 		components: {
			// 			content: require('components/Login.jsx'),
			// 			sidebar: null
			// 		},
			// 		onEnter: (next, replace) => AuthActions.setPageTitle.defer()}
			// 	);
			// } else {
				callback(null, {
					components: {
						content: require('components/main/Main')
					},
					onEnter: (next, replace) =>
						require('actions/MainActions').getInitializedData()
				});

			//}
		})
	},
	getChildRoutes(location, callback) {
		require.ensure([], (require) => {
			callback(null, require('./main-route.jsx'))
		})
	}
};
