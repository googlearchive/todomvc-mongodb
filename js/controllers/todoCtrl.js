/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc', [])
	.controller('todoCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
		$scope.todos = {};
		$http.get('/api/todos').success(function(data) {
			$scope.todos = data;
		});

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
			$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';

			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : null;
		});

		$scope.addTodo = function () {
			if (!$scope.newTodo.trim().length) {
				return;
			}
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};
			$http.post('/api/todos', newTodo).success(function(data) {
				$scope.newTodo = '';
				$scope.todos = data;
			});
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);

		};

		$scope.toggleTodo = function(todo) {
			todo.completed = !todo.completed;
			$http.put('/api/todos/' +  todo._id, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();
			if (!todo.title) {
				$scope.removeTodo(todo);
			} else {
				var newTodo = {
					title: todo.title,
					completed: todo.completed
				};
				$http.put('/api/todos/' +  todo._id, newTodo);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			$http.delete('/api/todos/' + todo._id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.clearCompletedTodos = function () {
			$scope.todos.forEach(function(todo) {
				if (todo.completed) {
					$scope.removeTodo(todo);
				}
			});
		};

		$scope.markAll = function (completed) {
			$scope.todos.forEach(function (todo) {
				todo.completed = !completed;
				$http.put('/api/todos/' +  todo._id, 
					{title: todo.title, completed: todo.completed});
			});
			$http.get('/api/todos').success(function(data) {
				$scope.todos = data;
			});

		};
	}]);