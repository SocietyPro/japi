
console.log('testHarnessApp.js');
describe("jasmine asynchronous specs", function() {
  it("takes a long time", function(done) {
    setTimeout(function() {
      expect(true).toBeTruthy();
      done();
    }, 2000);
  });
});


var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope, $q, $timeout) {
  $scope.testsDisabled = false; // Flag for "tests have already run"

  var japi = new Cambrian.JAPI();

  // Get array of tests (created in js/testsArray.js):
  $scope.tests = Cambrian.japiTests.tests;
  describe("Mock JAPI calls", function(){
    angular.forEach($scope.tests, function (test) {
      describe(test.name, function(){
        //it('calls promise.done after running asynchronous tests', function(done){
        //afterEach(function(done){

        //});

          var deferred = $q.defer();
          var promise = deferred.promise;

          promise.then(onTestComplete, onTestError);
          //.finally(done);

          function onTestComplete (data) {
            console.log('Outside it completes');
            describe('The test result', function(){
              it('matches '+test.expected, function(){
                console.log('inside it');
                test.actual = data;
                expect(test.expected).toEqual(test.actual);
              }); //end of it()
            });
          };

          function onTestError(reason) {
            console.log('Outside it errs');
            it('does not fail', function(){
              console.log('inside it');
              test.succeeded = false;
              test.error = reason;
              console.log('Fail -',test.name);
              console.log('     Error:', reason)
              expect(test.error).not.toBeDefined();
            });
          };
          
          // Alias the function to be tested as testFn:
          var testFn = test.functionCall;
         
          // Make a callback fn that will eventually resolve this one deferred, for this one test:

          var testCb = (function(deferred){
            return function(err, resultData){
              //console.log("Test callback", err, resultData)
              if(err){  deferred.reject(err);  };
              deferred.resolve(resultData)
            }
          })(deferred);
         
          // Append the test callback to the test arguments:
          test.arguments.push(testCb)
          
          try {
            // Run the test:
            testFn.apply(this, test.arguments)
            
            // At some future point, the test will call its callback argument,
            // which in turn calls deferred.resolve or deferred.reject.
          } catch(e) {
            // Manually pass the caught exception to the callback:
            testCb(e);
          } finally {
          };
        //}); // end of it()
      }); // end of describes(one)
    }); // end of angular.forEach
  }); // end of describes(all)
      
  /*
  $scope.runTests = function(){
    console.log('runTests()');
    $scope.testsDisabled = true; // "the test suite is complete, don't allow a second run"
    // Test one:
    describe('The first test', function(){
      beforeEach(function(done){ done() });
      it('calls done when the promise finishes', function(done){
        console.log('inside async it');
        // Set up a promise
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(onTestComplete)  //, onTestError)
        .finally(done)

        function onTestComplete (data) {
          console.log('Outside it completes');
          it('matches '+test.expected, function(done){
            console.log('inside it');
            test.actual = data;
            test.succeeded = angular.equals(test.actual, test.expected);
            expect(test.succeeded).toEqual(test.actual);
          }); //end of it()
        };

        function onTestError(reason) {
          console.log('Outside it errs');
          it('does not fail', function(done){
            console.log('inside it');
            test.succeeded = false;
            test.error = reason;
            console.log('Fail -',test.name);
            console.log('     Error:', reason)
            expect(test.error).not.toBeDefined();
          });
        };

        // Run the test then trigger the promise
        var test = $scope.tests[0];
        var callback = function(err, resultData){
          if(err){  deferred.reject(err);  };
          deferred.resolve(resultData)
        };
      });
    });
  }; // end of $scope.runTests definition
  */
}) // end of testCtrl
.controller("childTestCtrl", function($scope, $q){

})



