import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
	application_route: service(),
	application_controller: service(),

	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {
		// 你的逻辑
	},
	actions: {

	}
});
