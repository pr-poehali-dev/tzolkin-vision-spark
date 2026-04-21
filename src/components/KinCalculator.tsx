import { useState } from 'react';
import { calculateKin, SEALS, TONES } from '@/data/tzolkin';
import Icon from '@/components/ui/icon';

interface KinResult {
  kin: number;
  seal: typeof SEALS[0];
  tone: typeof TONES[0];
  isPortal: boolean;
}

interface Props {
  onKinCalculated?: (kin: number) => void;
}

export default function KinCalculator({ onKinCalculated }: Props) {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<KinResult | null>(null);
  const [animating, setAnimating] = useState(false);

  const calculate = () => {
    if (!birthDate) return;
    setAnimating(true);
    setTimeout(() => {
      const date = new Date(birthDate);
      const res = calculateKin(date);
      setResult(res);
      onKinCalculated?.(res.kin);
      setAnimating(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 rounded text-white font-mono text-sm focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              colorScheme: 'dark',
            }}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <button
          onClick={calculate}
          disabled={!birthDate || animating}
          className="px-6 py-3 font-bold text-sm tracking-widest rounded transition-all duration-200 disabled:opacity-50"
          style={{
            background: birthDate ? 'var(--red)' : 'rgba(232,0,31,0.3)',
            color: '#fff',
            fontFamily: 'Oswald, sans-serif',
            border: '1px solid var(--red)',
          }}
        >
          {animating ? '...' : 'РАССЧИТАТЬ'}
        </button>
      </div>

      {/* Result */}
      {result && !animating && (
        <div
          className="rounded-lg p-6 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, rgba(10,12,20,0.95) 0%, rgba(20,15,35,0.95) 100%)',
            border: `1px solid ${result.seal.color}`,
            boxShadow: `0 0 30px ${result.seal.color}30`,
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl shrink-0"
              style={{ background: `${result.seal.color}22`, border: `2px solid ${result.seal.color}` }}
            >
              {result.seal.emoji}
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono mb-1" style={{ color: result.seal.color }}>
                КИН СУДЬБЫ
              </div>
              <div
                className="text-5xl font-black mb-1"
                style={{ fontFamily: 'Oswald, sans-serif', color: result.seal.color, textShadow: `0 0 20px ${result.seal.color}80` }}
              >
                {result.kin}
              </div>
              <div className="text-xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {result.tone.name} {result.seal.name}
              </div>
              <div className="text-sm text-gray-400 font-mono">{result.seal.nahuatl}</div>
            </div>
          </div>

          {/* Portal badge */}
          {result.isPortal && (
            <div
              className="mb-4 px-4 py-2 rounded text-center text-sm font-bold tracking-widest"
              style={{
                background: 'linear-gradient(90deg, rgba(245,200,0,0.1), rgba(245,200,0,0.2), rgba(245,200,0,0.1))',
                border: '1px solid rgba(245,200,0,0.5)',
                color: '#F5C800',
                fontFamily: 'Oswald, sans-serif',
              }}
            >
              ✦ ПОРТАЛЬНЫЙ ДЕНЬ ЦОЛЬКИНА ✦
            </div>
          )}

          {/* Grid of characteristics */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'ПЕЧАТЬ', value: result.seal.name, sub: result.seal.element },
              { label: 'ТОН', value: result.tone.name, sub: `Тон ${result.tone.id}` },
              { label: 'СИЛА', value: result.tone.power, sub: result.tone.action },
              { label: 'СУТЬ', value: result.seal.essence, sub: result.tone.essence },
            ].map(item => (
              <div
                key={item.label}
                className="rounded p-3"
                style={{ background: `${result.seal.color}10`, border: `1px solid ${result.seal.color}30` }}
              >
                <div className="text-xs text-gray-500 font-mono mb-1">{item.label}</div>
                <div className="text-sm font-bold text-white">{item.value}</div>
                <div className="text-xs text-gray-400">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            className="rounded p-4"
            style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${result.seal.color}` }}
          >
            <div className="text-xs font-mono text-gray-500 mb-2">ОПИСАНИЕ ЭНЕРГИИ</div>
            <p className="text-sm text-gray-300 leading-relaxed font-display italic">{result.seal.description}</p>
          </div>

          {/* Tone description */}
          <div className="mt-3 rounded p-4" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid rgba(245,200,0,0.5)' }}>
            <div className="text-xs font-mono text-gray-500 mb-2">ТОН {result.tone.id} — {result.tone.name.toUpperCase()}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{result.tone.description}</p>
            <div className="mt-2 flex gap-4 text-xs">
              <span style={{ color: '#F5C800' }}>Сила: {result.tone.power}</span>
              <span style={{ color: '#88CCFF' }}>Действие: {result.tone.action}</span>
            </div>
          </div>
        </div>
      )}

      {!result && !animating && (
        <div className="text-center py-8 text-gray-600">
          <div className="text-4xl mb-3 opacity-30">🌀</div>
          <div className="text-sm font-mono">Введи дату рождения для расчёта Кина Судьбы</div>
        </div>
      )}

      {animating && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3 animate-spin-slow">🌀</div>
          <div className="text-sm font-mono neon-red">Рассчитываю твою вибрацию...</div>
        </div>
      )}
    </div>
  );
}
