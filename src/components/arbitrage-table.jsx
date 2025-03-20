import React from "react";

export default function ArbitrageTable({ opportunities = [], totalBankroll = 1000 }) {
  const calculateStakes = (odds1, odds2, profitPercentage, investment) => {
    try {
      const stake1 = (investment * odds2) / (odds1 + odds2);
      const stake2 = investment - stake1;
      const potentialProfit = (investment * profitPercentage) / 100;

      return {
        stake1: Math.round(stake1 * 100) / 100,
        stake2: Math.round(stake2 * 100) / 100,
        potentialProfit: Math.round(potentialProfit * 100) / 100,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {[
              "Event",
              "Bet Type",
              "Site 1",
              "Odds 1",
              "Stake 1",
              "Site 2",
              "Odds 2",
              "Stake 2",
              "Profit %",
              "Potential Profit",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {opportunities
            .sort((a, b) => b.profitPercentage - a.profitPercentage)
            .map((opp, index) => {
              const stakes = calculateStakes(
                opp.site1Odds,
                opp.site2Odds,
                opp.profitPercentage,
                totalBankroll
              );

              if (!stakes) {
                return null;
              }

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.eventName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.betType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.site1Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.site1Odds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${stakes.stake1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.site2Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {opp.site2Odds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${stakes.stake2}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                    {opp.profitPercentage.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                    ${stakes.potentialProfit}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {opportunities.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No arbitrage opportunities found
        </div>
      )}
    </div>
  );
}

// StoryComponent for testing
export function StoryComponent() {
  const sampleOpportunities = [
    {
      eventName: "Team A vs Team B",
      betType: "Match Winner",
      site1Name: "BetSite1",
      site1Odds: 2.1,
      site2Name: "BetSite2",
      site2Odds: 2.0,
      profitPercentage: 3.5,
    },
    {
      eventName: "Team X vs Team Y",
      betType: "Over/Under",
      site1Name: "BetSite1",
      site1Odds: 1.95,
      site2Name: "BetSite3",
      site2Odds: 1.9,
      profitPercentage: 2.8,
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Arbitrage Opportunities Table (With Data)
        </h3>
        <ArbitrageTable opportunities={sampleOpportunities} totalBankroll={1000} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Empty State</h3>
        <ArbitrageTable opportunities={[]} totalBankroll={1000} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Bankroll</h3>
        <ArbitrageTable opportunities={sampleOpportunities} totalBankroll={5000} />
      </div>
    </div>
  );
}