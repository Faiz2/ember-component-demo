import Component from '@ember/component';
import { computed } from '@ember/object';


/*
    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/
export default Component.extend({
	tagName: 'button',
	type: 'button',
	outline: false, // 空心还是实心 轮廓

	//Status
	status: 'primary',

	isDisabled: false,

	display_status: computed('status', 'outline', function () {
		let btnStyle = 'btn-';
		this.get('outline') ? btnStyle += 'outline-' : btnStyle += '';

		return `${btnStyle}${this.get('status')}`
	}),

	classNames: ['btn'],
	classNameBindings: ['display_status'],
	attributeBindings: ['type', 'isDisabled:disabled'],

	init() {
		this._super(...arguments);
	},
	didReceiveAttrs() {
		this._super(...arguments);
		window.console.info(this.get('text'))
		window.console.info('didReceiveAttrs 被触发了！！！');
	},
	didUpdateAttrs() {
		this._super(...arguments);
		window.console.info('属性改变时didUpdateAttrs 被触发了！！！');
	},
	actions: {

	}
});
