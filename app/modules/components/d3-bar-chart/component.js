import Component from '@ember/component';
import { run } from '@ember/runloop';
import ChartInitial from './d3ChartInitial';
import { select } from 'd3-selection';
import { max } from 'd3';

/*
    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/

const { keys, values } = Object;

export default Component.extend(ChartInitial, {
	width: 1024,
	height: 768,
	bgColor: '#f5faf8',
	title: '基本封装',
	subTitle: '',
	isShowText: true,

	localClassNames: 'd3-bar',

	init() {
		this._super(...arguments);
		this.data = {
			'C++': 32,
			'C#': 26,
			'Java': 45,
			'Python': 38,
			'JavaScript': 53,
			'R': 48,
			'Scala': 42,
			'Golang': 34,
			'Swit': 37,
			'Android': 36
		};
	},

	initialize() {
		let gridOption = null,
			titleOption = null,
			margin = null,
			xScaleValues = keys(this.get('data')),
			yScaleValues = [0, max(values(this.get('data')))],
			xScaleOption = null,
			xScale = null,
			yScale = null,
			mainChart = null,
			mainChartOption = null,
			mainChartTextOption = null;

		margin = { top: 100, right: 20, bottom: 30, left: 30 };

		gridOption = {
			transform: `translate(${margin.left}, ${margin.top})`
		};

		titleOption = {
			transform: `translate(${this.get('width') / 2}, -${margin.top / 2})`,
			'text-anchor': 'middle',
			'font-weight': 600
		};

		xScaleOption = {
			transform: `translate(0, ${this.get('height') - margin.top - margin.bottom})`,
			'font-weight': 'bold'
		};

		this.initChart(this.elementId);
		this.setWidth(this.get('width'));
		this.setHeight(this.get('height'));
		this.setBackground(this.get('bgColor'));
		this.setGrid(gridOption);

		this.setTitle(this.get('title'), titleOption);
		xScale = this.setXScale(
			this.get('width') - margin.left - margin.right,
			xScaleValues,
			xScaleOption);
		yScale = this.setYScale(
			this.get('height') - margin.top - margin.bottom,
			yScaleValues);


		mainChartOption = {
			class: 'bar',
			width: xScale.bandwidth(),
			height: (d) => { return this.get('mainChartHight') - yScale(d[1]); },
			x: (d) => { return xScale(d[0]); },
			y: (d) => { return yScale(d[1]); }
		}

		mainChartTextOption = {
			class: 'barText',
			'text-anchor': 'middle',
			x: (d) => { return xScale(d[0]); },
			y: (d) => { return yScale(d[1]); },
			dx: xScale.bandwidth() / 2,
			dy: 20
		}

		mainChart = this.drawMainChart(
			keys(this.get('data')).map(key => [key, this.get('data')[key]]),
			mainChartOption
		);

		if (this.get('isShowText')) {
			this.isShowMainChartTipText(mainChart, mainChartTextOption);
		}

		mainChart.on('mouseover', function () {
			select(this).attr('opacity', 0.7);
		}).on('mouseout', function () {
			select(this).attr('opacity', 1)
		});

	},

	didReceiveAttrs() {
		this._super(...arguments);
		run.scheduleOnce('render', this, this.initialize);
	},

	actions: {

	}
});
