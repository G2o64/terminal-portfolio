import React from 'react';

interface TerminalLineProps {
  content: string;
  isCommand?: boolean;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ content, isCommand }) => {
  if (isCommand) {
    const [command, ...descriptionParts] = content.split(':');
    const description = descriptionParts.join(':');
    return (
      <div className="whitespace-pre-wrap">
        <span className="text-red-500">{command}</span>
        {description && <span className="text-green-400">:{description}</span>}
      </div>
    );
  }
  return <div className="whitespace-pre-wrap text-green-400">{content}</div>;
};

export default TerminalLine;