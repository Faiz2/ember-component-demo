import Controller from '@ember/controller';

export default Controller.extend({
	init() {
		this._super(...arguments);
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

	}
});
