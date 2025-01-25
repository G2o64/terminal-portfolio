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
  const inputRef = useRef<HTMLInputElement>(null);

  const addToHistory = (text: string, isCommand?: boolean) => {
    setHistory(prev => [...prev, { text, isCommand }]);
  };

  const displayHelp = () => {
    Object.values(commands).forEach(cmd => {
      addToHistory(`${cmd.name} : ${cmd.description}`, true);
    });
    addToHistory('Vous pouvez utiliser la touche TAB afin de compléter une ligne de commande');
    addToHistory('Vous pouvez retrouver les anciennes commandes avec les flèches haut et bas');
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addToHistory(`guest@portfolio:~$ ${trimmedCmd}`, true);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    
    if (trimmedCmd === '') return;
    
    if (commands[trimmedCmd]) {
      commands[trimmedCmd].action();
    } else {
      addToHistory(`Commande non trouvée: ${trimmedCmd}`);
      addToHistory('Tapez "help" pour voir la liste des commandes disponibles');
    }
  };

  const handleTabCompletion = () => {
    const matchingCommands = Object.keys(commands).filter(cmd => 
      cmd.startsWith(input.toLowerCase())
    );

    if (matchingCommands.length === 1) {
      setInput(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      addToHistory('Commandes possibles:');
      matchingCommands.forEach(cmd => addToHistory(cmd));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleCommand(input);
        setInput('');
        setHistoryIndex(-1);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
        break;
        
      case 'Tab':
        e.preventDefault();
        handleTabCompletion();
        break;
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    addToHistory('Bienvenue dans mon portfolio!');
    addToHistory('Tapez "help" pour voir la liste des commandes disponibles');
    
    // Auto-scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const commands = {
    help: {
      name: 'help',
      description: 'Affiche la liste des commandes disponibles',
      action: () => displayHelp()
    },
    'a-propos': {
      name: 'a-propos',
      description: 'Affiche les informations me concernant',
      action: () => addToHistory(`Je suis un développeur passionné avec X années d'expérience...`)
    },
    clear: {
      name: 'clear',
      description: 'Nettoie le terminal',
      action: () => setHistory([])
    },
    experiences: {
      name: 'experiences',
      description: 'Affiche la liste de mes expériences',
      action: () => {
        addToHistory('Expériences professionnelles:');
        addToHistory('2023-Present: Développeur Full Stack chez...');
        addToHistory('2021-2023: Développeur Front-end chez...');
      }
    },
    'get-cv': {
      name: 'get-cv',
      description: 'Télécharge mon CV',
      action: () => {
        addToHistory('Téléchargement du CV...');
        window.open('/cv.pdf', '_blank');
      }
    },
    'get-linkedin': {
      name: 'get-linkedin',
      description: 'Lien vers mon LinkedIn',
      action: () => {
        addToHistory('Redirection vers LinkedIn...');
        window.open('https://linkedin.com/in/votre-profil', '_blank');
      }
    },
    'get-github': {
      name: 'get-github',
      description: 'Lien vers mon Github',
      action: () => {
        addToHistory('Redirection vers GitHub...');
        window.open('https://github.com/votre-profil', '_blank');
      }
    },
    passions: {
      name: 'passions',
      description: 'Affiche la liste de mes passes temps',
      action: () => {
        addToHistory('Mes passions:');
        addToHistory('- Développement web');
        addToHistory('- Nouvelles technologies');
        addToHistory('- Open source');
      }
    },
    'mes-projets': {
      name: 'mes-projets',
      description: 'Affiche la liste de mes projets personnels',
      action: () => {
        addToHistory('Projets personnels:');
        addToHistory('1. Portfolio Terminal (Ce site)');
        addToHistory('   Technologies: React, TypeScript, Tailwind');
        addToHistory('2. Autre projet...');
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleClick}
      className="bg-gray-900 text-green-400 p-4 font-mono h-screen overflow-auto"
    >
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="flex-1 text-center text-gray-400">Portfolio Terminal</span>
      </div>
      
      <div className="mt-4 pb-2">
        {history.map((line, i) => (
          <TerminalLine
            key={i}
            content={line.text}
            isCommand={line.isCommand}
          />
        ))}
        
        <div className="flex items-center">
          <span className="text-purple-400">guest@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent outline-none"
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;