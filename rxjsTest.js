const { range, Observable, of, timer, zip } = require('rxjs');
const { tap, concatMap, delay, switchMap, mergeMap, map } = require('rxjs/operators');

function rxjsTestFunction() {
	var time$ = range(1, 10000).pipe(
		concatMap(function(x) {
			// console.log('time called', x);
			return of(x).pipe(delay(3000));
		})
	);

	function getStockPrice(id, time) {
		// console.log('Recieved id: ' + id + ' time: ' + time);
		return new Observable(observer => {
			// console.log('HERE');
			setTimeout(() => {
				console.log('OUTPUT: id: ' + id + ' time: ' + time);
				observer.next((id + 1) * 10 + time);
			}, 3000);
		});
	}
	function getStockWithHighestvalue() {
		return new Observable(observer => {
			setTimeout(() => {
				// console.log('getStockWithHighestvalue');
				observer.next(parseInt((Math.random() * 10000).toString()));
			}, 1500);
		});
	}

	let input$ = timer(0, 2000).pipe(switchMap(_ => getStockWithHighestvalue()));

	let result$ = zip(input$, time$).pipe(
		mergeMap(arr => {
			// console.log(arr);
			return getStockPrice(arr[0], arr[1]);
		})
	);

	result$.subscribe(val => console.log('final input called', val));
}

rxjsTestFunction();