
(function() {
  angular.module('mean-todos')
        .factory('TodoService', TodoService);

  TodoService.$inject = ['$http'];

  function TodoService($http){
    init();
    var todos = [];
    return {
      get: getAllTodos,
      create: createOneTodo,
      update: updateOneTodo,
      delete: deleteOneTodo
    };

    function init(){ //this is going to make our first data request upon file load
      $http.get('/todos')
            .then(function(response){
              todos = response.data.todos;
            })
            .catch(function(err){
              console.log(err);
            });
    }
    function getAllTodos(){
      return todos;
    }
    function createOneTodo(todo){
      $http.post('/todos', todo)
          .then(function(response){
            todos.push(todo);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function updateOneTodo(index, updatedTodo){
      $http.put('/todos/' + updatedTodo._id, updatedTodo)
          .then(function(){
            todos.splice(index, 1, updatedTodo);
          })
          .catch(function(err){
            console.log(err);
          });

    }
    function deleteOneTodo(index, deletedTodo){
      $http.delete('/todos/' + deletedTodo._id)
            .then(function(){
              todos.splice(index, 1);
            })
            .catch(function(err){
              console.log(err);
            });
    }
  }
}());
