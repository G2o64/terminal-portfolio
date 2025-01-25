import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';

interface HistoryItem {
  content: string;
  type: 'command' | 'output';
}

const TerminalPortfolio = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => {
      addToHistory([
        'Commandes disponibles :',
        'help     - Affiche cette aide',
        'clear    - Nettoie le terminal',
        'about    - À propos de moi',
        'projects - Mes projets',
        'contact  - Me contacter'
      ], 'output');
    },
    clear: () => setHistory([]),
    about: () => {
      addToHistory([
        '👋 Je suis un développeur passionné',
        '🚀 Spécialisé en React, TypeScript et Node.js',
        '💼 Actuellement en recherche de nouvelles opportunités'
      ], 'output');
    }
  };

  const addToHistory = (lines: string | string[], type: 'command' | 'output') => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setHistory(prev => [...prev, ...newLines.map(content => ({ content, type }))]);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addToHistory(`$ ${cmd}`, 'command');
    
    if (trimmedCmd === '') return;
    
    if (commands[trimmedCmd]) {
      commands[trimmedCmd]();
    } else {
      addToHistory(`Commande non trouvée: ${cmd}`, 'output');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    addToHistory('Bienvenue dans mon portfolio!', 'output');
    addToHistory('Tapez "help" pour voir la liste des commandes disponibles', 'output');
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal-container min-h-screen bg-gray-900 p-4">
      <div ref={terminalRef} className="terminal max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="terminal-header flex items-center gap-2 bg-gray-800 px-4 py-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-gray-400 text-sm">guest@portfolio</div>
        </div>
        
        <div className="terminal-body bg-black/90 p-4 font-mono text-sm">
          {history.map((item, i) => (
            <div key={i} className={item.type === 'command' ? 'command-text' : 'output-text'}>
              {item.content}
            </div>
          ))}
          
          <div className="flex items-center">
            <span className="prompt-text">$ </span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent command-text outline-none ml-2"
                autoFocus
              />
              <span className="cursor absolute left-[calc(100%+8px)]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;