import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function FloatingAIButton() {
  return (
    <Link
      to="/ai-assistant"
      className="fixed bottom-6 right-6 z-50 bg-blue-accent text-dark-blue-primary p-4 rounded-full shadow-2xl hover:bg-blue-400 transition-all duration-300 hover:scale-110 group"
      title="AI Design Assistant"
    >
      <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-blue-primary text-white text-sm px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        AI Assistant
      </span>
    </Link>
  );
}
