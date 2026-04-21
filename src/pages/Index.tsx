import { useState } from 'react';
import GeometricBg from '@/components/GeometricBg';
import TzolkinMatrix from '@/components/TzolkinMatrix';
import KinCalculator from '@/components/KinCalculator';
import TzolkinCalendar from '@/components/TzolkinCalendar';
import { getTzolkinDay } from '@/data/tzolkin';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'matrix' | 'calculator' | 'calendar' | 'about';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [userKin, setUserKin] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const today = getTzolkinDay(new Date());

  const nav: { id: Section; label: string }[] = [
    { id: 'home', label: 'ГЛАВНАЯ' },
    { id: 'matrix', label: 'МАТРИЦА' },
    { id: 'calculator', label: 'КИН СУДЬБЫ' },
    { id: 'calendar', label: 'КАЛЕНДАРЬ' },
    { id: 'about', label: 'О ПРОЕКТЕ' },
  ];

  return (
    <div className="min-h-screen relative text-white" style={{ background: 'var(--dark)' }}>
      <GeometricBg />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 h-14"
        style={{
          background: 'rgba(10,12,20,0.92)',
          borderBottom: '1px solid rgba(232,0,31,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-2"
        >
          <div className="text-lg font-black tracking-widest" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--red)' }}>
            ЦОЛЬКИН
          </div>
          <div className="hidden md:block text-xs text-gray-500 font-mono">/ МАЙЯНСКИЙ КАЛЕНДАРЬ</div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="px-3 py-1.5 text-xs font-bold tracking-widest transition-all duration-200 rounded"
              style={{
                fontFamily: 'Oswald, sans-serif',
                color: activeSection === item.id ? '#fff' : '#666',
                background: activeSection === item.id ? 'rgba(232,0,31,0.2)' : 'transparent',
                borderBottom: activeSection === item.id ? '2px solid var(--red)' : '2px solid transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Today indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
          <span className="text-gray-500">Кин {today.kin}:</span>
          <span style={{ color: today.seal.color }}>{today.tone.name} {today.seal.name}</span>
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className="fixed top-14 left-0 right-0 z-50 py-2"
          style={{ background: 'rgba(10,12,20,0.98)', borderBottom: '1px solid rgba(232,0,31,0.2)' }}
        >
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
              className="w-full text-left px-6 py-3 text-sm font-bold tracking-widest"
              style={{
                fontFamily: 'Oswald, sans-serif',
                color: activeSection === item.id ? 'var(--red)' : '#888',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="relative z-10 pt-14">

        {/* HOME */}
        {activeSection === 'home' && (
          <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
              {/* Today's kin badge */}
              <div
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono animate-fade-in-up"
                style={{
                  background: 'rgba(232,0,31,0.1)',
                  border: '1px solid rgba(232,0,31,0.3)',
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
                <span className="text-gray-400">Сегодня:</span>
                <span style={{ color: today.seal.color }}>{today.tone.name} {today.seal.name}</span>
                <span className="text-gray-600">· Кин {today.kin}</span>
                {today.isPortal && <span className="text-yellow-400">✦</span>}
              </div>

              {/* Title */}
              <h1
                className="text-6xl md:text-8xl font-black mb-2 animate-fade-in-up"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  letterSpacing: '0.1em',
                  lineHeight: 0.9,
                  animationDelay: '0.1s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                <span style={{ color: 'var(--white)' }}>МАТ</span>
                <span style={{ color: 'var(--red)' }}>РИ</span>
                <span style={{ color: 'var(--blue)' }}>ЦА</span>
              </h1>
              <h2
                className="text-3xl md:text-5xl font-light mb-6 animate-fade-in-up"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  letterSpacing: '0.3em',
                  color: 'var(--yellow)',
                  animationDelay: '0.2s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                ЦОЛЬКИНА
              </h2>

              <p
                className="text-base md:text-lg text-gray-400 max-w-xl mb-10 font-display italic animate-fade-in-up"
                style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
              >
                Майянский священный календарь 260 дней. Узнай свой Кин Судьбы,
                исследуй ежедневные энергии и портальные дни.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-wrap gap-3 justify-center animate-fade-in-up"
                style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
              >
                <button
                  onClick={() => setActiveSection('calculator')}
                  className="px-8 py-4 font-bold text-sm tracking-widest rounded transition-all hover:scale-105"
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    background: 'var(--red)',
                    color: '#fff',
                    boxShadow: '0 0 30px rgba(232,0,31,0.4)',
                  }}
                >
                  УЗНАТЬ КИН СУДЬБЫ
                </button>
                <button
                  onClick={() => setActiveSection('matrix')}
                  className="px-8 py-4 font-bold text-sm tracking-widest rounded transition-all hover:scale-105"
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    background: 'transparent',
                    color: 'var(--blue)',
                    border: '1px solid var(--blue)',
                  }}
                >
                  ОТКРЫТЬ МАТРИЦУ
                </button>
                <button
                  onClick={() => setActiveSection('calendar')}
                  className="px-8 py-4 font-bold text-sm tracking-widest rounded transition-all hover:scale-105"
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    background: 'transparent',
                    color: 'var(--yellow)',
                    border: '1px solid var(--yellow)',
                  }}
                >
                  КАЛЕНДАРЬ ДНЯ
                </button>
              </div>
            </div>

            {/* Features row */}
            <div className="geo-divider" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {[
                {
                  icon: '🌀', title: 'Матрица 13×20',
                  text: '260 кинов — полный цикл священного календаря майя. Интерактивная визуализация с описанием каждого дня.',
                  color: 'var(--red)', action: () => setActiveSection('matrix')
                },
                {
                  icon: '🔮', title: 'Кин Судьбы',
                  text: 'Рассчитай свой Кин по дате рождения. Узнай свою Печать, Тон и скрытые характеристики личности.',
                  color: 'var(--blue)', action: () => setActiveSection('calculator')
                },
                {
                  icon: '📅', title: 'Календарь Цолькина',
                  text: 'Ежедневные описания энергии, рекомендации и информация о портальных днях.',
                  color: 'var(--yellow)', action: () => setActiveSection('calendar')
                },
              ].map(item => (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="p-8 text-left transition-all hover:brightness-125 group"
                  style={{ background: 'rgba(10,12,20,0.8)' }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3
                    className="text-lg font-bold mb-2 group-hover:underline"
                    style={{ fontFamily: 'Oswald, sans-serif', color: item.color }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  <div className="mt-4 text-xs font-mono flex items-center gap-1" style={{ color: item.color }}>
                    ОТКРЫТЬ <Icon name="ArrowRight" size={12} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MATRIX */}
        {activeSection === 'matrix' && (
          <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <div className="text-xs font-mono text-gray-600 mb-1">/ МАТРИЦА</div>
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  МАТРИЦА <span className="neon-red">ЦОЛЬКИНА</span>
                </h2>
                <p className="text-sm text-gray-400">
                  260 кинов · 13 тонов × 20 печатей · Интерактивная карта священного времени
                </p>
              </div>
              <div className="geo-divider mb-6" />
              <TzolkinMatrix highlightKin={userKin ?? undefined} />
            </div>
          </div>
        )}

        {/* CALCULATOR */}
        {activeSection === 'calculator' && (
          <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <div className="text-xs font-mono text-gray-600 mb-1">/ КИН СУДЬБЫ</div>
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  КАЛЬКУЛЯТОР <span className="neon-yellow">КИНА</span>
                </h2>
                <p className="text-sm text-gray-400">
                  Введи дату рождения и узнай свою Майянскую Печать и Тон
                </p>
              </div>
              <div className="geo-divider mb-8" />
              <KinCalculator onKinCalculated={(kin) => { setUserKin(kin); }} />
              {userKin && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setActiveSection('matrix')}
                    className="text-xs font-mono underline"
                    style={{ color: 'var(--blue)' }}
                  >
                    Найти Кин {userKin} в матрице →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {activeSection === 'calendar' && (
          <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="text-xs font-mono text-gray-600 mb-1">/ КАЛЕНДАРЬ</div>
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  КАЛЕНДАРЬ <span className="neon-blue">ЦОЛЬКИНА</span>
                </h2>
                <p className="text-sm text-gray-400">
                  Ежедневные описания энергии, рекомендации и портальные дни
                </p>
              </div>
              <div className="geo-divider mb-8" />
              <TzolkinCalendar />
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === 'about' && (
          <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="text-xs font-mono text-gray-600 mb-1">/ О ПРОЕКТЕ</div>
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  МИССИЯ <span style={{ color: 'var(--yellow)' }}>И ЦЕННОСТИ</span>
                </h2>
              </div>
              <div className="geo-divider mb-8" />

              <div className="space-y-6">
                <div className="rounded-lg p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--red)' }}>
                    О МАТРИЦЕ ЦОЛЬКИНА
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-display italic">
                    Цолькин — священный 260-дневный календарь майя, сочетающий 13 тонов и 20 знаков-печатей.
                    Каждый день несёт уникальную энергию, влияющую на все аспекты жизни.
                    Познание своего Кина Судьбы открывает путь к самопониманию и гармонии с ритмами Вселенной.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'ПРОСВЕЩЕНИЕ', text: 'Делать майянские знания доступными для каждого на русском языке', color: 'var(--red)', icon: '📚' },
                    { title: 'ПРАКТИКА', text: 'Живые инструменты для ежедневной работы с энергией Цолькина', color: 'var(--blue)', icon: '⚡' },
                    { title: 'СООБЩЕСТВО', text: 'Объединять людей, идущих путём майянской астрологии', color: 'var(--yellow)', icon: '🌐' },
                    { title: 'ТОЧНОСТЬ', text: 'Строгое соответствие классической системе Дрим Спелл', color: '#88CC00', icon: '🎯' },
                  ].map(item => (
                    <div
                      key={item.title}
                      className="rounded-lg p-4"
                      style={{ background: `${item.color}10`, border: `1px solid ${item.color}30` }}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h4 className="text-sm font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif', color: item.color }}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--yellow)' }}>
                    КОНТАКТЫ
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: 'Mail', label: 'Email', value: 'info@tzolkin.ru', color: 'var(--red)' },
                      { icon: 'MessageCircle', label: 'Telegram', value: '@tzolkin_maya', color: 'var(--blue)' },
                      { icon: 'Globe', label: 'Сайт', value: 'tzolkin.ru', color: 'var(--yellow)' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3 text-sm">
                        <Icon name={item.icon} fallback="Circle" size={16} style={{ color: item.color }} />
                        <span className="text-gray-500 w-20">{item.label}:</span>
                        <span className="text-gray-300">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-8 px-4 py-6 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="text-xs text-gray-600 font-mono">
          МАТРИЦА ЦОЛЬКИНА · СВЯЩЕННЫЙ МАЙЯНСКИЙ КАЛЕНДАРЬ · 260 КИНОВ
        </div>
        <div className="flex justify-center gap-4 mt-3">
          {['🔴', '🔵', '🟡'].map((c, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ background: ['var(--red)', 'var(--blue)', 'var(--yellow)'][i] }} />
          ))}
        </div>
      </footer>
    </div>
  );
}