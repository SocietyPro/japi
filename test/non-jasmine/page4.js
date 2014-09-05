var myApp = angular.module('myApp',[]);

// root object
if(Cambrian === undefined || Cambrian.isMockCambrian === true){
  throw("japi.js needs a root object Cambrian.")
};


var Cambrian = Cambrian || {}

var g_chores = {
	list: ["laundry", "lunch", "grapes", "satellite"]
};

var Add = function() {
	g_chores.list.push("nothing");
}

myApp.controller('ApiTestController', ['$scope', function($scope) {
  	$scope.greeting = 'Hola!';
    $scope.Cambrian = Cambrian;
    $scope.chores = g_chores;

    $scope.Add = function() {
    	$scope.chores.list.push("NaNgular " + (new Date())  );
    }
    $scope.Reload = function() {
    	console.log("refresh()");
    	$scope.greeting = new Date();
    }

}]);


