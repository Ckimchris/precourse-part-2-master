// Creates a clone of an object.
// var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
// var shallowClone = clone(users);
// shallowClone[0] === users[0] → true
function clone(value) {
	// CODE HERE
	var result = [];
	for(var i = 0; i < value.length; i++){
		result.push(value[i]);
	}
	return result;
}


// Return the size of collection. If the argument passed is an array, then return
// the length of the array. If the argument passed is an object, then return the
// number of key/value properties.
// size([1,2,3]); → 3
// size({a: 1, b: 2}); → 2
function size(collection) {
	// CODE HERE
	var result = [];
  if(Array.isArray(collection)){
    return collection.length;
  }else if(typeof collection === 'object'){
    result = Object.keys(collection);
    return result.length
	}
}


// Returns the first element of an array without modifying the original array.
// Returns undefined if array is empty
// first([1,2,3]); → 1
// first([]); → undefined
function first(array) {
	// CODE HERE
	if(array.length > 0){
		return array[0];
	}else{
		return undefined;
	}

}


// Creates a slice of array with n elements dropped from the beginning.
// n defaults to 1
// drop([1, 2, 3]); → [2, 3]
// drop([1, 2, 3], 2); → [3]
// drop([1, 2, 3], 5); → []
// drop([1, 2, 3], 0); → [1, 2, 3]
function drop(array, n) {
	// CODE HERE
	var result;
	if(n === undefined){
		n = 1;
		result = array.splice(n);
		return result;	
	}else{
		result = array.splice(n);
		return result;
	}
}


//Creates a slice of array with n elements taken from the beginning.
//n defaults to 1
// take([1, 2, 3]); → [1]
// take([1, 2, 3], 2); → [1, 2]
// take([1, 2, 3], 5); → [1, 2, 3]
// take([1, 2, 3], 0); → []
function take(array, n) {
	var result = [];
	if(n == undefined){
		n = 1;
		for(var i = 0; i < n; i++){
			result.push(array[i]);
		}
			return result;
	}else if(array.length < n){
		return array;
	}else{
		for(var i = 0; i < n; i++){
			result.push(array[i]);
		}
			return result;
	}
}


// Gets the value of key from all elements in collection.
// pluck([{user: 'Bob', age: 20},{user: 'Sam', age: 25}], 'user'); → ['Bob','Sam']
function pluck(array, key) {
	// CODE HERE  
	var result = [];
  
  for(var i = 0; i < array.length; i++){
    result.push(array[i][key])
  }
  return result;
}


// Assigns own enumerable properties of source object(s) to the destination
// object. Subsequent sources overwrite property assignments of previous sources.
// extend({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
// should return ->  { 'user': 'fred', 'age': 40 }
// BONUS: solve with reduce
function extend(destination) {
	// CODE HERE

	
}


// Using a for loop, call the functions in the queue in order with the input
// number, where the results of each function become the next function’s input.
// Additionally, the queue should be empty after the function is called.
/* var puzzlers = [
  function(a) { return 8 * a - 10; },
  function(a) { return (a - 3) * (a - 3) * (a - 3); },
  function(a) { return a * a + 4;},
  function(a) { return a % 5;}
];
var start = 2;
applyAndEmpty(2, puzzlers); → 3
*/
function applyAndEmpty(input, queue) {
	// CODE HERE
  var total;
	for(var i = 0; i < queue.length; i++){
    total = queue[i](input);
    input = total;
	}
  queue.splice(0, queue.length);
  return total;
}


// Returns a function that when called, will check if it has already computed
// the result for the given argument and return that value instead if possible.
function memoize(func) {
	// CODE HERE

	
}


// Invokes func after wait milliseconds. Any additional arguments are provided
// to func when it is invoked.
function delay(func, wait) {
	// CODE HERE
  setTimeout(function(args){func(args)}, wait)
}
