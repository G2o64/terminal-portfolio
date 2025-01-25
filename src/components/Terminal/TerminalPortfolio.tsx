import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';

const TerminalPortfolio = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
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
      ]);
    },
    clear: () => setHistory([]),
    about: () => {
      addToHistory([
        '👋 Je suis un développeur passionné',
        '🚀 Spécialisé en React, TypeScript et Node.js',
        '💼 Actuellement en recherche de nouvelles opportunités'
      ]);
    }
  };

  const addToHistory = (lines: string | string[]) => {
    setHistory(prev => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addToHistory(`$ ${cmd}`);
    
    if (commands[trimmedCmd]) {
      commands[trimmedCmd]();
    } else if (trimmedCmd) {
      addToHistory(`Commande non trouvée: ${cmd}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    addToHistory('Bienvenue dans mon portfolio!');
    addToHistory('Tapez "help" pour voir la liste des commandes disponibles');
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
          {history.map((line, i) => (
            <div key={i} className="text-green-400 mb-1">{line}</div>
          ))}
          
          <div className="flex items-center">
            <span className="text-green-400">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none ml-2"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;