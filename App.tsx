import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StrategyForm from './components/StrategyForm';
import StrategyDisplay from './components/StrategyDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { Strategy } from './types';
import { generateStrategy } from './services/geminiService';

const App: React.FC = () => {
  const [strategy, setStrategy] = useState<Strategy | null>(() => {
    try {
      const storedStrategy = localStorage.getItem('strategy');
      return storedStrategy ? JSON.parse(storedStrategy) : null;
    } catch (error) {
      console.error("Failed to parse strategy from localStorage", error);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (strategy) {
      localStorage.setItem('strategy', JSON.stringify(strategy));
    } else {
      localStorage.removeItem('strategy');
    }
  }, [strategy]);

  const handleGenerate = async (input: { topic: string; goal: string; audience: string }) => {
    setLoading(true);
    setError(null);
    setStrategy(null);
    try {
      const generatedStrategy = await generateStrategy(input);
      setStrategy(generatedStrategy);
    } catch (err) {
      setError('Failed to generate strategy. The model may be unavailable or the request timed out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setStrategy(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans text-gray-200 antialiased p-4">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8">
          <StrategyForm onSubmit={handleGenerate} loading={loading} />
          
          <div className="mt-12 text-center">
            {loading && <LoadingSpinner />}
            
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl">{error}</div>}
            
            {strategy && (
              <>
                <StrategyDisplay strategy={strategy} />
                <div className="text-center mt-8">
                  <button 
                    onClick={handleClear}
                    className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105"
                  >
                    Clear Strategy
                  </button>
                </div>
              </>
            )}

            {!loading && !strategy && !error && (
              <div className="text-center text-gray-400/80">
                <p>Fill out the form above to create your first strategy.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;