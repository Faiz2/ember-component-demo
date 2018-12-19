import Mixin from '@ember/object/mixin';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';


const { keys } = Object;

const setAttr = function (instance, option) {
	keys(option).forEach(key => {
		instance.attr(key, option[key]);
	});
}

export default Mixin.create({
	svgRoot: null,
	gridContainer: null,
	mainChartWidth: 0,
	mainChartHight: 0,

	initChart(elementId) {
		this.set('svgRoot', select(`#${elementId}`).append('svg'));
	},

	setGrid(option = {}) {
		let gridInstance = this.get('svgRoot').append('g');

		setAttr(gridInstance, option);
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

	setTitle(value, option = {}) {
		let textInstance = this.get('gridContainer').append('text').text(value);

		setAttr(textInstance, option);
	},

	setSubTitle(value, option = {}) {

	},

	isShowMainChartTipText(chart, option) {
		let text = chart.append('text').text((d) => { return d[1]; });

		setAttr(text, option);
	},

	setXScale(width, xValues, option = {}) {
		let xScale = scaleBand().rangeRound([0, width]).padding(0.1),
			xScaleInstance = this.get('gridContainer').append('g');

		this.set('mainChartHight', width);
		xScale.domain(xValues);

		setAttr(xScaleInstance, option);

		xScaleInstance.call(axisBottom(xScale))

		return xScale;
	},

	setYScale(height, yValues, option = {}) {
		let yScale = scaleLinear().rangeRound([height, 0]),
			yScaleInstance = this.get('gridContainer').append('g');

		this.set('mainChartHight', height);
		yScale.domain(yValues);

		setAttr(yScaleInstance, option);

		yScaleInstance.call(axisLeft(yScale).ticks(10))
		return yScale;
	},

	drawMainChart(dataSource, option) {
		let chart = this.get('gridContainer').selectAll('bar').data(dataSource).enter().append('g'),
			rect = chart.append('rect');

		setAttr(rect, option);

		return chart;
	}
});
