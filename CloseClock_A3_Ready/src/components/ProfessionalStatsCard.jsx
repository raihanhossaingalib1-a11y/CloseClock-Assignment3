import React from "react";
import "../App.css";

/**
 * ProfessionalStatsCard is a reusable statistics/professional metric card.
 * Usage: <ProfessionalStatsCard icon="📈" title="Productivity" value="95%" caption="this week" />
 */
function ProfessionalStatsCard({ icon = "📊", title, value, caption }) {
  return (
    <div className="professional-stats-card">
      <div className="stats-card-icon" aria-hidden="true">{icon}</div>
      <div className="stats-card-body">
        <h3 className="stats-card-title">{title}</h3>
        <div className="stats-card-value">{value}</div>
        {caption && <div className="stats-card-caption">{caption}</div>}
      </div>
    </div>
  );
}

export default ProfessionalStatsCard;