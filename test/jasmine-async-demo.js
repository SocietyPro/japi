console.log("Trying to figure out why my async jasmine tests don't run:");
describe("jasmine asynchronous specs", function() {
  it("completes the test when done() is called", function(done) {
    setTimeout(function() {
      expect(true).toBeTruthy();
      done();
    }, 2000);
  });
});

// Using angular's $q:
var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope, $q) {
  describe("calling expect when a promise resolves", function(){
    describe("Running the tests from the root angular controller scope", function(){
      // It's unclear whether I must call beforeEach's "done"
      beforeEach(function(done){ done() });

      var mockAPIFunction = function(callback){
        setTimeout(function(){
          callback(null, "hello world");
        }, 200);
      };

      console.log('case 1: outside "it"');
      it('calls done when the promise finishes', function(done){
        console.log('case 1: inside "it"');

        // Set up a promise
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(onTestComplete)  //, onTestError)
        .finally(done)

        function onTestComplete (data) {
          expect(data).toEqual("hello world");
        };

        // Run the test then trigger the promise
        var callback = function(err, resultData){
          //if(err){  deferred.reject(err);  };
          deferred.resolve(resultData)
        };

        // Fire the API call, allowing the callback above to resolve the
        // promise, which calls jasmine's done
        mockAPIFunction(callback);
      });
    });
  });
  $scope.runTests = function(){
    console.log('runTests()');
    describe("Running the tests from $scope.runTests() on button click", function(){
      // It's unclear whether I must call beforeEach's "done"
      beforeEach(function(done){ done() });

      var mockAPIFunction = function(callback){
        setTimeout(function(){
          callback(null, "hello world");
        }, 200);
      };

      console.log('case 2: outside "it"');
      it('calls done when the promise finishes', function(done){
        // This whole block appears to never execute. 
        // At least, the next line isn't logged:
        console.log('case 2: inside "it"');

        // Set up a promise
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(onTestComplete)  //, onTestError)
        .finally(done)

        function onTestComplete (data) {
          console.log('Outside it completes');
          expect(data).toEqual("helloworld");
        };

        // Run the test then trigger the promise
        var callback = function(err, resultData){
          //if(err){  deferred.reject(err);  };
          deferred.resolve(resultData)
        };

        // Fire the API call, allowing the callback above to resolve the
        // promise, which calls jasmine's done
        mockAPIFunction(callback);
      });
    });
  }; // end of $scope.runTests definition
});
