        <div 
          className={`terminal-body p-4 font-mono text-sm ${
            theme === 'dofus' ? 'bg-[#1a0f0f]' : 'bg-black/90'
          }`}
        >
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
                spellCheck="false"
              />
              <span className="cursor absolute left-[calc(100%+8px)]"></span>
            </div>
          </div>
        </div>