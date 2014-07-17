var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope, $q, $timeout) {

  var japi = new Japi();

  $scope.tests = {
    peerPing: {functionCall: japi.Peer.Ping, arguments: [ ], expected: ""},
    peerListing: {functionCall: japi.PeerList.List, arguments: [ ], expected: ""},
    savePeerListing: {functionCall: japi.PeerList.Save, arguments: [ "PeerList UUID", "XML"], expected: ""},
    getPeerList: {functionCall: japi.PeerList.Get, arguments: [ "PeerList ID"], expected: ""},
    deletePeerList: {functionCall: japi.PeerList.Delete, arguments: [ "PeerList ID"], expected: ""},
    pollResults: {functionCall: japi.Peer.Polls.Results, arguments: [ "JID/Cambrian ID", "POLL ID"], expected: ""},
    pollSave: {functionCall: japi.Polls.Save, arguments: [ "POLL_UUID", "POLL XML"], expected: ""},
    pollsList: {functionCall: japi.Polls.List, arguments: [], expected: ""},
    pollGet: {functionCall: japi.Polls.Get, arguments: [ "POLL_UUID"], expected: ""},
    pollStart: {functionCall: japi.Polls.Start, arguments: [ "POLL_UUID"], expected: ""},
    pollResults: {functionCall: japi.Polls.Results, arguments: [ "POLL_UUID"], expected: ""},
    pollStop: {functionCall: japi.Polls.Stop, arguments: [ "POLL_UUID"], expected: ""},
    pollDelete: {functionCall: japi.Polls.Delete, arguments: [ "POLL ID"], expected: ""},
    templateSave: {functionCall: japi.Polls.MyTemplates.Save, arguments: [ "TEMPLATE_UUID", "TEMPLATE XML"], expected: ""},
    templateGet: {functionCall: japi.Polls.MyTemplates.Get, arguments: ["TEMPLATE_UUID"], expected: ""},
    templatesList: {functionCall: japi.Polls.MyTemplates.List, arguments: [], expected: ""},
    templatesDelete: {functionCall: japi.Polls.MyTemplates.Delete, arguments: [ "TEMPLATE_UUID"], expected: ""} 
  };

  $scope.runTests = function () {
    $scope.results = {};

    console.log("Starting tests");

    angular.forEach($scope.tests, function (value, key) {
      
      var deferred = $q.defer();
      var promise = deferred.promise;
      promise.then(function success(data) {
        $scope.tests[key].actual = data;
        //$scope.tests[key].result = ;
        value.result = (value.actual === value.expected);
      }, function (reason) {
        $scope.tests[key].result = false;
      });
/*
      $timeout(function() { 
        console.log("resolving " + key)
        deferred.resolve('bar'); }, 1000);
      });
*/
      var testFn = value.functionCall;
      var testCb = (function(deferred){
        return function(err, resultData){
          console.log("Test callback", err, resultData)
          if(err){ 
            deferred.reject(result.error);
          };
          deferred.resolve(resultData)
        }
      })(deferred);
      console.log(testCb.toString())
      value.arguments.push(testCb)
      console.log(value.arguments)
      testFn.apply(this, value.arguments)
        /*
        var onReturn = function (result) {
          if (angular.isUndefined(result.error)) {
            deferred.resolve(result);
          } else {
            deferred.reject(result.error);
          }
        } */       

    });
  };


});
