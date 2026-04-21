import { useState } from 'react';
import { SEALS, TONES } from '@/data/tzolkin';

type Tab = 'seals' | 'tones' | 'table';

export default function TzolkinReference() {
  const [tab, setTab] = useState<Tab>('table');
  const [selectedSeal, setSelectedSeal] = useState<number | null>(null);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'table', label: 'ТАБЛИЦА ЦОЛЬКИНА' },
    { id: 'seals', label: '20 ПЕЧАТЕЙ' },
    { id: 'tones', label: '13 ТОНОВ' },
  ];

  // Build Tzolkin table: 20 rows (seals) × 13 columns (tones), then repeated to show 260
  // Columns go: 1-13 tones, each column = one wavespell
  // Row i = seal i, column j = tone j, kin = j*20 + i + 1
  const getKin = (sealIdx: number, toneIdx: number) => toneIdx * 20 + sealIdx + 1;

  // Portal days set
  const PORTALS = new Set([
    1,2,3,4,5,6,7,8,9,10,11,12,13,
    248,247,246,245,244,243,242,241,240,239,238,237,236,
    105,121,137,153,169,185,201,217,
    104,122,136,154,168,186,200,218,
    100,126,132,158,164,190,196,222,
    99,127,131,159,163,191,195,223,
  ]);

  const sealDetail = selectedSeal !== null ? SEALS[selectedSeal] : null;
  const toneDetail = selectedTone !== null ? TONES[selectedTone] : null;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 text-xs font-bold tracking-widest rounded-md transition-all duration-200"
            style={{
              fontFamily: 'Oswald, sans-serif',
              background: tab === t.id ? 'var(--red)' : 'transparent',
              color: tab === t.id ? '#fff' : '#666',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TABLE view — like the image */}
      {tab === 'table' && (
        <div>
          <p className="text-xs text-gray-600 font-mono mb-4">
            Строки — 20 солнечных печатей · Столбцы — 13 галактических тонов · Жёлтый — портальные дни
          </p>
          <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full" style={{ minWidth: '700px', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  {/* Seal name header */}
                  <th className="sticky left-0 z-20 px-3 py-2 text-left text-xs font-mono text-gray-600"
                    style={{ background: 'rgba(10,12,20,0.98)', borderBottom: '1px solid rgba(255,255,255,0.08)', minWidth: '140px' }}>
                    ПЕЧАТЬ / ТОН
                  </th>
                  {TONES.map((tone, ti) => (
                    <th
                      key={tone.id}
                      onClick={() => setSelectedTone(ti === selectedTone ? null : ti)}
                      className="px-2 py-2 text-center cursor-pointer transition-all hover:brightness-150"
                      style={{
                        background: selectedTone === ti ? 'rgba(232,0,31,0.15)' : 'rgba(10,12,20,0.98)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        borderLeft: '1px solid rgba(255,255,255,0.04)',
                        minWidth: '46px',
                      }}
                    >
                      <div className="text-xs font-black" style={{ fontFamily: 'Oswald, sans-serif', color: selectedTone === ti ? 'var(--red)' : '#555' }}>
                        {tone.id}
                      </div>
                      <div className="text-[8px] text-gray-600 leading-tight">{tone.name.split(' ')[0]}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEALS.map((seal, si) => (
                  <tr
                    key={seal.id}
                    className="group"
                    style={{ background: selectedSeal === si ? `${seal.color}12` : 'transparent' }}
                  >
                    {/* Seal label cell */}
                    <td
                      className="sticky left-0 z-10 px-3 py-1.5 cursor-pointer transition-all"
                      onClick={() => setSelectedSeal(si === selectedSeal ? null : si)}
                      style={{
                        background: selectedSeal === si ? `${seal.color}20` : 'rgba(10,12,20,0.98)',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-sm shrink-0"
                          style={{ background: `${seal.color}25`, border: `1px solid ${seal.color}60` }}
                        >
                          {seal.emoji}
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight" style={{ color: seal.color, fontFamily: 'Oswald, sans-serif' }}>
                            {seal.id}. {seal.name.toUpperCase()}
                          </div>
                          <div className="text-[9px] text-gray-600">{seal.nahuatl}</div>
                        </div>
                      </div>
                    </td>

                    {/* Kin cells */}
                    {TONES.map((_, ti) => {
                      const kin = getKin(si, ti);
                      const isPortal = PORTALS.has(kin);
                      const isSelected = selectedSeal === si || selectedTone === ti;
                      return (
                        <td
                          key={ti}
                          className="text-center transition-all"
                          style={{
                            padding: '3px 2px',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            borderLeft: '1px solid rgba(255,255,255,0.03)',
                          }}
                        >
                          <div
                            className="mx-auto rounded text-xs font-mono font-bold flex items-center justify-center"
                            style={{
                              width: '32px',
                              height: '24px',
                              fontSize: '10px',
                              background: isPortal
                                ? 'rgba(245,200,0,0.2)'
                                : isSelected
                                ? `${seal.color}25`
                                : `${seal.color}12`,
                              color: isPortal ? '#F5C800' : isSelected ? seal.color : `${seal.color}99`,
                              border: isPortal
                                ? '1px solid rgba(245,200,0,0.45)'
                                : isSelected
                                ? `1px solid ${seal.color}50`
                                : '1px solid transparent',
                            }}
                          >
                            {kin}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel for selected seal/tone */}
          {(sealDetail || toneDetail) && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
              {sealDetail && (
                <div
                  className="rounded-lg p-4"
                  style={{ background: `${sealDetail.color}10`, border: `1px solid ${sealDetail.color}40` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{sealDetail.emoji}</div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">ПЕЧАТЬ {sealDetail.id}</div>
                      <div className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: sealDetail.color }}>
                        {sealDetail.name} · {sealDetail.nahuatl}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-display italic mb-3">{sealDetail.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { k: 'Элемент', v: sealDetail.element },
                      { k: 'Сила', v: sealDetail.power },
                      { k: 'Действие', v: sealDetail.action },
                      { k: 'Суть', v: sealDetail.essence },
                    ].map(i => (
                      <span key={i.k} className="px-2 py-0.5 rounded" style={{ background: `${sealDetail.color}15`, color: sealDetail.color }}>
                        {i.k}: {i.v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {toneDetail && (
                <div
                  className="rounded-lg p-4"
                  style={{ background: 'rgba(245,200,0,0.06)', border: '1px solid rgba(245,200,0,0.3)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg"
                      style={{ fontFamily: 'Oswald, sans-serif', background: 'rgba(245,200,0,0.15)', color: '#F5C800' }}
                    >
                      {toneDetail.id}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">ТОН {toneDetail.id}</div>
                      <div className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: '#F5C800' }}>
                        {toneDetail.name}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">{toneDetail.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { k: 'Сила', v: toneDetail.power },
                      { k: 'Действие', v: toneDetail.action },
                      { k: 'Суть', v: toneDetail.essence },
                    ].map(i => (
                      <span key={i.k} className="px-2 py-0.5 rounded" style={{ background: 'rgba(245,200,0,0.1)', color: '#F5C800' }}>
                        {i.k}: {i.v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SEALS view */}
      {tab === 'seals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {SEALS.map((seal) => (
            <div
              key={seal.id}
              className="rounded-lg p-4 transition-all hover:brightness-110 cursor-default"
              style={{
                background: `${seal.color}0D`,
                border: `1px solid ${seal.color}35`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${seal.color}20`, border: `1.5px solid ${seal.color}` }}
                >
                  {seal.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xs font-mono text-gray-600">{seal.id}.</span>
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: 'Oswald, sans-serif', color: seal.color }}
                    >
                      {seal.name.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-600">{seal.nahuatl}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-display italic mb-2">
                    {seal.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {[
                      { label: seal.element },
                      { label: seal.power },
                      { label: seal.action },
                    ].map((t, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded"
                        style={{ background: `${seal.color}18`, color: seal.color, border: `1px solid ${seal.color}30` }}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TONES view */}
      {tab === 'tones' && (
        <div className="grid grid-cols-1 gap-3">
          {TONES.map((tone) => {
            const hue = (tone.id - 1) * (360 / 13);
            const col = `hsl(${hue}, 70%, 60%)`;
            return (
              <div
                key={tone.id}
                className="rounded-lg p-4 flex items-start gap-4 transition-all hover:brightness-110"
                style={{
                  background: `hsla(${hue}, 70%, 60%, 0.06)`,
                  border: `1px solid hsla(${hue}, 70%, 60%, 0.25)`,
                }}
              >
                {/* Tone number */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl shrink-0"
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    background: `hsla(${hue}, 70%, 60%, 0.15)`,
                    border: `1.5px solid ${col}`,
                    color: col,
                  }}
                >
                  {tone.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: 'Oswald, sans-serif', color: col }}
                    >
                      ТОН {tone.id} · {tone.name.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{tone.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { k: 'Сила', v: tone.power },
                      { k: 'Действие', v: tone.action },
                      { k: 'Суть', v: tone.essence },
                    ].map(i => (
                      <span
                        key={i.k}
                        className="px-2 py-0.5 rounded"
                        style={{ background: `hsla(${hue}, 70%, 60%, 0.1)`, color: col, border: `1px solid hsla(${hue}, 70%, 60%, 0.3)` }}
                      >
                        {i.k}: {i.v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
