import React from 'react';
import { Clock } from './components/Clock';
import { PomodoroTimer } from './components/PomodoroTimer';
import { TodoList } from './components/TodoList';
import { QuickNotes } from './components/QuickNotes';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Task Management Dashboard
          </h1>
          <p className="text-xl text-white/80">
            Stay productive with timers, todos, and notes
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* First Row */}
          <div className="xl:col-span-1">
            <Clock />
          </div>
          
          <div className="xl:col-span-1">
            <PomodoroTimer />
          </div>

          {/* Second Row - Todo List spans 2 columns on xl screens */}
          <div className="lg:col-span-2 xl:col-span-1 xl:row-span-2">
            <TodoList />
          </div>

          {/* Third Row - Quick Notes spans full width on smaller screens */}
          <div className="lg:col-span-2 xl:col-span-2">
            <QuickNotes />
          </div>
        </div>

        <footer className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Built with React hooks: useState, useRef, useEffect, and custom hooks
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;