import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
	alfred_route: service(),
	alfred_controller: service(),
	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {
		// 你的逻辑
	},
	actions: {
		// 你的动作
	}
});
