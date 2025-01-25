import { Command } from './types';

export const createCommands = (addToHistory: (text: string) => void): Record<string, Command> => ({
  'help': {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    action: () => {/* will be set in TerminalPortfolio */}
  },
  'a-propos': {
    name: 'a-propos',
    description: 'Affiche les informations me concernant',
    action: () => addToHistory('Information about me goes here...')
  },
  // ... autres commandes
});