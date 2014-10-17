/**
 * @license
 * Everything in this repo is MIT License unless otherwise specified.
 *
 * Copyright (c) Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen  Sawchuk, "Google, inc.".
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
