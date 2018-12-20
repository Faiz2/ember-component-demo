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

		let margin = { top: 100, right: 20, bottom: 30, left: 30 };
		this.set('width', 600);
		this.set('height', 360);
		this.set('chartOption', {
			grid: {
				transform: `translate(30, 100)`
			},
			title: {
				transform: `translate(${this.get('width') / 2}, -${margin.top / 2})`,
				'text-anchor': 'middle',
				'font-weight': 600
			},
			xScale: {
				transform: `translate(0, ${this.get('height') - margin.top - margin.bottom})`,
				'font-weight': 'bold'
			},
			rect: {
				class: 'bar'
			},
			rectText: {
				class: 'barText',
				'text-anchor': 'middle',
				dy: 20
			}
		});
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
