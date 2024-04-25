// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Struct {
    struct Todo {
        string name;
        bool done;
    }

    Todo[] public todos;

    function addTodo(string memory _name) public {
        // todos.push(Todo(_name, false));
        Todo memory todo;
        todo.name = _name;
        todos.push(todo);
    }
    function get(uint _i) public view returns(string memory name, bool done) {
        Todo memory todo = todos[_i];
        return (todo.name, todo.done);
    }
    function toggleDone(uint _i) public {
        Todo storage todo = todos[_i];
        todo.done = !todo.done;
    }
    function updateName(uint _i, string memory _name) public {
        Todo storage todo = todos[_i];
        todo.name = _name; 
    }
}