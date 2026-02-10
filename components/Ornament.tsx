export default function Ornament({ light = false }: { light?: boolean }) {
  return (
    <div className="section-ornament">
      <span className="ornament-line" style={light ? { background: 'var(--ivory)' } : {}} />
      <span className="ornament-diamond" style={light ? { color: 'var(--ivory)' } : {}}>◆</span>
      <span className="ornament-line" style={light ? { background: 'var(--ivory)' } : {}} />
    </div>
  );
}
