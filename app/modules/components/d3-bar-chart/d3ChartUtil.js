import Mixin from '@ember/object/mixin';
import { select, selectAll } from "d3-selection";
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
	xScaleInstance: null,
	yScaleInstance: null,

	initChart(elementId) {
		this.set('elementId', elementId);
		this.set('svgRoot', select(`#${elementId}`).append('svg'));
	},

	setGrid() {
		let gridInstance = this.get('svgRoot').append('g').attr('tag', 'grid');

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

	setTitle(value) {
		this.get('gridContainer').append('text').attr('tag', 'title').text(value);
	},

	setSubTitle(value) {

	},

	isShowMainChartTipText(chart, option) {
		let text = chart.append('text').attr('tag', 'rectText').text((d) => { return d[1]; });

		setAttr(text, option);
	},

	setXScale(width, xValues) {
		let xScale = scaleBand().rangeRound([0, width]).padding(0.1),
			xScaleInstance = this.get('gridContainer').append('g').attr('tag', 'xScale');

		xScale.domain(xValues);

		this.set('xScaleInstance', xScaleInstance);

		xScaleInstance.call(axisBottom(xScale))

		return xScale;
	},

	setYScale(height, yValues) {
		let yScale = scaleLinear().rangeRound([height, 0]),
			yScaleInstance = this.get('gridContainer').append('g').attr('tag', 'yScale');

		yScale.domain(yValues);

		// setAttr(yScaleInstance, option);

		yScaleInstance.call(axisLeft(yScale).ticks(10))
		return yScale;
	},

	setOption(ov = {}) {
		keys(ov).forEach(key => {
			let check = selectAll(`#${this.get('elementId')} [tag=${key}]`);
			if (check.size() > 0) {
				keys(ov[key]).forEach(attrKey => {
					check.attr(attrKey, ov[key][attrKey]);
				})
			}
		})
	},

	drawMainChart(dataSource, option) {
		let chart = this.get('gridContainer').selectAll('bar').data(dataSource).enter().append('g'),
			rect = chart.append('rect').attr('tag', 'rect');

		setAttr(rect, option);

		return chart;
	}
});
