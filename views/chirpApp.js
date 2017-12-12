var app = angular.module('chirpApp', ['ui.router', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
//	$rootScope.current_user = '';
	
});


app.config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/')

            $stateProvider.state('inner', {
                url: '/inner',
                templateUrl: 'inner'
            })
            
        });

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function(postService, $scope, $rootScope){
   	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};
	
	$scope.post = function() {
	  $scope.newPost.created_by = $rootScope.current_user;
	  $scope.newPost.created_at = Date.now();
	  postService.save($scope.newPost, function(){
	    $scope.posts = postService.query();
	    $scope.newPost = {created_by: '', text: '', created_at: ''};
	  });
	};
});
//app.controller('myCtrl', function($scope){
//     $scope.name = "John Doe";
////	$scope.posts = postService.query();
////	$scope.newPost = {created_by: '', text: '', created_at: ''};
//	
////	$scope.post = function() {
////	  $scope.newPost.created_by = $rootScope.current_user;
////	  $scope.newPost.created_at = Date.now();
////	  postService.save($scope.newPost, function(){
////	    $scope.posts = postService.query();
////	    $scope.newPost = {created_by: '', text: '', created_at: ''};
////	  });
////	};
//});