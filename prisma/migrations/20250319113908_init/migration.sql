-- CreateTable
CREATE TABLE "arbitrage_opportunities" (
    "id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "site1_id" INTEGER,
    "site2_id" INTEGER,
    "site1_odds" DECIMAL(65,30) NOT NULL,
    "site2_odds" DECIMAL(65,30) NOT NULL,
    "profit_percentage" DECIMAL(65,30) NOT NULL,
    "recommended_stake1" DECIMAL(65,30) NOT NULL,
    "recommended_stake2" DECIMAL(65,30) NOT NULL,
    "potential_profit" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "arbitrage_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betting_sites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "odds_selector" TEXT NOT NULL,
    "team_selector" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "betting_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "odds_data" (
    "id" SERIAL NOT NULL,
    "betting_site_id" INTEGER,
    "event_name" TEXT NOT NULL,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "team1_odds" DECIMAL(65,30) NOT NULL,
    "team2_odds" DECIMAL(65,30) NOT NULL,
    "draw_odds" DECIMAL(65,30),
    "scraped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "odds_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "arbitrage_opportunities" ADD CONSTRAINT "arbitrage_opportunities_site1_id_fkey" FOREIGN KEY ("site1_id") REFERENCES "betting_sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arbitrage_opportunities" ADD CONSTRAINT "arbitrage_opportunities_site2_id_fkey" FOREIGN KEY ("site2_id") REFERENCES "betting_sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "odds_data" ADD CONSTRAINT "odds_data_betting_site_id_fkey" FOREIGN KEY ("betting_site_id") REFERENCES "betting_sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
