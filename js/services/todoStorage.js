/*global angular */

/**
 * Services that persists and retrieves TODOs from mongodb through node API.
 */
angular.module('todomvc', [])
	.service('todoStorage', ['$http', function ($http) {
		'use strict';

		return {
			get: function () {
				return $http.get('/api/todos');
			},

			delete: function (todo) {
				return $http.delete('/api/todos/' + todo._id);
			},

			post: function (todo) {
				return $http.post('/api/todos', todo);
			},

			put: function(todoId, newTodo) {
				return $http.put('/api/todos/' +  todoId, newTodo);
			}
		};
	}]);
