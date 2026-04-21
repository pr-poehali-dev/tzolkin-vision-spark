import { useState } from 'react';
import { SEALS, TONES, getTzolkinDay, PORTAL_DAYS } from '@/data/tzolkin';

interface TzolkinMatrixProps {
  highlightKin?: number;
}

export default function TzolkinMatrix({ highlightKin }: TzolkinMatrixProps) {
  const [hoveredKin, setHoveredKin] = useState<number | null>(null);
  const todayKin = getTzolkinDay(new Date()).kin;

  const getKin = (col: number, row: number) => col * 20 + row + 1;

  const hoveredData = hoveredKin
    ? {
        kin: hoveredKin,
        seal: SEALS[(hoveredKin - 1) % 20],
        tone: TONES[(hoveredKin - 1) % 13],
        isPortal: PORTAL_DAYS.has(hoveredKin),
      }
    : null;

  return (
    <div className="w-full">
      <div className="flex gap-3">
        {/* Matrix Grid: 13 columns (tones) × 20 rows (seals) */}
        <div className="flex-1 overflow-x-auto">
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(13, 1fr)', minWidth: '520px' }}>
            {Array.from({ length: 13 }, (_, col) =>
              Array.from({ length: 20 }, (_, row) => {
                const kin = getKin(col, row);
                const seal = SEALS[row];
                const tone = TONES[col];
                const isPortal = PORTAL_DAYS.has(kin);
                const isToday = kin === todayKin;
                const isHighlight = kin === highlightKin;
                const isHovered = kin === hoveredKin;

                return (
                  <div
                    key={kin}
                    className={`tzolkin-cell aspect-square flex items-center justify-center text-[10px] font-mono font-bold relative rounded-sm
                      ${isPortal ? 'portal' : ''}
                      ${isToday ? 'active animate-pulse-glow' : ''}
                    `}
                    style={{
                      backgroundColor: isHighlight
                        ? 'var(--red)'
                        : isToday
                        ? 'rgba(232,0,31,0.6)'
                        : isPortal
                        ? 'rgba(245,200,0,0.15)'
                        : `${seal.color}22`,
                      border: isHighlight
                        ? '2px solid var(--red)'
                        : isToday
                        ? '2px solid #E8001F'
                        : isPortal
                        ? '1px solid rgba(245,200,0,0.4)'
                        : '1px solid rgba(255,255,255,0.04)',
                      opacity: isHovered ? 1 : 0.85,
                    }}
                    onMouseEnter={() => setHoveredKin(kin)}
                    onMouseLeave={() => setHoveredKin(null)}
                    title={`Кин ${kin}: ${tone.name} ${seal.name}`}
                  >
                    <span style={{ color: isHighlight || isToday ? '#fff' : seal.color, fontSize: '9px' }}>
                      {kin}
                    </span>
                    {isPortal && !isToday && !isHighlight && (
                      <span className="absolute top-0 right-0 w-[3px] h-[3px] rounded-full bg-yellow-400" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Hover tooltip */}
        <div className="w-44 shrink-0">
          {hoveredData ? (
            <div
              className="sticky top-4 rounded border p-3 animate-fade-in-up"
              style={{ borderColor: hoveredData.seal.color, backgroundColor: 'rgba(10,12,20,0.95)' }}
            >
              <div className="text-3xl mb-1">{hoveredData.seal.emoji}</div>
              <div className="text-xs font-mono mb-1" style={{ color: hoveredData.seal.color }}>
                КИН {hoveredData.kin}
              </div>
              <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {hoveredData.tone.name} {hoveredData.seal.name}
              </div>
              <div className="text-xs text-gray-400 mb-2">{hoveredData.seal.nahuatl}</div>
              {hoveredData.isPortal && (
                <div className="text-xs px-2 py-0.5 rounded text-center mb-2" style={{ background: 'rgba(245,200,0,0.2)', color: '#F5C800' }}>
                  ✦ Портальный день
                </div>
              )}
              <div className="text-xs text-gray-300 leading-relaxed">{hoveredData.seal.description}</div>
              <div className="mt-2 text-xs" style={{ color: hoveredData.seal.color }}>
                Сила: {hoveredData.tone.power}
              </div>
            </div>
          ) : (
            <div className="sticky top-4 rounded border border-dashed border-gray-700 p-3 text-center">
              <div className="text-2xl mb-2 opacity-50">🌀</div>
              <div className="text-xs text-gray-500">Наведи на ячейку для информации</div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm animate-pulse-glow" style={{ background: 'rgba(232,0,31,0.6)', border: '1px solid #E8001F' }} />
          <span>Сегодняшний день</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm relative" style={{ background: 'rgba(245,200,0,0.15)', border: '1px solid rgba(245,200,0,0.4)' }}>
            <span className="absolute top-0 right-0 w-[3px] h-[3px] rounded-full bg-yellow-400" />
          </div>
          <span>Портальный день</span>
        </div>
        {highlightKin && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm" style={{ background: 'var(--red)', border: '2px solid var(--red)' }} />
            <span>Твой Кин {highlightKin}</span>
          </div>
        )}
      </div>
    </div>
  );
}
