var Datepicker = Class.extend([EventMixin], {
	init:function (templates, options) {
		this.calendars = {};

		this.templates = templates;
		this.elem = options.elem;

		this.name = 'datepicker';

		this.year = 2012;
		this.month = 6;
		var _this = this;

		this.elem
			.on('mousedown', '.datepicker__prev, .datepicker__next', function() { return false; })
			.on('click', '.datepicker__prev, .datepicker__next', function () {
				_this.month +=($(this).hasClass('datepicker__next') ? 1: -1);
				_this.renderCalendars();
			});

		this.render();
	},

	render:function () {
		if (this.elem.find('.' + this.name).length)
			return;
		this.elem.append( this.templates['datepicker'] () );
		this.renderCalendars();
	},

	renderCalendars: function() {
		var _this = this;
		$.each(this.calendars, function(i, calendar) {
			calendar.destroy();
		});

		this.calendars.left = new Calendar(this.elem.find('.' + this.name + '__placeholder_pos_left'), this.year, this.month);
		this.calendars.right = new Calendar(this.elem.find('.' + this.name + '__placeholder_pos_right'), this.year, this.month + 1);

		$.each(this.calendars, function(i, calendar) {
			calendar.on('select.calendar', function(date) {
				_this._onDateSelect(calendar, [date]);
			})
		});
	},

	_onDateSelect: function(targetCalendar, date){
		$.each(this.calendars, function(i, calendar) {
			calendar != targetCalendar && calendar.clearSelection();
		});
		this.trigger('select.datepicker', [date]);
	}

});