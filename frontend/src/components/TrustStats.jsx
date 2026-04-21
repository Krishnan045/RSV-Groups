import React from 'react';

const TrustStats = () => {
  const stats = [
    { num: "500+", label: "Units Sold" },
    { num: "120+", label: "Leased Spaces" },
    { num: "₹250Cr+", label: "Transaction Value" },
    { num: "100%", label: "Legal Clarity" }
  ];

  return (
    <section className="trust-stats-global" style={{ 
      padding: '8rem 0', 
      background: 'var(--primary-dark)', 
      color: 'white',
      borderBottom: '1px solid var(--accent-gold)',
      marginBottom: '4rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <h3 className="serif" style={{ fontSize: '3.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>{stat.num}</h3>
              <p style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6, fontSize: '0.75rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
