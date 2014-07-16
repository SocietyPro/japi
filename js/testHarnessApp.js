var testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope) {

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
  }

  runTests($scope)
});

  function runTests($scope) {
    console.log('Starting runTests');
    console.log($scope);
		for (var prop in $scope.tests) {
			var badProp = !$scope.tests.hasOwnProperty(prop);
			if(badProp) { continue };
			var value = $scope.tests[prop]
			var testFn = value.functionCall;
			var testArgs = value.arguments;
			var testExpected = value.expected
			var testResult = null; // true: test passed. false: test failed. null: test has not completed
      console.log('Testing', prop);
      var testCallback = function(err, resultData){
        console.log("Hello from a test callback");
        if(err){
          value.result = false;
          value.errorMessage = err;
        } else {
          value.result = true;
          value.actual = resultData;
        }
      };
      //var fullArgs = new Array(testArgs);
      //fullArgs.push(testCallback);
			testArgs.push(testCallback);
      console.log(testArgs);
      testFn.apply(this, testArgs);
      
		}
	}
