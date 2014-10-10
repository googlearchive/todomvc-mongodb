/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('todoCtrl', ['$scope', '$filter', 'todoStorage', function ($scope, $filter, todoStorage) {
		$scope.todos = {};
		todoStorage.get().success(function(data) {
			$scope.todos = data;
		});

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
			$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		$scope.addTodo = function () {
			if (!$scope.newTodo.trim().length) {
				return;
			}
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};
			todoStorage.post(newTodo).success(function(data) {
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
			todoStorage.put(todo._id, todo);
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
				todoStorage.put(todo._id, newTodo);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			todoStorage.delete(todo).success(function(data) {
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
				todoStorage.put(todo._id, 
					{title: todo.title, completed: todo.completed});
			});
			todoStorage.get().success(function(data) {
				$scope.todos = data;
			});

		};
	}]);