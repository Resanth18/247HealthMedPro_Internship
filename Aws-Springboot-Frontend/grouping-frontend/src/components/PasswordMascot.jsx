import "./passwordMascot.css";

export default function PasswordMascot({ mode = "idle" }) {
  return (
    <div className={`mascot ${mode}`}>
      <svg width="180" height="180" viewBox="0 0 200 200">

        {/* HEAD */}
        <ellipse cx="100" cy="78" rx="38" ry="42" className="skin" />

        {/* PATTai (Vibhooti – TN style) */}
        <rect x="75" y="58" width="50" height="4" className="pattai" />
        <rect x="75" y="65" width="50" height="4" className="pattai" />
        <rect x="75" y="72" width="50" height="4" className="pattai" />

        {/* CAP (BACKWARDS) */}
        <path
          d="M65 45 Q100 25 135 45 L135 50 Q100 35 65 50 Z"
          className="cap"
        />
        <rect x="58" y="44" width="18" height="8" rx="4" className="cap-strap" />

        {/* EYES */}
        <g className="eyes">
          <circle cx="88" cy="82" r="4" />
          <circle cx="112" cy="82" r="4" />
        </g>

        {/* NOSE */}
        <path d="M100 86 Q98 96 100 98 Q102 96 100 86" className="nose" />

        {/* MOUTH */}
        <path d="M88 105 Q100 115 112 105" className="mouth" />

        {/* BODY (INDIA JERSEY) */}
        <rect x="55" y="120" rx="18" ry="18" width="90" height="55" className="jersey" />
        <text x="100" y="150" textAnchor="middle" className="jersey-text">INDIA</text>

        {/* HANDS */}
        <g className="hands">
          <rect x="40" y="120" width="22" height="45" rx="11" />
          <rect x="138" y="120" width="22" height="45" rx="11" />
        </g>

      </svg>
    </div>
  );
}
