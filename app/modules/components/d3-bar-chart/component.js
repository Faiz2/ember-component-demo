import Component from '@ember/component';
import ChartInitial from './d3ChartInitial';

import { run } from '@ember/runloop';

/*
    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/
export default Component.extend(ChartInitial, {
	// tagName: 'svg',

	width: 1024,
	height: 768,
	bgColor: '#000',

	// attributeBindings: ['width', 'height'],

	init() {
		this._super(...arguments);
		this.data = [];
	},

	didReceiveAttrs() {
		this._super(...arguments);
		// let option = {
		// 	bgColor: this.get('bgColor'),
		// 	width: this.get('width'),
		// 	height: this.get('height')
		// }
		run.scheduleOnce('render', this, this.initChart, this.elementId);
		run.scheduleOnce('render', this, this.setWidth, 1024);
		run.scheduleOnce('render', this, this.setHeight, 768);
	},

	actions: {

	}
});
