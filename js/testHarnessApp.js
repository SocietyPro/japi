var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope, $q, $timeout) {

  var japi = new Japi();

  $scope.tests = [
    {name: "peerPing", functionCall: japi.Peer.Ping, arguments: [ ], expected: false},
    {name: "peerListing", functionCall: japi.PeerList.List, arguments: [ ], expected: ""},
    {name: "savePeerListing", functionCall: japi.PeerList.Save, arguments: [ "PeerList UUID", "XML"], expected: ""},
    {name: "getPeerList", functionCall: japi.PeerList.Get, arguments: [ "PeerList ID"], expected: ""},
    {name: "deletePeerList", functionCall: japi.PeerList.Delete, arguments: [ "PeerList ID"], expected: ""},
    {name: "pollResults", functionCall: japi.Peer.Polls.Results, arguments: [ "JID/Cambrian ID", "POLL ID"], expected: ""},
    {name: "pollSave", functionCall: japi.Polls.Save, arguments: [ "POLL_UUID", "POLL XML"], expected: ""},
    {name: "pollsList", functionCall: japi.Polls.List, arguments: [], expected: ""},
    {name: "pollGet", functionCall: japi.Polls.Get, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollStart", functionCall: japi.Polls.Start, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollResults", functionCall: japi.Polls.Results, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollStop", functionCall: japi.Polls.Stop, arguments: [ "POLL_UUID"], expected: ""},
    {name: "pollDelete", functionCall: japi.Polls.Delete, arguments: [ "POLL ID"], expected: ""},
    {name: "templateSave", functionCall: japi.Polls.MyTemplates.Save, arguments: [ "TEMPLATE_UUID", "TEMPLATE XML"], expected: ""},
    {name: "templateGet", functionCall: japi.Polls.MyTemplates.Get, arguments: ["TEMPLATE_UUID"], expected: ""},
    {name: "templatesList", functionCall: japi.Polls.MyTemplates.List, arguments: [], expected: ""},
    {name: "templatesDelete", functionCall: japi.Polls.MyTemplates.Delete, arguments: [ "TEMPLATE_UUID"], expected: ""} 
  ];
  //runTests($scope, $q);
      
  $scope.runTests = function(){
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

