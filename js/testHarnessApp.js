
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
      
  $scope.runTests = function(){
    console.log('runTests()');
    $scope.testsDisabled = true; // "the test suite is complete, don't allow a second run"

    describe("Mock JAPI calls", function(){
    //  angular.forEach($scope.tests, function (test) {
      $scope.tests.forEach(function(test){
        describe(test.name, function(){
          console.log('Outside it');
          it('matches '+test.expected, function(){

            var deferred = $q.defer();
            var promise = deferred.promise;

            promise.then(onTestComplete, onTestError);

            function onTestComplete (data) {
              test.actual = data;
              test.succeeded = angular.equals(test.actual, test.expected);
              expect(test.succeeded).toEqual(test.actual);
              //done();
            };

            function onTestError(reason) {
              test.succeeded = false;
              test.error = reason;
              console.log('Fail -',test.name);
              console.log('     Error:', reason)
              expect(test.error).not.toBeDefined();
              //done();
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
          var deferred = $q.defer();
          var promise = deferred.promise;

          promise.then(onTestComplete, onTestError);

          function onTestComplete (data) {
            test.actual = data;
            test.succeeded = angular.equals(test.actual, test.expected);
            var status = test.succeeded ? "PASS" : "FAIL";
            console.log(status,'-',test.name);
            if(!test.succeeded){
              console.log('     Expected:', test.expected);
              console.log('     Actual:', test.actual);
            }
          };

          function onTestError(reason) {
            test.succeeded = false;
            test.error = reason;
            console.log('Fail -',test.name);
            console.log('     Error:', reason)
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
          }); //end of it()

        }); // end of describes(one)
      }); // end of angular.forEach
    }); // end of describes(all)
  }; // end of $scope.runTests definition
}) // end of testCtrl
.controller("childTestCtrl", function($scope, $q){

})

