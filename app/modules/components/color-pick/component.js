import Component from '@ember/component';
import { A } from '@ember/array';

/*
    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/
export default Component.extend({
	isShowingPopup: false,
	colors: A(['red', 'green', 'blue', 'orange', 'yellow', 'purple']),
	init() {
		this._super(...arguments);
	},
	click() {
		this.toggleProperty('isShowingPopup')
	}
});
