var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope, $q, $timeout) {
  $scope.testsDisabled = false; // Flag meaning "the test suite is complete, don't run again"

  var japi = new Japi();

  $scope.tests = [
    {name: "peerPing", functionCall: japi.peer.ping, arguments: [ ], expected: false},
    {name: "peerListing", functionCall: japi.peerList.list, arguments: [ ], expected: ""},
    {name: "savePeerListing", functionCall: japi.peerList.save, arguments: [ "PeerList UUID", "XML"], expected: ""},
    {name: "getPeerList", functionCall: japi.peerList.get, arguments: [ "PeerList ID"], expected: ""},
    {name: "deletePeerList", functionCall: japi.peerList.delete, arguments: [ "PeerList ID"], expected: ""},
    {name: "pollResults", functionCall: japi.peer.polls.results, arguments: [ "JID/Cambrian ID", "POLL ID"], expected: ""},
    {name: "pollSave", functionCall: japi.polls.save, arguments: [ "POLL_UUID", "POLL XML"], expected: ""},
    {name: "pollsList", functionCall: japi.polls.list, arguments: [], expected: ""},
    {name: "pollGet", functionCall: japi.polls.get, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollStart", functionCall: japi.polls.start, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollResults", functionCall: japi.polls.results, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollStop", functionCall: japi.polls.stop, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollDelete", functionCall: japi.polls.delete, arguments: [ "POLL ID"], expected: ""},
    {name: "templateSave", functionCall: japi.polls.myTemplates.save, arguments: [ "TEMPLATE_UUID", "TEMPLATE XML"], expected: ""},
    {name: "templateGet", functionCall: japi.polls.myTemplates.get, arguments: ["TEMPLATE_UUID"], expected: ""},
    {name: "templatesList", functionCall: japi.polls.myTemplates.list, arguments: [], expected: ""},
    {name: "templatesDelete", functionCall: japi.polls.myTemplates.delete, arguments: [ "TEMPLATE_UUID"], expected: ""} 
  ];
  //runTests($scope, $q);
      
  $scope.runTests = function(){
    $scope.testsDisabled = true;

    console.log("Starting tests");

    angular.forEach($scope.tests, function (test) {
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
      
      // Run the test:
      testFn.apply(this, test.arguments)
      
      // At some future point, the test will call its callback argument,
      // which in turn calls deferred.resolve or deferred.reject.
    });
  };
})
.controller("childTestCtrl", function($scope, $q){

})

