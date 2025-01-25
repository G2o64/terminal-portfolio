export interface Command {
  name: string;
  description: string;
  action: () => void;
}

export interface HistoryItem {
  text: string;
  isCommand?: boolean;
}