import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import ChartUtil from './d3ChartUtil';
import { select } from 'd3-selection';
import { max } from 'd3';

/*
    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/

const { keys, values } = Object;

export default Component.extend(ChartUtil, {
	positionalParams: [
		'width',
		'height',
		'bgColor',
		'title',
		'isShowText',
		'barWidth',
		'gridAttr',
		'chartOption'
	],

	option: computed('chartOption', function() {
		return this.get('chartOption')
	}),

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
		let margin = null,
			xScaleValues = keys(this.get('data')),
			yScaleValues = [0, max(values(this.get('data')))],
			xScale = null,
			yScale = null,
			mainChart = null,
			mainChartOption = null,
			mainChartTextOption = null;

		margin = { top: 100, right: 20, bottom: 30, left: 30 };

		this.initChart(this.elementId);
		this.setWidth(this.get('width'));
		this.setHeight(this.get('height'));
		this.setBackground(this.get('bgColor'));
		this.setGrid(this.get('gridOption'));

		this.setTitle(this.get('title'));
		xScale = this.setXScale(
			this.get('width') - margin.left - margin.right,
			xScaleValues);
		yScale = this.setYScale(
			this.get('height') - margin.top - margin.bottom,
			yScaleValues);


		mainChartOption = {
			width: this.get('barWidth'),
			height: (d) => { return this.get('height') - margin.top - margin.bottom - yScale(d[1]); },
			x: (d) => { return xScale(d[0]) + xScale.bandwidth() / 2 - this.get('barWidth') + this.get('barWidth') / 2; },
			y: (d) => { return yScale(d[1]); }
		}

		mainChartTextOption = {
			x: (d) => { return xScale(d[0]) + xScale.bandwidth() / 2 - this.get('barWidth') + this.get('barWidth') / 2; },
			y: (d) => { return yScale(d[1]); },
			dx: this.get('barWidth') / 2
		}

		mainChart = this.drawMainChart(
			keys(this.get('data')).map(key => [key, this.get('data')[key]]),
			mainChartOption
		);

		if (this.get('isShowText')) {
			this.isShowMainChartTipText(mainChart, mainChartTextOption);
		}
		this.setOption(this.get('option'));

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
