import React, { useState } from 'react';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFocusOnMount } from '../hooks/useFocusOnMount';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useFocusOnMount<HTMLInputElement>();

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [todo, ...prev]);
      setNewTodo('');
      setIsAdding(false);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTodo('');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ListTodo className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Todo List</h2>
        </div>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter new task..."
            className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={addTodo}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewTodo('');
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-white/60 text-center py-8">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                {todo.completed && <Check className="h-3 w-3 text-white" />}
              </button>
              
              <span
                className={`flex-1 transition-all duration-200 ${
                  todo.completed
                    ? 'text-white/60 line-through'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}