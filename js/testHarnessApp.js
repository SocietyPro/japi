testHarness = angular.module("testHarnessApp", [])
.controller("testCtrl", function ($scope) {
	
	var japi = new Japi();

	$scope.tests = {
		peerPing: [japi.Peer.Ping, "", ""],
		peerListing: [japi.PeerList.List, "", ""],
        savePeerListing: [japi.PeerList.Save, "PeerList UUID, XML", ""]
		getPeerList: [japi.PeerList.Get, "PeerList ID", ""],
		deletePeerList: [japi.PeerList.Delete, "PeerList ID", ""],
		pollResults: [japi.Peer.Polls.Results, "JID/Cambrian ID, POLL ID", ""],
		pollSave: [japi.Polls.Save, "POLL_UUID, POLL XML", ""],
		pollsList: [japi.Polls.List, "", ""],
		pollGet: [japi.Polls.Get, "POLL_UUID", ""],
		pollStart: [japi.Polls.Start, "POLL_UUID", ""],
		pollResults: [japi.Polls.Results, "POLL_UUID", ""],
		pollStop: [japi.Polls.Stop, "POLL_UUID", ""],
		pollDelete: [japi.Polls.Delete, "POLL ID"],
		templateSave: [japi.Polls.MyTemplates.Save, "TEMPLATE_UUID, TEMPLATE XML", ""],
		templateGet: [japi.Polls.MyTemplates.Get, "TEMPLATE_UUID", ""],
		templatesList: [japi.Polls.MyTemplates.List, "", ""],
		templatesDelete: [japi.Polls.MyTemplates.Delete, "TEMPLATE_UUID", ""] }

	$scope.results = [];
	/* One result object:
	{
		title: peerPing,
		call: japi.Peer.Ping,
		args: "",
		expected: undefined,
		result: true
	}
	*/
	$scope.test = function () {
		for (var prop in $scope.tests) {
			var badProp = !$scope.tests.hasOwnProperty[prop];
			if(badProp) { continue };
			var value = $scope.tests[prop]
			var testFn = value[0];
			var testArgs = value[1];
			var testExpected = value[2];
			var testResult = null; // true: test passed. false: test failed. null: test has not completed
			var result = testFn(testArgs);
			if(result === testExpected){
				testResult = true;
			} else {
				testResult = false;
			}
		}
	}
});