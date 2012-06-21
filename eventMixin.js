var EventMixin = {

	on: function (eventName, handler) {
		if (!this._eventHandlers)
			this._eventHandlers = {};

		if (!this._eventHandlers[eventName]) {
			this._eventHandlers[eventName] = [];
		}

		this._eventHandlers[eventName].push(handler);
	},

	trigger: function (eventName, args) {
		if (!this._eventHandlers)
			this._eventHandlers = {};

		if (!this._eventHandlers[eventName]) {
			return;
		}

		var handlers = this._eventHandlers[eventName];
		for (var i = 0; i < handlers.length; i++) {
			handlers[i].apply(this, args);
		}
	}

};
