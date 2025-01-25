import React, { useState, useRef, useEffect } from 'react';
import TerminalLine from './TerminalLine';
import { createCommands } from './commands';
import { Command, HistoryItem } from './types';

const TerminalPortfolio = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  const addToHistory = (text: string, isCommand?: boolean) => {
    setHistory(prev => [...prev, { text, isCommand }]);
  };

  const commands = createCommands(addToHistory);

  // ... reste du code du terminal

  return (
    <div className="bg-gray-900 text-green-400 p-4 font-mono h-screen overflow-auto">
      {/* ... JSX du terminal */}
    </div>
  );
};

export default TerminalPortfolio;