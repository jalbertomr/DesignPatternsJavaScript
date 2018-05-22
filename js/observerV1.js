function Subject() {
	this.observers = [];
}

Subject.prototype = {

	subscribe: function(fn){
		this.observers.push(fn);
	},

	unsubscribe: function(fn){
		this.observers = this.observers.filter(
			function(item) {
				if (item !== fn) {
					return item;
				}
			}
		);
	},

	notifyObserver: function(id, msgEvent, thisObj) {
		var scope = thisObj || window;
		this.observers[ this.observers.indexOf(id) ].call(scope, msgEvent);
	},

	notifyObservers: function(msgEvent, thisObj){
		var scope = thisObj || window;
		this.observers.forEach(function(current){
			current.call(scope, msgEvent);
		});
	}
}

//log helper
var log = (function() {
	var log = "";

	return {
		add: function(msg) { log += msg + "\n"; },
		show: function() {console.log(log); log = "";}
	}
})();

var Observer = function(item) {
	log.add("observer notificado: " + item)
}

function run(){
	var observer1 = function(item) {
		log.add("observer1 notificado: " + item);
	};
	var observer2 = function(item) {
		log.add("observer2 notificado: " + item);
	};
	var observer3 = function(item) {
		log.add("observer3 notificado: " + item);
	};
	var observer4 = function(item) {
		log.add("observer4 notificado: " + item);
	};

	var subject = new Subject();

	subject.subscribe(observer1);
	subject.subscribe(observer2);
	subject.subscribe(observer3);
	subject.subscribe(observer4);
	subject.notifyObserver(observer1, 'Activate');
	subject.notifyObserver(observer2, 'Espera');
	subject.notifyObservers('Arranca');
	subject.unsubscribe(observer1);
	subject.notifyObservers('Detenete');
	subject.subscribe(observer1);
	subject.notifyObservers('Publica');

	log.show();
}
