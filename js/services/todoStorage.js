/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todoStorageModule', [])
	.factory('todoStorage', ['$http', function ($http) {
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		return {
			get: function () {
				console.log('Getting todos');
				$http.get('/api/todos').success(function(data) {
					console.log(data);
				}).error(function(data) {
					console.log('Error: ' + data);
				});
				return $http.get('/api/todos');
				//return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			put: function (todos) {
				$http.post('/api/todos', todos).success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
				//localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
				return $http.post('/api/todos', todos);
			}
		};
	}]);
