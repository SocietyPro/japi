var myAPI = {
  test1: function(callback){
    setTimeout(function(){  return callback(null, true) }, 200);
  },
  test2: function(a, b, callback){
    setTimeout(function(){  return callback(null, a+b) }, 200);
  },
  testSync: function(a, b, callback){
    return callback(null, a+b);
  },
}

var tests = [
  {
    name: "test1",
    testFn: myAPI.test1,
    args: [],
    expected: true,
    result: null,
  },
  {
    name: "test2",
    testFn: myAPI.testSync,
    args: ['a','b'],
    expected: 'ab',
    result: null,
  },
  {
    name: "testSync",
    testFn: myAPI.testSync,
    args: ['a','b'],
    expected: 'ab',
    result: null,
  },
]



function makeOneTestCallback(test){
  var testCallback = function(err, resultData){
    if(err){
      console.log("Error running", test.name, "-", err);
      test.result = false;
      return false;
    }
    if(resultData === test.expected){
      console.log(test.name, " PASS");
      test.result = true;
    } else {
      console.log(test.name, " FAIL");
      test.result = false;
    }
  }
  return testCallback;
}


function runTests(){
  function defaultCallback(err, resultData){
    console.log(resultData);
    // No known way to compare resultData to test.expected
    // I need access to the individual test object that corresponds to this execution of this callback
  }

  tests.forEach(function(test){
    // Create a custom callback for this test, encapsulating the 'test' variable
    var customCallback = makeOneTestCallback(test)
    test.args.push(customCallback);
    test.testFn.apply(this, test.args)
  });
}

runTests();
