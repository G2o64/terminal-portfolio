import React, { useState, useRef, useEffect } from 'react';
import TerminalLine from './TerminalLine';
import { Command, HistoryItem } from './types';
import '../styles/terminal.css';

const TerminalPortfolio = () => {
  // ... (state reste le même)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8 flex items-center justify-center">
      <div 
        ref={terminalRef}
        onClick={handleClick}
        className="terminal w-full max-w-4xl h-[80vh] p-4 text-sm sm:text-base overflow-auto relative"
      >
        {/* Terminal Header */}
        <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded sticky top-0 backdrop-blur">
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110"></button>
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110"></button>
            <button className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110"></button>
          </div>
          <span className="flex-1 text-center text-gray-400 text-sm">guest@portfolio — zsh</span>
        </div>
        
        {/* Terminal Content */}
        <div className="mt-4 pb-2 font-mono">
          {history.map((line, i) => (
            <div key={i} className="terminal-line">
              <TerminalLine
                content={line.text}
                isCommand={line.isCommand}
              />
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-center mt-1 terminal-line">
            <span className="text-purple-400">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 ml-2 bg-transparent outline-none text-green-400 caretColor-green-400"
              autoFocus
              spellCheck={false}
            />
            <span className="terminal-cursor text-green-400">▋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;