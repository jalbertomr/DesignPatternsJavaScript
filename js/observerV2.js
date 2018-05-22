//Observer Pattern
var Subject = function() {
	let observers = [];

	return {
		subscribeObserver: function(observer) {
			observers.push(observer);
		},
		unsubscribeObserver: function(observer) {
			var index = observers.indexOf(observer);
			if (index > -1) {
			  observers.splice(index, 1);
			}
		},
		notifyObserver: function(observer, msgEvent) {
			var index = observers.indexOf(observer);
			if (index > -1) {
				observers[index].notify( msgEvent);
			}
		},
		notifyAllObservers: function(msgEvent) {
		/* version for(..)
		  for(var i = 0; i < observers.length; i++){
				observers[i].notify(msgEvent);
			};
		*/
			observers.forEach(function(current){
				current.notify(msgEvent);
			});
		}
	};
};

var Observer = function(ID){
	return {
		notify: function(msgEvent){
			console.log("Observer " + ID + " se ha notificado con " + msgEvent+ ".");
		}
	}
}

function test(){
	var subject = new Subject();

	var observer1 = new Observer('UNO');
	var observer2 = new Observer(2);
	var observer3 = new Observer('TRES');
	var observer4 = new Observer(4);

	subject.subscribeObserver(observer1);
	subject.subscribeObserver(observer2);
	subject.subscribeObserver(observer3);
	subject.subscribeObserver(observer4);

	subject.notifyObserver(observer2);
	subject.unsubscribeObserver(observer2);

	subject.notifyObserver(observer2,'Activate!');
	subject.notifyObserver(observer3,'Activate!')

	subject.notifyAllObservers('Desactivate!');
};
