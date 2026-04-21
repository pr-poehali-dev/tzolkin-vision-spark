export default function GeometricBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Large rotating circle */}
      <div
        className="absolute animate-spin-slow"
        style={{
          width: '700px',
          height: '700px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(232,0,31,0.08)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(30deg)',
          border: '1px solid rgba(27,79,216,0.08)',
          borderRadius: '50%',
          animation: 'spin-slow 30s linear infinite reverse',
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(circle at top left, rgba(232,0,31,0.3), transparent 70%)',
        }}
      />
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(27,79,216,0.3), transparent 70%)',
        }}
      />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 opacity-10"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(245,200,0,0.15), transparent 70%)',
        }}
      />

      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#E8001F" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1B4FD8" strokeWidth="1" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#F5C800" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#F5C800" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
