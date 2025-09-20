import React, { useState } from 'react';

interface StrategyFormProps {
  onSubmit: (data: { topic: string; goal: string; audience: string }) => void;
  loading: boolean;
}

const StrategyForm: React.FC<StrategyFormProps> = ({ onSubmit, loading }) => {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !goal || !audience || loading) return;
    onSubmit({ topic, goal, audience });
  };

  const InputField: React.FC<{id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder: string; required?: boolean; isTextArea?: boolean;}> = ({ id, label, value, onChange, placeholder, required, isTextArea }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {isTextArea ? (
         <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={2}
            className="block w-full bg-white/5 border border-white/10 rounded-lg shadow-xl text-white placeholder-gray-400/80 p-3 transition duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      ) : (
        <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="block w-full bg-white/5 border border-white/10 rounded-lg shadow-xl text-white placeholder-gray-400/80 p-3 transition duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      )}
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
            id="topic"
            label="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Content strategy for a B2B SaaS company"
            required
        />
        <InputField 
            id="goal"
            label="Primary Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Generate 500 qualified leads per month"
            required
            isTextArea
        />
        <InputField 
            id="audience"
            label="Target Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g., CTOs and marketing managers in the tech industry"
            required
            isTextArea
        />
        <div>
          <button
            type="submit"
            disabled={loading || !topic || !goal || !audience}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:bg-gray-600/50 disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? 'Generating...' : 'Generate Strategy'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StrategyForm;