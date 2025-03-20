async function handler() {
  await sql`
    CREATE TABLE IF NOT EXISTS betting_sites (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS arbitrage_opportunities (
      id SERIAL PRIMARY KEY,
      event_name TEXT NOT NULL,
      bet_type TEXT NOT NULL,
      site1_name TEXT NOT NULL,
      site1_odds DECIMAL NOT NULL,
      site2_name TEXT NOT NULL,
      site2_odds DECIMAL NOT NULL,
      profit_percentage DECIMAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const sites = await sql`SELECT * FROM betting_sites`;

  const oddsData = [];

  for (const site of sites) {
    try {
      const response = await fetch("/integrations/web-scraping/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: site.url,
          getText: true,
        }),
      });

      const text = await response.text();
      oddsData.push({
        siteName: site.name,
        content: text,
      });
    } catch (error) {
      console.error(`Error scraping ${site.name}: ${error}`);
    }
  }

  const opportunities = findArbitrageOpportunities(oddsData);

  for (const opp of opportunities) {
    await sql`
      INSERT INTO arbitrage_opportunities 
      (event_name, bet_type, site1_name, site1_odds, site2_name, site2_odds, profit_percentage)
      VALUES 
      (${opp.eventName}, ${opp.betType}, ${opp.site1Name}, ${opp.site1Odds}, 
       ${opp.site2Name}, ${opp.site2Odds}, ${opp.profitPercentage})
    `;
  }

  return { opportunities };
}

function findArbitrageOpportunities(oddsData) {
  const opportunities = [];

  const extractedOdds = oddsData.map((data) => ({
    siteName: data.siteName,
    odds: extractOddsFromContent(data.content),
  }));

  for (let i = 0; i < extractedOdds.length; i++) {
    for (let j = i + 1; j < extractedOdds.length; j++) {
      const site1 = extractedOdds[i];
      const site2 = extractedOdds[j];

      for (const event1 of site1.odds) {
        const event2 = site2.odds.find((e) => e.eventName === event1.eventName);
        if (event2) {
          const arbitrageExists = calculateArbitrage(
            event1,
            event2,
            site1.siteName,
            site2.siteName
          );
          if (arbitrageExists) {
            opportunities.push(arbitrageExists);
          }
        }
      }
    }
  }

  return opportunities;
}

function extractOddsFromContent(content) {
  return [];
}

function calculateArbitrage(event1, event2, site1Name, site2Name) {
  const impliedProb1 = 1 / event1.odds;
  const impliedProb2 = 1 / event2.odds;
  const totalImpliedProb = impliedProb1 + impliedProb2;

  if (totalImpliedProb < 1) {
    const profitPercentage = (1 / totalImpliedProb - 1) * 100;
    return {
      eventName: event1.eventName,
      betType: event1.betType,
      site1Name,
      site1Odds: event1.odds,
      site2Name,
      site2Odds: event2.odds,
      profitPercentage,
    };
  }

  return null;
}