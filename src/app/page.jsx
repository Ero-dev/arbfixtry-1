/*"use client";
import { useState, useEffect } from 'react';
import ArbitrageTable from '../components/arbitrage-table';
import Navigation1 from '../components/navigation-1';

function MainComponent() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalBankroll] = useState(1000);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/scrape-analyze', { method: 'POST' });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error('Failed to fetch opportunities:', err);
      setError('Failed to fetch arbitrage opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const topOpportunities = [...opportunities]
    .sort((a, b) => b.profitPercentage - a.profitPercentage)
    .slice(0, 5);

  const styles = {
    nav: {
      background: '#333',
      padding: '1rem',
      color: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    button: {
      background: '#333',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    card: {
      border: '1px solid #ddd',
      padding: '16px',
      marginBottom: '16px',
      borderRadius: '4px',
      background: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    error: {
      background: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
    },
  };

  return (
    <>
      <Navigation1 />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            Arbitrage Dashboard
          </h1>
          <button
            style={styles.button}
            onClick={fetchOpportunities}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ marginRight: '8px' }}
                />
                Refreshing...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-sync-alt" style={{ marginRight: '8px' }} />
                Refresh Data
              </span>
            )}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.card}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            Top 5 Opportunities
          </h2>
          <div style={styles.grid}>
            {topOpportunities.map((opp, index) => (
              <div key={index} style={styles.card}>
                <div
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  {opp.eventName}
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  <div style={{ color: '#666', marginBottom: '8px' }}>
                    {opp.betType}
                  </div>
                  <div style={styles.flexBetween}>
                    <span style={{ color: '#666' }}>{opp.site1Name}</span>
                    <span style={{ fontWeight: 500 }}>{opp.site1Odds}</span>
                    </div>
                    <div style={styles.flexBetween}>
                    <span style={{ color: '#666' }}>{opp.site2Name}</span>
                    <span style={{ fontWeight: 500 }}>{opp.site2Odds}</span>
                  </div>
                  <div style={styles.flexBetween}>
                    <span style={{ color: '#666' }}>Profit:</span>
                    <span style={{ fontWeight: 500 }}>{opp.profitPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {opportunities.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No arbitrage opportunities found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainComponent;*/

"use client";
import { useState, useEffect } from 'react';
import ArbitrageTable from '../components/arbitrage-table';
import Navigation1 from '../components/navigation-1';

function MainComponent() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalBankroll] = useState(1000);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/scrape-analyze', { method: 'POST' });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error('Failed to fetch opportunities:', err);
      setError('Failed to fetch arbitrage opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const styles = {
    nav: {
      background: '#333',
      padding: '1rem',
      color: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    button: {
      background: '#333',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    card: {
      border: '1px solid #ddd',
      padding: '16px',
      marginBottom: '16px',
      borderRadius: '4px',
      background: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    error: {
      background: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
    },
  };

  return (
    <>
      <Navigation1 />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            Arbitrage Dashboard
          </h1>
          <button
            style={styles.button}
            onClick={fetchOpportunities}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ marginRight: '8px' }}
                />
                Refreshing...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-sync-alt" style={{ marginRight: '8px' }} />
                Refresh Data
              </span>
            )}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <ArbitrageTable opportunities={opportunities} totalBankroll={totalBankroll} />
      </div>
    </>
  );
}

export default MainComponent;