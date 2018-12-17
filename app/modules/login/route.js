import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default Route.extend({
	login_route: service(),
	login_controller: service(),
	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {
		// 你的逻辑
	},
	actions: {
		// 你的动作
		sendRequest(account, pwd) {
			let request = this.get('login_route').object2JsonApi(
				this.get('login_controller').createModel('request', {
					id: this.get('hash').uuid(),
					res: 'account',
					eqcond: new A([
						this.get('login_controller').createModel('eqcond', {
							id: this.get('hash').uuid(),
							key: 'account',
							val: account
						}),
						this.get('login_controller').createModel('eqcond', {
							id: this.get('hash').uuid(),
							key: 'pwd',
							val: pwd
						})
					])
				})
			);

			this.get('login_route').queryObject('v1/login', 'Auth', request)
				.then(result => {
					this.get('cookie').write('token', result.get('token'), { path: '/' })
				}).catch(error => {
					this.get('logger').error(error);
				})
		}
	}
});
