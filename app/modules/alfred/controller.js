import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	alfred_controller: service(),
	init() {
		this._super(...arguments);
	},
	actions: {

	}
});
