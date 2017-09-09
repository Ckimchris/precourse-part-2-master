describe('clone', function() {
  it('should return shallow copy of object', function() {
    var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
    var shallowClone = clone(users);
    expect(shallowClone[0].user).to.equal(users[0].user);
    expect(shallowClone[0]).to.equal(users[0]);
  });
});

describe('size', function() {
  it('should return the correct size of arrays', function() {
    expect(size([])).to.eql(0);
    expect(size([1])).to.eql(1);
  });
  it('should return the correct size of objects', function() {
    expect(size({a:1,b:2})).to.eql(2);
    expect(size({})).to.eql(0);
  });
});

describe('first', function() {
  it('should be able to pull out the first element of an array', function() {
    expect(first([1,2,3])).to.equal(1);
    expect(first([6])).to.equal(6);
  });

  it('should not modify the array', function() {
    var array = [1,2,3];
    expect(first(array)).to.equal(1);
    expect(array).to.eql([1,2,3]);
  });

  it('should return undefined for empty array', function() {
    expect(first([])).to.be(undefined);
  });
});

describe('drop', function() {
  it('should remove first element if second argument not provided', function() {
    expect(drop([1, 2, 3])).to.eql([2, 3]);
  });

  it('should remove first n elem', function() {
    expect(drop([1, 2, 3], 2)).to.eql([3]);
  });

  it('should return empty array if n is larger than array length', function() {
    expect(drop([1, 2, 3], 5)).to.eql([]);
  });

  it('should return entire array if n is 0', function() {
    expect(drop([1, 2, 3], 0)).to.eql([1, 2, 3]);
  });
});

describe('take', function() {
  it('should return first element if second argument not provided', function() {
    expect(take([1, 2, 3])).to.eql([1]);
  });

  it('should remove last n elem', function() {
    expect(take([1, 2, 3], 2)).to.eql([1,2]);
  });

  it('should return entire array if n is larger than array length', function() {
    expect(take([1, 2, 3], 5)).to.eql([1,2,3]);
  });

  it('should return empty array if n is 0', function() {
    expect(take([1, 2, 3], 0)).to.eql([]);
  });
});

describe('pluck', function() {
  it('should return values contained at a user-defined property', function() {
    var people = [
      {name : 'moe', age : 30},
      {name : 'curly', age : 50}
    ];
    expect(pluck(people, 'name')).to.eql(['moe', 'curly']);
  });
});

describe('extend', function() {
  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var extended = extend(to, from);
    expect(extended).to.equal(to);
  });

  it('should extend an object with the attributes of another', function() {
    var to = {};
    var from = {a:'b'};
    extend(to, from);
    expect(to.a).to.equal('b');
  });

  it('should override properties found on the destination', function() {
    var to = {a:'x'};
    var from = {a:'b'};
    extend(to, from)
    expect(to.a).to.equal('b');
  });

  it('should not override properties not found in the source', function() {
    var to = {x:'x'};
    var from = {a:'b'};
    extend(to, from);
    expect(to.x).to.equal('x');
  });

  it('should extend from multiple source objects', function() {
    var first = {x:1};
    extend(first, {a:2}, {b:3});
    expect(first).to.eql({x:1, a:2, b:3});
  });

  it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
    var extended = extend({x:'x'}, {a:'a', x:2}, {a:1});
    expect(extended).to.eql({x:2, a:1});
  });

  it('should copy undefined values', function() {
    var extended = extend({}, {a: void 0, b: null});
    expect('a' in extended && 'b' in extended).to.be(true);
  });
});

describe('applyAndEmpty', function() {
  it('should iterate over the queue and submit input', function() {
    var puzzlers = [
      function(a) { return 8 * a - 10; },
      function(a) { return (a - 3) * (a - 3) * (a - 3); },
      function(a) { return a * a + 4;},
      function(a) { return a % 5;}
    ];
    var start = 2;
    expect(applyAndEmpty(2, puzzlers)).to.equal(3);
  });
});

describe('memoize', function() {
  var fib, fastFib, timeCheck, fastTime, wait;
  beforeEach(function() {
    fib = function(n) {
      if(n < 2){ return n; }
      return fib(n - 1) + fib(n - 2);
    };
    fastFib = memoize(fib);
    timeCheck = function(str) { return str + Date.now(); };
    fastTime = memoize(timeCheck);
    // Synchronous sleep: terrible for web development, awesome for testing memoize
    wait = function(t) {
      var start = Date.now();
      while ((Date.now() - start) < t){}
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
    expect(fastFib(7)).to.equal(13);
  });

  it('should not run the function twice for the same given argument', function() {
    var firstTime = timeCheck('shazaam!');
    wait(5);
    var secondTime = fastTime('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTime('shazaam!')).to.equal(secondTime);
  });
});

describe('delay', function() {
  var clock;
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });
  afterEach(function() {
    clock.restore();
  });
  it('should only execute the function after the specified wait time', function() {
    var callback = sinon.spy();
    delay(callback, 100);
    clock.tick(99);
    expect(callback.notCalled).to.be(true);
    clock.tick(1);
    expect(callback.calledOnce).to.be(true);
  });

  it('should have successfully passed function arguments in', function() {
    var callback = sinon.spy();
    delay(callback, 100, 1, 2);
    clock.tick(100);
    expect(callback.calledWith(1, 2)).to.be(true);
  });
});
