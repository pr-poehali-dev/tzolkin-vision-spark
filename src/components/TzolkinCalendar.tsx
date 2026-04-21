import { useState } from 'react';
import { getTzolkinDay, PORTAL_DAYS } from '@/data/tzolkin';
import Icon from '@/components/ui/icon';

export default function TzolkinCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const dayData = getTzolkinDay(selectedDate);
  const isPortal = PORTAL_DAYS.has(dayData.kin);

  const navigate = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const isToday = selectedDate.toDateString() === today.toDateString();

  // Daily recommendations based on seal+tone
  const recommendations: Record<string, string[]> = {
    'Магнитный': ['Поставь намерение на новый цикл', 'Медитируй на единство', 'Притяни желаемое'],
    'Лунный': ['Найди баланс в противоположностях', 'Исследуй свои вызовы', 'Стабилизируй основу'],
    'Электрический': ['Служи другим с радостью', 'Активируй свои таланты', 'Соединяй людей'],
    'Самосуществующий': ['Определи свои цели', 'Изучи структуру проблемы', 'Создай чёткий план'],
    'Обертональный': ['Собери внутренние силы', 'Центрируйся в себе', 'Наполни других энергией'],
    'Ритмический': ['Организуй своё пространство', 'Найди ритм дня', 'Уравновесь крайности'],
    'Резонантный': ['Прислушайся к интуиции', 'Настройся на высшие сигналы', 'Направь вдохновение'],
    'Галактический': ['Воплощай свои ценности', 'Живи в целостности', 'Гармонизируй отношения'],
    'Солнечный': ['Реализуй намеченное', 'Будь пульсом перемен', 'Осуществи задуманное'],
    'Планетарный': ['Проявляй своё видение', 'Совершенствуй мастерство', 'Манифестируй реальность'],
    'Спектральный': ['Отпусти лишнее', 'Освободись от ограничений', 'Растворяй блоки'],
    'Кристальный': ['Сотрудничай с командой', 'Посвяти себя общему делу', 'Строй универсальность'],
    'Космический': ['Благодари за опыт', 'Выйди за пределы', 'Трансцендируй ограничения'],
  };

  const dailyRecs = recommendations[dayData.tone.name] || [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Date navigation */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <div className="flex-1 text-center">
          <div className="text-sm font-mono text-gray-400">{formatDate(selectedDate)}</div>
          {isToday && (
            <div className="text-xs mt-0.5 neon-red font-mono">● СЕГОДНЯ</div>
          )}
        </div>
        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 rounded flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Icon name="ChevronRight" size={18} />
        </button>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="px-3 h-10 rounded text-xs font-mono transition-colors"
          style={{
            background: isToday ? 'rgba(232,0,31,0.2)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isToday ? 'rgba(232,0,31,0.5)' : 'rgba(255,255,255,0.08)'}`,
            color: isToday ? 'var(--red)' : '#888',
          }}
        >
          СЕГОДНЯ
        </button>
      </div>

      {/* Main card */}
      <div
        className="rounded-xl p-6 mb-4 animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, rgba(10,12,20,0.98) 0%, rgba(15,10,30,0.98) 100%)',
          border: `1px solid ${dayData.seal.color}50`,
          boxShadow: `0 0 40px ${dayData.seal.color}20`,
        }}
      >
        <div className="flex gap-5 items-start">
          {/* Seal icon */}
          <div
            className="w-24 h-24 rounded-xl flex flex-col items-center justify-center shrink-0"
            style={{
              background: `radial-gradient(circle, ${dayData.seal.color}20, transparent)`,
              border: `2px solid ${dayData.seal.color}`,
            }}
          >
            <div className="text-4xl">{dayData.seal.emoji}</div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-500">КИН</span>
              <span
                className="text-2xl font-black"
                style={{ fontFamily: 'Oswald, sans-serif', color: dayData.seal.color }}
              >
                {dayData.kin}
              </span>
              {isPortal && (
                <span
                  className="text-xs px-2 py-0.5 rounded font-bold"
                  style={{ background: 'rgba(245,200,0,0.2)', color: '#F5C800', border: '1px solid rgba(245,200,0,0.4)' }}
                >
                  ✦ ПОРТАЛ
                </span>
              )}
            </div>

            <div
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {dayData.tone.name} {dayData.seal.name}
            </div>

            <div className="text-sm text-gray-400 font-mono mb-3">{dayData.seal.nahuatl} · Элемент: {dayData.seal.element}</div>

            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Сила', value: dayData.tone.power, color: '#F5C800' },
                { label: 'Действие', value: dayData.tone.action, color: '#88CCFF' },
                { label: 'Суть', value: dayData.seal.essence, color: dayData.seal.color },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <span className="text-gray-500">{item.label}:</span>
                  <span style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-sm text-gray-300 leading-relaxed font-display italic">
            {dayData.seal.description}
          </p>
        </div>
      </div>

      {/* Portal info */}
      {isPortal && (
        <div
          className="rounded-lg p-4 mb-4"
          style={{
            background: 'linear-gradient(90deg, rgba(245,200,0,0.05), rgba(245,200,0,0.1), rgba(245,200,0,0.05))',
            border: '1px solid rgba(245,200,0,0.3)',
          }}
        >
          <div className="text-sm font-bold mb-1" style={{ color: '#F5C800', fontFamily: 'Oswald, sans-serif' }}>
            ✦ ПОРТАЛЬНЫЙ ДЕНЬ ЦОЛЬКИНА
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Порталы — 52 особых дня в матрице Цолькина, образующих симметричный узор. В эти дни энергетические потоки усилены.
            Рекомендуется медитация, ритуалы намерения и работа с подсознанием.
          </p>
        </div>
      )}

      {/* Daily recommendations */}
      <div
        className="rounded-lg p-4"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-xs font-mono text-gray-500 mb-3 flex items-center gap-2">
          <Icon name="Sparkles" size={12} />
          РЕКОМЕНДАЦИИ ДНЯ
        </div>
        <ul className="space-y-2">
          {dailyRecs.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span style={{ color: dayData.seal.color }} className="shrink-0 mt-0.5">▸</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
