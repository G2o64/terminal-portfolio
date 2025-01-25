// ... reste du code inchangé

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
              {/* Curseur placé après l'input */}
              <span className="cursor absolute left-[calc(100%+8px)]"></span>
            </div>
          </div>

// ... reste du code inchangé
