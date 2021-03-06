import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	login_controller: service(),
	init() {
		this._super(...arguments);
	},
	login() {
		this.send('sendRequest')
	},
	actions: {
	}
});
