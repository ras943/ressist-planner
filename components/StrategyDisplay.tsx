import React from 'react';
import { Strategy } from '../types';

interface StrategyDisplayProps {
  strategy: Strategy;
}

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ strategy }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 animate-fade-in shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
          {strategy.title}
        </h2>
        <p className="mt-3 text-gray-300 max-w-3xl mx-auto">
          {strategy.overview}
        </p>
      </div>

      <div className="mb-8 p-6 bg-black/10 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-purple-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Target Audience Analysis
        </h3>
        <p className="mt-2 text-gray-300">{strategy.targetAudienceAnalysis}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-center mb-6 text-purple-300">Actionable Steps</h3>
        <div className="space-y-6">
          {strategy.steps.map((step, index) => (
            <div key={index} className="bg-black/10 p-6 rounded-xl border border-white/10 transform transition-transform duration-300 hover:scale-[1.02] hover:border-purple-500/50">
              <h4 className="text-xl font-bold text-pink-400">{`Step ${index + 1}: ${step.title}`}</h4>
              <p className="mt-3 text-gray-200">{step.description}</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-purple-400">Rationale</p>
                <p className="mt-1 text-sm text-gray-300">{step.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyDisplay;