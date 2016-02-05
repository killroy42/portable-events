/*!
 * TinyEvent v1.0.1 | MIT License | github.com/killroy42
 *
 */
 (function() {
/*jslint node: true */
'use strict';

function TinyEvent() {
}
TinyEvent.mixin = function(obj) {
	obj = obj || {};
	var _events = {};
	if(obj.on || obj.off || obj.trigger) throw new Error('Object already has on/off/trigger properties');
	return Object.defineProperties(obj, {
		on: {value: function(type, handler) {
			_events[type] = _events[type] || [];
			_events[type].push(handler);
		}},
		off: {value: function(type, handler) {
			if(!_events[type]) return;
			if(handler === undefined) delete _events[type];
			var idx = _events[type].indexOf(handler);
			if (idx === -1) return;
			_events[type].splice(idx, 1);
		}},
		trigger: {value: function(type) {
			var handlers, args, i;
			if(!(handlers = _events[type])) return;
			args = Array.prototype.slice.call(arguments, 1);
			// TODO: Consider setImmediate support
			setTimeout(function() {
				i = 0; while(handlers[i]) {
					handlers[i].apply(obj, args);
					i++;
				}
			}, 0);
		}}
	});
};


// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports = TinyEvent.mixin;
	module.exports.TinyEvent = TinyEvent;
}
})();