import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	application_controller: service(),
	init() {
		this._super(...arguments);
		this.set('outline', true);
		this.set('text', '我是默认');

		this.set('isDisabled', false);

		this.set('status', 'primary')
	},
	actions: {
		myClick() {
			alert('点击了！');
		},
		changeText() {
			this.set('text', '现在的时间是：'+new Date());
		},
		changeDanger() {
			this.set('status', 'danger')
		},
		changeWarning() {
			this.set('status', 'warning')
		},
		changeSuccess() {
			this.set('status', 'success')
		},
		changeOutLine() {
			this.toggleProperty('outline');
		},
		changeEnabled() {
			this.toggleProperty('isDisabled');
		}
	}
});
