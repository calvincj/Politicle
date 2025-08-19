interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayClickSound?: () => void;
}

export default function HowToPlayModal({ isOpen, onClose, onPlayClickSound }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-[100]">
      {/* Solid white backdrop */}
      <div className="absolute inset-0 w-full h-full bg-white border-2 border-gray-300"></div>
      
      {/* Modal content */}
      <div className="relative w-full h-full overflow-y-auto flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 text-center">How to Play 📚</h2>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6 pl-8 pr-32">
            {/* Objective */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Objective</h3>
              <ul className="space-y-2 text-gray-700 text-left">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>Guess the target country by clicking on the world map.</span>
                </li>
              </ul>
            </div>

            {/* Feedback Indicators */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Feedback Metrics</h3>
              <ul className="space-y-2 text-gray-700 text-left">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>💰 GDP per Capita: average economic output per person, in US dollars.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>👥 Population: total number of people living in the country.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>🏛️ Liberal Democracy Index: a higher score means the country is more democratic.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>The data for these three metrics comes from the <a href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">World Bank</a>, <a href="https://population.un.org/wpp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">United Nations</a> and <a href="https://composite-indicators.jrc.ec.europa.eu/explorer/indices/ldi/liberal-democracy-index" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">V-dem</a>.</span>
                </li>
              </ul>
            </div>

            {/* Hint Button */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 Hint Button</h3>
              <ul className="space-y-2 text-gray-700 text-left">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-10">•</span>
                  <span>Click the <strong>Hint</strong> button to reveal the government type of the target country (e.g., "Constitutional Monarchy").</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="text-center">
            <button
              onClick={() => {
                onPlayClickSound?.();
                onClose();
              }}
              className="px-6 py-2 bg-transparent border-none text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium focus:outline-none"
            >
              Got it! Let's Play 🎮
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
