var LocalizationRuMixin = {
	months: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(','),
	days: "пн,вт,ср,чт,пт,сб,вс".split(',')
};

var Calendar = Class.extend([EventMixin, LocalizationRuMixin], {

	/***
	 * @param elem {jQuery}
	 * @param year {String|Number}
	 * @param month {String|Number}
	 */
	init: function(elem, year, month) {
		this.elem = elem;
		this.year = year;
		this.month = month;

		var _this = this;
		this.elem
			.on('mousedown', '.calendar__dateCell', function() { return false; })
			.on('click', '.calendar__dateCell' , function(e){
				_this.clearSelection();
				$(this).addClass('calendar__dateCell_active_yes');
				_this.trigger('select.calendar', [new Date(_this.year, _this.month - 1, $(this).html())]);
			});

		this._render();
	},

	clearSelection: function() {
		this.elem.find('.calendar__dateCell_active_yes').removeClass('calendar__dateCell_active_yes');
	},

	destroy: function() {
		//TODO: unbind events
//		this.un('select');
		this.elem.unbind('click mousedown');
	},

	_render: function() {
		var date = new Date(this.year, this.month - 1);
		var table = [];
		table.push('<table class="calendar">');
		table.push('<caption class="calendar__caption">');
		table.push('<span class="calendar__captionText">');
		table.push(this.months[date.getMonth()] + ' ' + date.getFullYear());
		table.push('</span>');
		table.push('</caption>');
		table.push('<tr><th class="calendar__days">', this.days.join('</th><th class="calendar__days">'), '</th></tr>' );
		table.push( this._createDays() );
		table.push('</table>');
		this.elem.html(table.join(''));
	},

	_createDays: function() {

		//день недели первого числа 1-based;
		var firstDay = new Date(this.year, this.month - 1).getDay() || 7;

		var daysInMonth = getLastDayOfMonth(this.year, this.month);
		var cellsCount = Math.ceil( (daysInMonth + firstDay - 1) / 7) * 7;

		// day - номер дня, для дня из прошлого месяца отрицательный
		var currDay = 2 - firstDay;

		var result = ['<tr>'];
		while(cellsCount-- > 0) {
			if (currDay >= 1 && currDay <= daysInMonth){
				if (currDay == 7)
					result.push('<td class="calendar__dateCell">', currDay, '</td>');
				else
					result.push('<td class="calendar__dateCell">', currDay, '</td>');
			} else {
				result.push('<td class="calendar__cell"></td>');
			}

			if (cellsCount % 7 == 0)
				result.push('</tr><tr>');
			currDay++;
		}
		result.push('</tr>');
		return result.join('');

		function getLastDayOfMonth(year, month) {
			return (new Date(year, month) - new Date(year, month - 1)) / 1000/60/60/24 ^ 0;
		}
	}
});