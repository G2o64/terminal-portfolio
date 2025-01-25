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
    action: () => {
      addToHistory('--- À Propos de Moi ---');
      addToHistory('Je suis un développeur passionné par les nouvelles technologies.');
      addToHistory('Spécialisé en développement web full-stack avec une expertise en:');
      addToHistory('- Frontend: React, TypeScript, Tailwind CSS');
      addToHistory('- Backend: Node.js, Express, PostgreSQL');
    }
  },
  'clear': {
    name: 'clear',
    description: 'Nettoie le terminal',
    action: () => {/* will be set in TerminalPortfolio */}
  },
  'experiences': {
    name: 'experiences',
    description: 'Affiche la liste de mes expériences',
    action: () => {
      addToHistory('--- Expériences Professionnelles ---');
      addToHistory('2023-Présent: Développeur Full Stack');
      addToHistory('- Développement d\'applications web modernes');
      addToHistory('- Stack technique: React, Node.js, PostgreSQL');
      addToHistory('\n2021-2023: Développeur Frontend');
      addToHistory('- Création d\'interfaces utilisateur responsives');
      addToHistory('- Stack technique: React, TypeScript, Tailwind');
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
  'passions': {
    name: 'passions',
    description: 'Affiche la liste de mes passes temps',
    action: () => {
      addToHistory('--- Mes Passions ---');
      addToHistory('• Développement Open Source');
      addToHistory('  - Contribution à des projets communautaires');
      addToHistory('  - Partage de connaissances via GitHub');
      addToHistory('\n• Nouvelles Technologies');
      addToHistory('  - Veille technologique active');
      addToHistory('  - Expérimentation avec les derniers frameworks');
      addToHistory('\n• Apprentissage Continu');
      addToHistory('  - Formation régulière sur les nouvelles technologies');
      addToHistory('  - Participation à des hackathons');
    }
  },
  'mes-projets': {
    name: 'mes-projets',
    description: 'Affiche la liste de mes projets personnels',
    action: () => {
      addToHistory('--- Projets Personnels ---');
      addToHistory('1. Portfolio Terminal (Ce site)');
      addToHistory('   • React, TypeScript, Tailwind');
      addToHistory('   • Interface inspirée des terminaux Unix');
      addToHistory('\n2. Projet E-commerce');
      addToHistory('   • Next.js, Prisma, PostgreSQL');
      addToHistory('   • Authentification, paiements, panel admin');
      addToHistory('\n3. Application Mobile');
      addToHistory('   • React Native, Firebase');
      addToHistory('   • Disponible sur iOS et Android');
    }
  },
  'themes': {
    name: 'themes',
    description: 'Change le theme du terminal',
    action: () => {
      addToHistory('Thèmes disponibles:');
      addToHistory('1. Classic (default)');
      addToHistory('2. Monokai');
      addToHistory('3. Dracula');
      addToHistory('\nUtilisation: themes [nom-du-theme]');
    }
  }
});