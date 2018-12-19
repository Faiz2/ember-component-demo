import Mixin from '@ember/object/mixin';
import { select } from 'd3-selection';

const { keys } = Object;

export default Mixin.create({
	svgRoot: null,
	gridContainer: null,

	initChart(elementId) {
		window.console.info(keys)
		this.set('svgRoot', select(`#${elementId}`).append('svg'));
	},

	setGrid(option) {
		let gridInstance = this.get('svgRoot').append('g');
		keys(option).forEach(key => {
			gridInstance.attr(key, option[key]);
		});
		this.set('gridContainer', gridInstance);
	},

	setBackground(value) {
		this.get('svgRoot').style('background-color', value);
	},
	setWidth(value) {
		this.get('svgRoot').attr('width', value);
	},
	setHeight(value) {
		this.get('svgRoot').attr('height', value);
	},

	setData(dataSource) {

	}
});
