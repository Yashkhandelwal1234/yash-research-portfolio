import type { Article, ArticleContentBlock, CoverArtMetadata } from "../types/content";

export const articleCoverPresets: Record<string, CoverArtMetadata> = {
  "Stablecoin Yield": { variant: "flows", colors: ["#0f3b25", "#32d583", "#7dd3fc"], label: "SY" },
  "DeFi Fixed Income": { variant: "grid", colors: ["#172554", "#60a5fa", "#34d399"], label: "FI" },
  "Consumer Crypto": { variant: "orbits", colors: ["#064e3b", "#34d399", "#facc15"], label: "CC" },
  "Prediction Markets": { variant: "blocks", colors: ["#3b0764", "#a78bfa", "#60a5fa"], label: "PM" },
  "Market Structure": { variant: "blocks", colors: ["#450a0a", "#fb7185", "#f59e0b"], label: "MS" },
  "Agent Infrastructure": { variant: "nodes", colors: ["#1e1b4b", "#a78bfa", "#32d583"], label: "AI" },
  "Protocol Research": { variant: "grid", colors: ["#422006", "#f59e0b", "#32d583"], label: "PR" },
};

const usddPendleContent: ArticleContentBlock[] = [
  { type: "heading", text: "Opening Thesis" },
  {
    type: "paragraph",
    text: "Pendle markets are capacity allocated. This means Pendle does not add every yield-bearing asset that wants a market. It chooses assets that are worth bringing into its fixed-yield ecosystem.",
  },
  {
    type: "paragraph",
    text: "And that matters because Pendle is one of DeFi's main yield-trading platforms. It lets users trade spot yield, earn fixed yield, or take long exposure to future yield through PT and YT markets.",
  },
  {
    type: "callout",
    label: "Opening Thesis",
    text: "When a stablecoin gets a Pendle market, it usually means one thing: the market believes the yield is mature enough to be priced, traded, and structured.",
    tone: "accent",
  },
  {
    type: "paragraph",
    text: "USDD is the latest stablecoin to enter that category.",
  },
  { type: "heading", text: "Getting Into Pendle" },
  {
    type: "paragraph",
    text: "The short list of stablecoins already active on Pendle - such as sUSDS, sUSDe, sFRAX, and USDY - earned their place because they have a few things in common.",
  },
  {
    type: "checklist",
    title: "What Pendle Stablecoin Markets Tend To Require",
    items: [
      { text: "A yield engine that fixed-rate capital is willing to take exposure to.", level: "green" },
      { text: "Proper TVL depth.", level: "green" },
      { text: "Audited contracts.", level: "green" },
      { text: "Clear redemption mechanics.", level: "green" },
      { text: "Demand from sophisticated DeFi users.", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "USDD is now trying to sit in the same group. The current numbers for @usddio look like this:",
  },
  {
    type: "table",
    title: "Current USDD Metrics",
    columns: ["Metric", "Value"],
    rows: [
      ["Supply", "~$1.4B"],
      ["On-chain collateral", "~$2.12B"],
      ["Over-collateralization", "~150%"],
      ["Cumulative earnings", "~$18.5M"],
      ["Blended APY", "3.56%"],
      ["Smart Allocator deployment", "~$830M across Spark, Aave, and Morpho"],
      ["Annualized fees/revenue", "$5.91M on DeFiLlama"],
      ["TVL", "$1.30B on DeFiLlama"],
    ],
  },
  {
    type: "paragraph",
    text: "The income trend is also worth noting. USDD's quarterly earnings have moved from $279.46K in Q2 2025 to $1.01M in Q2 2026. There was a small dip between Q3 and Q4 2025, but the broader trend is clearly higher.",
  },
  {
    type: "figure",
    title: "USDD TVL And Revenue",
    src: "/research/usdd-pendle/tvl-revenue.png",
    alt: "USDD DeFiLlama TVL and fees revenue chart",
    caption: "PDF visual showing USDD TVL and revenue metrics on DeFiLlama.",
    visual: "reserve-flow",
  },
  {
    type: "figure",
    title: "USDD Income Statement",
    src: "/research/usdd-pendle/income-statement.png",
    alt: "USDD income statement table from the memo",
    caption: "PDF visual showing quarterly USDD earnings and revenue line items.",
    visual: "rate-spread",
  },
  {
    type: "paragraph",
    text: "That is important because Pendle users do not only look at headline APY. They care about whether the yield engine has depth, repeatability, and enough revenue history to support a fixed-yield market.",
  },
  { type: "heading", text: "Smart Allocator Mechanism" },
  {
    type: "paragraph",
    text: "The basic idea is straightforward. USDD has reserves backing the stablecoin. Instead of letting those reserves sit idle, the protocol deploys part of that capital into selected DeFi yield venues and sends the net returns back to users through sUSDD.",
  },
  {
    type: "paragraph",
    text: "sUSDD works through an ERC-4626 vault that revalues continuously. If you hold sUSDD, your token's redemption value increases as the underlying reserve strategies earn yield.",
  },
  {
    type: "checklist",
    title: "Smart Allocator Flow",
    items: [
      { text: "USDD reserves.", level: "green" },
      { text: "Deployed into selected DeFi yield venues.", level: "green" },
      { text: "Earn lending interest and platform rewards.", level: "green" },
      { text: "Small risk reserve is kept.", level: "amber" },
      { text: "Remaining yield flows back to sUSDD holders.", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "USDD's docs describe Smart Allocator as a fully on-chain, transparent, risk-controlled investment strategy built to create self-sustaining yield and reduce reliance on external subsidies.",
  },
  {
    type: "paragraph",
    text: "That last part is important. USDD is not trying to rely only on temporary campaign rewards. The goal is to build a reserve engine that keeps generating yield even after the campaign ends.",
  },
  {
    type: "table",
    title: "Current Allocation",
    columns: ["Venue", "Share", "Approximate Capital"],
    rows: [
      ["@sparkdotfi", "86.55%", "~$714M"],
      ["@aave", "13.5%", "~$112.6M"],
      ["@Morpho", "0.37%", "~$3M"],
    ],
  },
  {
    type: "figure",
    title: "Allocated Asset Distribution",
    src: "/research/usdd-pendle/allocator-distribution.png",
    alt: "USDD Smart Allocator distribution across Spark, Aave, and Morpho",
    caption: "PDF visual showing the Smart Allocator distribution by venue.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "This also explains why USDD fits naturally into the same conversation as sUSDS. sUSDS uses the Sky Savings Rate, where USDS holders capture yield from the broader Sky/Spark system. sUSDD follows a similar vault-based logic, but its yield comes from USDD reserves being deployed through Smart Allocator.",
  },
  {
    type: "figure",
    title: "Sky Savings Rate Context",
    src: "/research/usdd-pendle/sky-savings-rate.png",
    alt: "Sky Savings Rate interface shown in the USDD memo",
    caption: "PDF visual used as context for the sUSDS savings-rate comparison.",
    visual: "rate-spread",
  },
  { type: "heading", text: "Is USDD Yield Fixed or Dynamic?" },
  {
    type: "paragraph",
    text: "USDD's base yield is dynamic. It is not a fixed rate.",
  },
  {
    type: "checklist",
    title: "Dynamic APY Inputs",
    items: [
      { text: "A 7-day moving average of mainstream yield-bearing stablecoin yields.", level: "green" },
      { text: "The Fed funds rate.", level: "green" },
      { text: "A competitive premium to keep sUSDD attractive against peers.", level: "green" },
    ],
  },
  {
    type: "figure",
    title: "Dynamic APY",
    src: "/research/usdd-pendle/dynamic-apy.png",
    alt: "Dynamic APY examples across Tron, Ethereum, and BNB Chain",
    caption: "PDF visual showing Dynamic APY examples across supported chains.",
    visual: "rate-spread",
  },
  {
    type: "paragraph",
    text: "This means the yield is designed to move with the broader stablecoin yield environment. If market yields compress, sUSDD yield can compress. If lending markets become more attractive, sUSDD yield can move higher. So the yield is not static - it is market-aware.",
  },
  {
    type: "paragraph",
    text: "But once sUSDD enters Pendle, users get different ways to interact with that yield:",
  },
  {
    type: "table",
    title: "Yield Layer Comparison",
    columns: ["Layer", "Yield Type", "Static/Dynamic?", "Explanation"],
    rows: [
      ["Base sUSDD yield", "Smart Allocator yield", "Dynamic", "Depends on reserve deployment returns, lending rates, risk reserve, and market conditions"],
      ["PT-sUSDD on Pendle", "Fixed yield if held to maturity", "Fixed after entry", "User buys PT at a discount and redeems at full value at maturity"],
      ["YT-sUSDD / LP", "Variable yield + incentives", "Dynamic", "Depends on sUSDD yield, Pendle pricing, trading fees, incentives, and time to maturity"],
    ],
  },
  {
    type: "paragraph",
    text: "This is the key distinction: sUSDD itself has dynamic yield. PT-sUSDD can turn that into fixed yield. YT-sUSDD gives users leveraged exposure to future yield. LP positions give users fees, incentives, and exposure to the market structure.",
  },
  {
    type: "paragraph",
    text: "One more detail matters for Pendle: sUSDD is fully redeemable for USDD. There is no lockup, no withdrawal restriction, and no waiting period. That is important because PT and YT pricing depends on clean redemption mechanics. If the underlying asset cannot be redeemed properly, the entire fixed-yield market becomes harder to price. sUSDD's design fits that requirement.",
  },
  {
    type: "figure",
    title: "sUSDD Redemption Value",
    src: "/research/usdd-pendle/susdd-redemption-value.png",
    alt: "sUSDD redemption value chart",
    caption: "PDF visual showing sUSDD redemption value over time.",
    visual: "reserve-flow",
  },
  { type: "heading", text: "Why the Pendle Listing Matters" },
  {
    type: "paragraph",
    text: "Pendle is selective about stablecoin yield markets. PT and YT pricing requires the underlying yield to be stable enough for traders to take fixed-rate positions on it months in advance. Assets whose yield is unclear, temporary, or too fragile usually do not make sense for this kind of market.",
  },
  {
    type: "paragraph",
    text: "Look at what sUSDD's competitors on Pendle have in common:",
  },
  {
    type: "table",
    title: "Pendle Stablecoin Yield Peers",
    columns: ["Asset", "Yield Mechanism"],
    rows: [
      ["sUSDS", "Earned its market through the Sky Savings Rate, backed by lending, Treasury exposure, and the broader Sky/Spark system."],
      ["sUSDe", "Earned its market by running a basis trade that captures funding paid by leveraged traders."],
      ["USDY", "Earned its market by giving on-chain users exposure to tokenized U.S. Treasury yield."],
    ],
  },
  {
    type: "paragraph",
    text: "Each peer earns yield through a different mechanism. sUSDD's edge is that it spreads its reserve deployment across Spark, Aave, and Morpho instead of relying on only one yield model.",
  },
  {
    type: "paragraph",
    text: "For users already holding sUSDS, sUSDe, or other yield-bearing stablecoins on Pendle, sUSDD gives them a new way to diversify within the same platform. That is the real point of the listing.",
  },
  {
    type: "callout",
    label: "Listing Value",
    text: "USDD is not just adding liquidity. It is entering DeFi's fixed-income layer.",
    tone: "accent",
  },
  { type: "heading", text: "Strategic Value Unlocked by the Listing" },
  {
    type: "paragraph",
    text: "Pendle gives users three ways to earn from sUSDD, depending on what they want.",
  },
  {
    type: "table",
    title: "sUSDD Pendle Position Types",
    columns: ["Position", "Use Case", "PDF Description"],
    rows: [
      ["PT-sUSDD", "Fixed Yield", "For users who want fixed, predictable yield. Users buy PT-sUSDD at a discount, hold it until maturity, and redeem it at full value. The difference becomes the locked-in yield."],
      ["YT-sUSDD", "Variable Yield", "For users who want more upside. YT holders collect the variable yield side of sUSDD, plus campaign rewards including base APY, the $300K+ reward pool, Pendle boosts, and additional campaign incentives."],
      ["LP-sUSDD", "Liquidity Provider", "For users who do not want to fully pick a side. LPs provide liquidity to the PT/YT market and earn from trading fees, PENDLE rewards, yield generated by the pool's mix of SY and PT positions, and campaign incentives."],
    ],
  },
  {
    type: "paragraph",
    text: "YT payoff depends on how yield moves during the 91-day window, so YT is the higher-risk, higher-reward side of the trade. PT is the conservative side of the Pendle market.",
  },
  {
    type: "checklist",
    title: "What Moves Pendle Yield",
    items: [
      { text: "Time left to maturity.", level: "amber" },
      { text: "Market expectations around future yield.", level: "amber" },
      { text: "Capital flows between PT and YT.", level: "amber" },
      { text: "Incentives and trading activity.", level: "amber" },
    ],
  },
  {
    type: "paragraph",
    text: "PT brings fixed-yield capital. YT brings yield speculators. LP brings market makers and farmers. Add composability on top, and one Pendle listing starts doing the work of three different products.",
  },
  { type: "heading", text: "The Composability Unlock" },
  {
    type: "paragraph",
    text: "There is also a less obvious benefit here: composability. Once an asset has a working Pendle market, it can become part of broader DeFi strategies.",
  },
  {
    type: "checklist",
    title: "Where sUSDD Can Be Used",
    items: [
      { text: "Fixed-yield strategies.", level: "green" },
      { text: "Looping strategies.", level: "green" },
      { text: "Structured products.", level: "green" },
      { text: "Yield vaults.", level: "green" },
      { text: "Treasury strategies.", level: "green" },
      { text: "Portfolio diversification inside Pendle.", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "This is why the listing matters beyond the 91-day campaign. The campaign brings attention. But the Pendle market gives sUSDD a place inside DeFi's yield-trading stack.",
  },
  { type: "heading", text: "Where sUSDD Fits in the Stablecoin Yield Category" },
  {
    type: "paragraph",
    text: "Stablecoin yield can be split into a few main buckets.",
  },
  {
    type: "table",
    title: "Stablecoin Yield Buckets",
    columns: ["Bucket", "Example", "Yield Source"],
    rows: [
      ["Savings-rate stablecoins", "sUSDS", "The Sky Savings Rate and the broader Sky/Spark ecosystem."],
      ["Basis-trade stablecoins", "sUSDe", "Funding rates and basis trades, usually through long spot and short perpetual futures exposure."],
      ["RWA / Treasury stablecoins", "USDY", "Tokenized exposure to U.S. Treasury-style assets."],
      ["Reserve-deployment stablecoins", "sUSDD", "Deploying reserves into DeFi lending venues and distributing the returns through a vault token."],
    ],
  },
  {
    type: "paragraph",
    text: "USDD is not trying to be another synthetic dollar. It is not trying to be only a tokenized Treasury product. It is trying to become a reserve-backed DeFi yield stablecoin.",
  },
  {
    type: "checklist",
    title: "What Matters Most",
    items: [
      { text: "More collateral than supply: USDD has around $2.12B in collateral backing around $1.4B in supply, giving it roughly 150% over-collateralization.", level: "green" },
      { text: "Three position types from one market: PT, YT, and LP attract different kinds of capital and broaden who sUSDD can reach.", level: "green" },
      { text: "APY linked to market conditions: the Dynamic APY mechanism adjusts to stablecoin yield markets and traditional rate benchmarks instead of relying only on temporary incentives.", level: "green" },
    ],
  },
  {
    type: "figure",
    title: "System Backing",
    src: "/research/usdd-pendle/system-backing.png",
    alt: "USDD system backing chart",
    caption: "PDF visual showing USDD system backing categories over time.",
    visual: "reserve-flow",
  },
  {
    type: "paragraph",
    text: "Across roughly $830M in deployed reserves, Smart Allocator has generated around $18.5M in cumulative earnings, visible on-chain. The real question is whether this base earnings engine keeps working after the incentives fade.",
  },
  { type: "heading", text: "Early Traction on Pendle" },
  {
    type: "paragraph",
    text: "The early numbers for the sUSDD Pendle market are strong. The pool has already grown to $13M+ in TVL, with around $8M deposited on day one.",
  },
  {
    type: "table",
    title: "Current Campaign APYs",
    columns: ["Position", "APY"],
    rows: [
      ["YT", "13.53%"],
      ["PT", "7.88%"],
      ["LP", "9.31%"],
    ],
  },
  {
    type: "figure",
    title: "Pendle Market",
    src: "/research/usdd-pendle/pendle-market.png",
    alt: "sUSDD market row on Pendle showing liquidity and APY data",
    caption: "PDF visual showing the sUSDD Pendle market and position-level data.",
    visual: "rate-spread",
  },
  {
    type: "paragraph",
    text: "The LP APY breaks down across three sources: PENDLE token rewards distributed to the pool, trading fees from user swaps, and yield generated by the pool's mix of SY and PT positions.",
  },
  {
    type: "paragraph",
    text: "For context, USDG's Pendle campaign opened with around $60K in exclusive incentives over six weeks. sUSDD starts with $300K+ in rewards over 91 days, plus a 30% Pendle reward boost and additional TRX airdrop incentives.",
  },
  {
    type: "paragraph",
    text: "PT buyers are getting around 7.88% for 91 days - noticeably higher than base sUSDD yield. YT and LP holders get the campaign rewards layered on top.",
  },
  {
    type: "callout",
    label: "Base Yield Versus Campaign Rewards",
    text: "Base yield is the sustainable engine. Campaign rewards are the accelerator. The investment case should not depend only on the accelerator.",
    tone: "warning",
  },
  { type: "heading", text: "Risk Checklist" },
  {
    type: "paragraph",
    text: "The setup is strong, but it is not risk-free.",
  },
  {
    type: "checklist",
    title: "Risk Checklist",
    items: [
      { text: "Allocator concentration: Smart Allocator is diversified across Spark, Aave, and Morpho, but it is still heavily weighted toward Spark at 86.55%. That means the yield is more dependent on one major venue than the headline diversification might suggest.", level: "amber" },
      { text: "Post-campaign yield: the Pendle campaign makes the APY look attractive, but the real test starts when the campaign ends. If capital stays after the rewards fade, that is a strong signal. If TVL falls sharply, then a large part of the traction was incentive-driven.", level: "amber" },
      { text: "Yield compression: because USDD's base yield is dynamic, it can move lower if stablecoin lending rates compress or if market-wide yields fall.", level: "amber" },
      { text: "Peg and redemption depth: sUSDD is redeemable for USDD, but the broader system still depends on collateral quality, liquidity, liquidation execution, and market confidence.", level: "red" },
      { text: "Smart contract and integration risk: Pendle, sUSDD, Smart Allocator, and the underlying venues all add layers of technical exposure.", level: "red" },
    ],
  },
  { type: "heading", text: "My Take" },
  {
    type: "paragraph",
    text: "USDD has been a stablecoin staple on TRON for a long time. Now it is trying to become something larger: a multichain, yield-generating stablecoin that can compete inside DeFi's fixed-income layer.",
  },
  {
    type: "paragraph",
    text: "Smart Allocator is the core of that shift. It puts USDD reserves to work across blue-chip DeFi venues and routes the yield back through sUSDD. Pendle then takes that yield and turns it into three different markets: fixed yield through PT, variable yield through YT, and fee and incentive yield through LP.",
  },
  {
    type: "paragraph",
    text: "That is why this listing matters. It gives USDD distribution, composability, and a place inside one of DeFi's most important yield markets.",
  },
  {
    type: "checklist",
    title: "What To Track",
    items: [
      { text: "Smart Allocator is still heavily weighted toward Spark.", level: "amber" },
      { text: "The long-term opportunity depends on how USDD performs after the campaign.", level: "amber" },
      { text: "The base yield can move as market rates change.", level: "amber" },
      { text: "The strongest Pendle APYs include incentives, not just organic yield.", level: "amber" },
    ],
  },
  {
    type: "paragraph",
    text: "So it is important to separate the short-term trade from the long-term thesis. The short-term trade is the Pendle campaign. The long-term thesis is Smart Allocator.",
  },
  {
    type: "paragraph",
    text: "If Smart Allocator continues generating real income after incentives fade, then sUSDD can become a persistent part of DeFi's stablecoin yield stack. If most of the demand is campaign-driven, the market will show that once rewards slow down.",
  },
  {
    type: "callout",
    label: "Closing Take",
    text: "USDD has built a reserve engine that generates real income, and Pendle gives that yield a market. That is what makes this listing worth watching.",
    tone: "accent",
  },
];

const stablecoinCardAccountContent: ArticleContentBlock[] = [
  { type: "heading", text: "Opening Thesis" },
  {
    type: "paragraph",
    text: "Traditional neobanks won the interface. They made banking feel cleaner, faster, and more mobile-native. Crypto neobanks are now pushing into a different layer: the money layer.",
  },
  {
    type: "paragraph",
    text: "The first wave of neobanks gave users better apps, instant onboarding, virtual cards, cleaner spending controls, cheaper FX, and fewer branch-era frustrations. Revolut, Monzo, Chime, Nubank, N26, and others proved that consumers were willing to trust software-first financial brands.",
  },
  {
    type: "paragraph",
    text: "But most of them did not fully rebuild banking. They still depended on partner banks, card networks, batch settlement, legacy compliance processes, and the same financial rails they were supposed to disrupt. They improved distribution, but they did not fundamentally change how money moved, settled, earned yield, became collateral, or turned into credit.",
  },
  {
    type: "paragraph",
    text: "That is why the next version of neobanking is unlikely to be only a better app. The more interesting shift is a financial account built around programmable money, with stablecoins as the base layer.",
  },
  {
    type: "paragraph",
    text: "The clearest signal is already visible in crypto payment card data. In March 2023, tracked crypto card activity was basically nonexistent: 27 monthly transactions and $234 in monthly volume. By May 2026, monthly tracked volume had reached $832.8M, with more than 3.1M transactions and 383,000 active addresses.",
  },
  {
    type: "paragraph",
    text: "Across the full PaymentScan series, tracked crypto card volume has crossed $9B.",
  },
  {
    type: "figure",
    title: "Monthly Crypto Card Volume",
    src: "/research/stablecoin-card-account/monthly-crypto-card-volume.png",
    alt: "PaymentScan chart showing tracked crypto card volume across the series",
    caption: "Figure 1: Tracked crypto card volume crossed $9B across the PaymentScan series, with May 2026 reaching $832.8M in monthly volume. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "This is not a projection or a founder claim. It is settled onchain activity.",
  },
  {
    type: "paragraph",
    text: "Crypto's neobank moment is no longer theoretical. It is forming around stablecoin balances, card spending, 24/7 settlement, onchain credit, and programmable financial accounts.",
  },
  {
    type: "callout",
    label: "Account Layer",
    text: "The question is no longer whether stablecoin neobanking is real. The more important question is who captures the account layer above the card.",
    tone: "accent",
  },
  { type: "heading", text: "The Real Neobank Failure Was Not UX. It Was Infrastructure." },
  {
    type: "paragraph",
    text: "The common explanation is that neobanks struggled because of profitability, customer support, regulation, or limited product depth. All of that is true, but it misses the deeper issue.",
  },
  {
    type: "paragraph",
    text: "Most neobanks were distribution companies sitting on top of someone else's financial infrastructure. They could improve onboarding, but they could not redesign settlement. They could issue cards, but they could not escape the working-capital constraints of card networks and banking partners. They could make cross-border payments feel easier, while the back end still touched correspondent banking, FX spreads, local payment schemes, and settlement delays.",
  },
  {
    type: "paragraph",
    text: "They could offer higher savings rates when interest rates allowed, but yield was still mostly a function of banking economics. They could add crypto trading, stock trading, budgeting tools, and AI assistants, but most of those were features placed around the account, not a rebuild of the account itself.",
  },
  {
    type: "callout",
    label: "Infrastructure Thesis",
    text: "A better front end creates adoption. A better back end creates new economics.",
    tone: "accent",
  },
  {
    type: "paragraph",
    text: "Stablecoins create that opening because they are not just crypto dollars. They are programmable settlement instruments. A stablecoin balance can move globally, settle 24/7, interact with smart contracts, earn yield, act as collateral, connect to card networks, and eventually support automated financial decision-making.",
  },
  {
    type: "paragraph",
    text: "A bank balance is an entry inside a financial institution. A stablecoin balance is a programmable dollar instrument that can move across networks. That difference changes the product design space for consumer banking.",
  },
  {
    type: "checklist",
    title: "What A Stablecoin Neobank Can Become",
    items: [
      { text: "A stablecoin account.", level: "green" },
      { text: "A spending card.", level: "green" },
      { text: "A yield account.", level: "green" },
      { text: "A collateralized credit line.", level: "green" },
      { text: "A merchant settlement product.", level: "green" },
      { text: "A cross-border transfer layer.", level: "green" },
      { text: "An AI-assisted financial account.", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "The next neobank does not need to look more crypto. It may look less crypto from the outside. The crypto will sit in the settlement layer, treasury layer, credit layer, and automation layer. The user will see a balance, a card, a yield rate, a credit line, a transfer button, and a financial assistant.",
  },
  {
    type: "paragraph",
    text: "Everyday adoption comes from that product shape: not asking users to understand chains, but making chains disappear.",
  },
  { type: "heading", text: "The PaymentScan Data Shows the Category Has Crossed From Experiment to Market" },
  {
    type: "paragraph",
    text: "Crypto cards used to be judged through self-reported numbers: user counts, founder threads, campaign dashboards, and selective growth screenshots. That made it difficult to separate genuine adoption from marketing.",
  },
  {
    type: "paragraph",
    text: "Onchain card data gives a cleaner view. PaymentScan tracks crypto payment card activity across major card programs and issuer infrastructure. The market has gone from almost nothing in early 2023 to a visible payments category in 2026.",
  },
  {
    type: "paragraph",
    text: "The curve is hard to ignore. In March 2023, tracked monthly volume was only $234. By May 2026, monthly volume was $832.8M. Monthly transactions increased from 27 to more than 3.1M. Active addresses increased from 7 to more than 383,000.",
  },
  {
    type: "paragraph",
    text: "The point is not only growth in dollar volume. It is growth in behavior. Transaction count and active addresses are rising alongside volume. That matters because it suggests the category is not being driven only by a few large users moving capital. More users are entering the market, and the pattern is starting to resemble payment behavior rather than only treasury movement.",
  },
  {
    type: "paragraph",
    text: "The dataset still needs to be interpreted carefully. PaymentScan tracks onchain-observable flows. Some card programs, especially exchange-issued cards, can debit user balances internally and settle with payment networks offchain. Those flows may not appear in public onchain datasets. Even inside tracked programs, some top-ups and settlement flows may be undercounted or partially offchain.",
  },
  {
    type: "callout",
    label: "Methodology Note",
    text: "PaymentScan should be read as a lower-bound dataset, not a full market-sizing dataset.",
    tone: "info",
  },
  {
    type: "figure",
    title: "PaymentScan Methodology",
    src: "/research/stablecoin-card-account/paymentscan-methodology.png",
    alt: "PaymentScan methodology notes about observable crypto card activity",
    caption: "Figure 2: PaymentScan methodology notes show why the visible dataset should be treated as a lower-bound estimate of observable card activity. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "The visible market has already crossed billions in tracked volume. The actual market is likely larger. That is the first important signal: crypto cards are no longer a niche feature. They are becoming the front door into a broader stablecoin financial account.",
  },
  { type: "heading", text: "Crypto Cards Are Splitting Into Two Different Markets" },
  {
    type: "paragraph",
    text: "Most commentary still treats crypto cards as one category. Product behavior and onchain data suggest something more specific: two markets are forming.",
  },
  {
    type: "paragraph",
    text: "The first market is off-ramp banking.",
  },
  {
    type: "figure",
    title: "RedotPay Card Volume",
    src: "/research/stablecoin-card-account/redotpay-card-volume.png",
    alt: "PaymentScan RedotPay crypto card volume profile",
    caption: "Figure 3A: RedotPay shows the off-ramp banking profile: high tracked volume, broad address count, and stablecoin-to-real-world spending demand. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "These are products where users hold stablecoins or crypto and want access to real-world spending, global dollar rails, and local purchasing power. Average transaction sizes are higher. The use case is closer to capital movement, remittance, dollar access, and stablecoin-to-fiat conversion. RedotPay and KAST sit closer to this side of the market.",
  },
  {
    type: "paragraph",
    text: "The second market is everyday crypto spending.",
  },
  {
    type: "figure",
    title: "Gnosis Pay Profile",
    src: "/research/stablecoin-card-account/gnosis-pay-profile.png",
    alt: "PaymentScan Gnosis Pay crypto card activity profile",
    caption: "Figure 3B: Gnosis Pay shows a different profile: lower total volume than off-ramp-heavy cards, but millions of transactions, pointing toward routine spend behavior. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "These products serve users who spend more frequently, with smaller transaction sizes, often from self-custodial or DeFi-connected accounts. The use case is closer to living on crypto: spending without selling, earning yield, borrowing against assets, and using a card as part of an onchain financial life. EtherFi, Tria, and Gnosis Pay sit closer to this side of the market.",
  },
  {
    type: "paragraph",
    text: "The distinction is commercially important because these users do not want the same product. An off-ramp user wants reliability, local acceptance, high limits, simple custody, and stablecoin-to-fiat access. An everyday crypto spender wants self-custody, chain abstraction, yield, credit, wallet integration, and control over how assets are used.",
  },
  {
    type: "paragraph",
    text: "Conflating the two markets leads to confused products. A crypto neobank does not win by saying it has a card. It wins by knowing which financial behavior the card is supposed to unlock.",
  },
  { type: "heading", text: "The Five Product Archetypes Defining the Market" },
  {
    type: "figure",
    title: "Product Archetypes",
    src: "/research/stablecoin-card-account/product-archetypes.png",
    alt: "PaymentScan table comparing crypto card product archetypes",
    caption: "Figure 4: Crypto cards are differentiating across rewards, FX, wallet support, payment networks, and borrow-to-spend functionality. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "RedotPay is the clearest example of crypto cards as access infrastructure. Its strength is not premium design, self-custody purity, or DeFi composability. Its strength is simpler: people have stablecoins and need to spend them.",
  },
  {
    type: "paragraph",
    text: "That wedge is powerful in markets where local banking is limited, dollar access is valuable, remittance flows are common, and crypto is closer to financial infrastructure than speculation. RedotPay is custodial, simple, high-volume, and optimized for global spend. It runs across many chains, with relevance in emerging markets and stablecoin-heavy corridors.",
  },
  {
    type: "paragraph",
    text: "The lesson is uncomfortable but important: mainstream users do not always wake up wanting self-custody. Many want access, reliability, spending power, and protection from weak local rails. For those users, the first stablecoin neobank wedge may look less like DeFi and more like dollar banking for the rest of the world.",
  },
  {
    type: "paragraph",
    text: "KAST takes a different route. Instead of treating the card as only an off-ramp, it wraps spending inside a premium membership model: cashback tiers, points, Visa Platinum and Infinite positioning, and a more aspirational financial experience.",
  },
  {
    type: "paragraph",
    text: "This is a different monetization bet. Traditional neobanks often struggled to build strong economics from low-balance users and interchange alone. Premium banking changes the model. If users are willing to pay for better rewards, higher limits, better global access, and a stronger financial experience, the business can move beyond pure interchange.",
  },
  {
    type: "paragraph",
    text: "KAST is closer to a crypto-native Revolut or Amex-style membership layer than a simple card. The tradeoff is custody. KAST optimizes for convenience, rewards, and global access, not self-custody. For many users, that may be the correct tradeoff.",
  },
  {
    type: "paragraph",
    text: "The practical lesson is that the winning crypto neobank may not be the one that maximizes crypto ideology. It may be the one that packages stablecoin finance into a product mainstream users actually understand.",
  },
  {
    type: "paragraph",
    text: "EtherFi is one of the more important design patterns in the market because it changes what spending means. A normal prepaid crypto card follows a simple flow. EtherFi introduces a different model.",
  },
  {
    type: "figure",
    title: "EtherFi Borrow To Spend",
    src: "/research/stablecoin-card-account/etherfi-borrow-to-spend.png",
    alt: "PaymentScan EtherFi card volume and borrow-to-spend profile",
    caption: "Figure 5: EtherFi's borrow-to-spend model turns card spending into a collateralized credit primitive, not just a prepaid stablecoin flow. Source: PaymentScan.",
    visual: "rate-spread",
  },
  {
    type: "paragraph",
    text: "That is closer to a banking primitive than a payment feature. It turns crypto wealth into a usable balance sheet without forcing the user to sell their position. This matters because wealthy users in traditional finance already borrow against portfolios, property, receivables, and business cash flows. Crypto users also have assets, but those assets usually sit across wallets, exchanges, staking contracts, and DeFi protocols.",
  },
  {
    type: "paragraph",
    text: "A crypto neobank can turn those assets into spending power. This is what makes crypto banking meaningfully different from a debit card with a stablecoin balance behind it. The risk is also real. Users need to understand collateral volatility, liquidation risk, borrow rates, and platform risk.",
  },
  {
    type: "paragraph",
    text: "Still, the direction is important. The next neobank may not simply store money. It may turn onchain assets into spendable balance sheets.",
  },
  {
    type: "paragraph",
    text: "Tria represents another important direction: chain abstraction. Crypto still leaks infrastructure into the consumer experience. Users are asked to understand chains, bridges, wallets, gas, token standards, custody models, and signing flows. That is not consumer finance.",
  },
  {
    type: "paragraph",
    text: "Consumers do not care which database their bank uses. They will not care which chain their stablecoin sits on either. Tria's core bet is that the account should abstract the chain layer away. The user should see one balance, one card, one yield layer, and one spending experience. The system should decide how to route assets across chains in the background.",
  },
  {
    type: "figure",
    title: "Tria Card Volume",
    src: "/research/stablecoin-card-account/tria-card-volume.png",
    alt: "PaymentScan Tria card activity across chains",
    caption: "Figure 7: Tria's card activity spans multiple chains, reinforcing why chain abstraction is becoming part of the account experience. Source: PaymentScan.",
    visual: "market-map",
  },
  {
    type: "paragraph",
    text: "This matters because adding stablecoins is not enough. The harder product problem is hiding the fragmentation that makes crypto feel difficult. Chain abstraction by itself may not be a full banking wedge, but it is becoming a necessary part of the account experience. If stablecoin neobanks want mainstream usage, chain selection has to become invisible.",
  },
  {
    type: "paragraph",
    text: "Gnosis Pay matters because it has been live longer than most self-custodial card products and has proven that smart-wallet-based card spending can work in the real world.",
  },
  {
    type: "paragraph",
    text: "Its average transaction size is low compared with off-ramp-heavy programs, which suggests everyday usage rather than only large capital movement. That signal is worth taking seriously, but it needs to be judged alongside repeat usage, active accounts, and retention.",
  },
  {
    type: "paragraph",
    text: "The future of crypto banking will not be proven only by TVL or headline card volume. It will be proven by repeat small transactions: food, transport, subscriptions, retail, travel, and routine spending.",
  },
  {
    type: "paragraph",
    text: "Habit formation shows up in small transactions. A low average transaction size can be stronger evidence of real adoption than a high one, if it comes with repeat behavior.",
  },
  { type: "heading", text: "The Bigger Unlock Is Not the Card. It Is Settlement." },
  {
    type: "paragraph",
    text: "The card is the visible product. The more important shift is happening in settlement. Stablecoin-linked card infrastructure is beginning to change how money moves behind the scenes.",
  },
  {
    type: "paragraph",
    text: "Traditional card settlement is not always instant. Banking days, weekends, prefunding, reconciliation, and working capital all matter. Issuers and acquirers often need liquidity to bridge the gap between authorization, settlement, and repayment.",
  },
  {
    type: "paragraph",
    text: "Stablecoin settlement compresses that cycle. If an issuer can settle 24/7 in stablecoins, it can reduce trapped liquidity, improve reconciliation, and operate with fewer weekend and holiday float constraints. This is not only a UX improvement. It changes the balance-sheet design behind the product.",
  },
  {
    type: "paragraph",
    text: "Rain becomes important in that context. Rain is not just another card product. It is issuer infrastructure. It works directly with payment networks and powers multiple downstream card programs. Products like KAST, EtherFi, Tria, Karta, Solayer, Avici Money, and others can build user-facing products while relying on Rain's infrastructure underneath.",
  },
  {
    type: "figure",
    title: "Rain Infrastructure",
    src: "/research/stablecoin-card-account/rain-infrastructure.png",
    alt: "PaymentScan Rain issuer infrastructure activity",
    caption: "Figure 6: Rain illustrates the issuer-infrastructure layer behind multiple consumer-facing crypto card programs. Source: PaymentScan.",
    visual: "agent-network",
  },
  {
    type: "paragraph",
    text: "This points to a possible market structure: the stablecoin neobank category may not be won by one consumer app alone. It may also be shaped by the infrastructure layer that powers many apps.",
  },
  {
    type: "paragraph",
    text: "In Web2 neobanking, the stack looked like this: app, partner bank, card network, legacy settlement, user account. In stablecoin neobanking, the stack starts to look different: app, wallet or account abstraction, stablecoin balance, issuer infrastructure, card network, DeFi credit and yield layer, merchant settlement layer.",
  },
  {
    type: "paragraph",
    text: "That architecture creates room for new credit, settlement, liquidity, treasury, and merchant-financing products. The app remains important, but the back end becomes more powerful than it was in the first neobank wave.",
  },
  { type: "heading", text: "The Hidden Opportunity: Working Capital" },
  {
    type: "paragraph",
    text: "The most under-discussed part of stablecoin neobanking is working capital.",
  },
  {
    type: "paragraph",
    text: "When a cardholder spends, someone needs to fund settlement. If the issuer settles with the payment network today but collects repayment from the cardholder later, there is a funding gap. In traditional finance, that gap is solved through bank credit lines, private credit, or balance-sheet capital. Onchain, it can be solved through programmable credit.",
  },
  {
    type: "paragraph",
    text: "Credit Coop is a useful example. Its model gives lenders recourse to a borrower's onchain cash flows. The core primitive is a programmable lockbox over repayment flows. If the borrower misses payments, cash flows can be redirected to lenders automatically.",
  },
  {
    type: "paragraph",
    text: "That turns cash-flow lending into software. The lender does not only rely on a legal contract. The lender can also rely on programmable repayment routing.",
  },
  {
    type: "paragraph",
    text: "This is one of the most important parts of the stablecoin neobank thesis because it shows DeFi solving a real business problem, not just a trading problem.",
  },
  {
    type: "paragraph",
    text: "The same idea applies on the acquirer side. Merchants often wait days for card settlement. If a crypto-native payment processor can finance instant merchant payouts in stablecoins while traditional card settlement is still clearing, that is a genuine working-capital product.",
  },
  {
    type: "paragraph",
    text: "The merchant does not need to care about crypto. They get paid faster.",
  },
  {
    type: "paragraph",
    text: "This may become more important than cardholder rewards. Rewards are easy to copy and expensive to maintain. Financing the settlement gap is closer to infrastructure.",
  },
  {
    type: "paragraph",
    text: "That is where stablecoin payments become more than payments. They can support receivables financing, merchant cash-flow lending, instant settlement accounts, automated repayment routing, onchain credit facilities, programmable collateral, and stablecoin treasury products.",
  },
  {
    type: "callout",
    label: "Working Capital",
    text: "This is where DeFi stops looking like a casino and starts looking like financial infrastructure.",
    tone: "accent",
  },
  { type: "heading", text: "What Most Analysts Are Still Missing" },
  {
    type: "paragraph",
    text: "Most crypto card analysis focuses on cashback. That is the easiest thing to see, but probably the wrong level of analysis.",
  },
  {
    type: "paragraph",
    text: "Cashback is useful for acquisition. It is simple to market, simple to compare, and easy for users to understand. But it is rarely a durable moat. The deeper competition is happening across five layers.",
  },
  {
    type: "checklist",
    title: "Five Layers Of Competition",
    items: [
      { text: "Access Layer: can the user actually spend stablecoins where they live?", level: "green" },
      { text: "Premium Account Layer: can the product become a primary financial relationship instead of a one-off card?", level: "green" },
      { text: "Credit Layer: can users spend without selling assets?", level: "green" },
      { text: "Abstraction Layer: can the product hide chains, bridges, gas, and wallet complexity?", level: "green" },
      { text: "Intelligence Layer: can an AI agent help users manage money, risk, yield, credit, and payments?", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "RedotPay is strongest at the access layer. In emerging markets, the killer feature may simply be the ability to use dollar-like money in the real economy.",
  },
  {
    type: "paragraph",
    text: "KAST is built around the premium account layer. Membership, perks, points, limits, and rewards can create a banking relationship that feels aspirational rather than purely functional.",
  },
  {
    type: "paragraph",
    text: "EtherFi's edge is the credit layer. Borrow-to-spend is one of the most important crypto-native financial primitives because it turns wallets into balance sheets.",
  },
  {
    type: "paragraph",
    text: "Tria is built around the abstraction layer. The next billion users will not manage five chains manually. The product has to make the chain layer disappear.",
  },
  {
    type: "paragraph",
    text: "The intelligence layer is where the category becomes more interesting. AI inside a normal bank account is usually a chatbot or recommendation layer. AI inside a programmable financial account can become an execution layer.",
  },
  {
    type: "paragraph",
    text: "It can move idle stablecoins into approved yield accounts. It can warn a user before collateral risk becomes dangerous. It can choose whether a payment should come from cash balance, credit, yield withdrawal, or asset-backed borrowing.",
  },
  {
    type: "paragraph",
    text: "It can route money across chains without exposing the user to the complexity. It can help merchants decide whether to receive fiat settlement, USDC settlement, or split settlement.",
  },
  {
    type: "paragraph",
    text: "AI improves the interface. Stablecoins make the money programmable. Cards make the money usable in the real world. The convergence of all three is the real consumer finance opportunity.",
  },
  { type: "heading", text: "The Risk: Repeating the Old Neobank Mistake" },
  {
    type: "paragraph",
    text: "Crypto neobanks can still fail. The obvious mistake is the same one the first wave made: beautiful apps on top of fragile economics.",
  },
  {
    type: "paragraph",
    text: "Cashback can buy growth. Volume can arrive without retention. Incentive-seeking users can look like product-market fit until the rewards fade. Complexity can be hidden rather than solved.",
  },
  {
    type: "paragraph",
    text: "Compliance can be underestimated. Mainstream demand for crypto-native values can be overstated. Card volume can be mistaken for product-market fit when the volume is actually off-ramp demand, remittance flow, or rewards-driven usage.",
  },
  {
    type: "callout",
    label: "Operating Test",
    text: "Volume alone is not enough. The better metric is retained financial behavior.",
    tone: "warning",
  },
  {
    type: "checklist",
    title: "Questions That Matter",
    items: [
      { text: "Do users keep balances in the account?", level: "green" },
      { text: "Do they spend repeatedly?", level: "green" },
      { text: "Do they receive income there?", level: "green" },
      { text: "Do they repay credit there?", level: "green" },
      { text: "Do merchants choose stablecoin settlement more than once?", level: "green" },
      { text: "Does volume remain after rewards fall?", level: "green" },
      { text: "Does the account become primary or stay secondary?", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "A neobank does not win when someone downloads the app. It wins when the account becomes part of someone's financial life.",
  },
  {
    type: "paragraph",
    text: "For crypto neobanking, that is the operating test.",
  },
  { type: "heading", text: "Conclusion: The Next Neobank Will Be Invisible Crypto" },
  {
    type: "paragraph",
    text: "The first wave of neobanks proved that users wanted better financial distribution. They proved that banking could be mobile-first, software-first, and branchless.",
  },
  {
    type: "paragraph",
    text: "They did not fully rebuild banking.",
  },
  {
    type: "paragraph",
    text: "Stablecoins make that possible. They allow money to move globally, settle continuously, interact with software, support programmable credit, and connect into existing card networks.",
  },
  {
    type: "paragraph",
    text: "The strongest signal is already visible in card data. Tracked crypto card activity has grown from nearly zero to billions in cumulative volume, millions of monthly transactions, and hundreds of thousands of active addresses.",
  },
  {
    type: "paragraph",
    text: "The category is no longer a crypto experiment. It is an emerging consumer finance stack. But the card is only the entry point.",
  },
  {
    type: "checklist",
    title: "The Account Layer",
    items: [
      { text: "A stablecoin balance.", level: "green" },
      { text: "A card.", level: "green" },
      { text: "A yield layer.", level: "green" },
      { text: "A credit engine.", level: "green" },
      { text: "A treasury layer.", level: "green" },
      { text: "A merchant settlement product.", level: "green" },
      { text: "An AI-assisted financial account.", level: "green" },
    ],
  },
  {
    type: "paragraph",
    text: "That is the real neobank reset. The first generation of neobanks competed on interface. The next generation will compete on account economics: how money settles, earns, routes, borrows, repays, and connects to the real economy.",
  },
  {
    type: "paragraph",
    text: "The strongest products will not make users think more about crypto. They will make crypto less visible while making the account more useful.",
  },
  {
    type: "callout",
    label: "Closing Take",
    text: "That is how stablecoin cards become more than cards.",
    tone: "accent",
  },
  {
    type: "sources",
    items: ["PaymentScan"],
  },
];

const stablecoinsNotBuiltOnDebtContent: ArticleContentBlock[] = [
  { type: "heading", text: "Opening Thesis" },
  {
    type: "paragraph",
    text: "At first, Vitalik's article looks like another stablecoin design. That was also my first mistake while trying to understand it. When we hear words like synthetic assets, collateral, oracle, strike price, and maturity, our brain quickly puts it in the same bucket as DAI, Liquity, RAI, Synthetix, or some other overcollateralized DeFi product.",
  },
  {
    type: "paragraph",
    text: "But I do not think that is the right way to look at it.",
  },
  {
    type: "paragraph",
    text: "The more I understood the design, the more it felt like Vitalik is not trying to build a better USDC or another CDP stablecoin. He is trying to remove one old habit from DeFi: the habit of solving every collateral problem with liquidation.",
  },
  {
    type: "paragraph",
    text: "Most of DeFi has accepted liquidation as a natural thing. If you borrow against ETH and ETH goes down, you get liquidated. If your collateral ratio becomes weak, the protocol sells your collateral. If the system wants to stay solvent, someone has to be forced out.",
  },
  {
    type: "paragraph",
    text: "This has become so normal that we almost forget how strange it is. A user wants stability, but the mechanism that creates that stability depends on a panic button. The protocol is safe only if it can liquidate fast enough. And to liquidate fast enough, it needs a real-time oracle. Real-time oracles are one of the hardest things to make safe in crypto because they need to work exactly when the market is moving fastest.",
  },
  {
    type: "callout",
    label: "Core Question",
    text: "Can we create stable or index-like exposure without needing liquidation at all?",
    tone: "accent",
  },
  {
    type: "paragraph",
    text: "Vitalik's answer is: maybe yes, if the base building block is not debt, but options.",
  },
  { type: "heading", text: "Why Debt-Based Stablecoins Are Always Fighting the Same Battle" },
  {
    type: "figure",
    title: "Stable Exposure Without Liquidation",
    src: "/research/stablecoins-not-built-on-debt/stable-exposure-no-liquidation.png",
    alt: "Diagram comparing debt-based stablecoins with option-based synthetic assets",
    caption: "Figure 1: Debt-based systems create a promise and then need liquidation to protect that promise. Option-based systems split collateral into capped claims, so the protocol never promises more than it already holds.",
    visual: "reserve-flow",
  },
  {
    type: "paragraph",
    text: "Let us start from the normal model. A user has ETH. They do not want to sell ETH, but they want dollar exposure. So they deposit ETH into a protocol and mint a synthetic dollar.",
  },
  {
    type: "paragraph",
    text: "On the surface, this seems clean. The user keeps ETH exposure and gets liquidity. But the hidden problem is that the protocol only has ETH as collateral. It cannot magically guarantee dollar value if ETH falls too much.",
  },
  {
    type: "paragraph",
    text: "So the protocol creates a rule: if ETH falls near the value of the debt, the position must be liquidated. Example: ETH is at $2,500. A user deposits 1 ETH and borrows $2,000. If ETH falls toward $2,000, the protocol has to act quickly. It has to sell the ETH before the debt becomes larger than the collateral.",
  },
  {
    type: "paragraph",
    text: "That is the basic logic of CDP stablecoins. It works, but the weakness is clear: the system is safe only if the liquidation happens at the correct price and at the correct time.",
  },
  {
    type: "paragraph",
    text: "And for that, the system needs real-time price data. A real-time oracle has to tell the protocol the price right now. Not after a dispute. Not after humans check the data. Not after a prediction market resolves disagreement. Right now.",
  },
  {
    type: "paragraph",
    text: "So debt-based stablecoins are not just financial products. They are oracle-and-liquidation machines.",
  },
  {
    type: "paragraph",
    text: "Vitalik's idea is asking: what if we stop building the system around that machine?",
  },
  {
    type: "table",
    title: "Debt-Based Stablecoin vs Option-Based Synthetic",
    columns: ["Question", "Debt-Based Stablecoin", "Option-Based Synthetic"],
    rows: [
      ["Base primitive", "Borrowing against collateral", "Splitting collateral into two claims"],
      ["Main safety mechanism", "Liquidation", "Capped payoff"],
      ["Oracle requirement", "Real-time price feed", "Maturity/settlement oracle"],
      ["User risk", "Sudden liquidation", "Gradual drift"],
      ["Protocol risk", "Bad debt / liquidation failure", "Liquidity, slippage, and market-structure risk"],
      ["Best mental model", "Loan against collateral", "Fully funded protection trade"],
    ],
  },
  {
    type: "paragraph",
    text: "This table is important because it shows that Vitalik is not just changing a formula. He is changing the failure mode. In a debt system, the danger is that the system fails to liquidate. In an option system, the danger is that the protected asset stops tracking perfectly.",
  },
  {
    type: "paragraph",
    text: "Both have risks. But they are very different risks.",
  },
  { type: "heading", text: "The Simple Core of the Design" },
  {
    type: "paragraph",
    text: "The actual mechanism is surprisingly simple. Take 1 ETH and split it into two tokens: P and N.",
  },
  {
    type: "paragraph",
    text: "P is the protected side. N is the risky side. Together, P and N always represent the same 1 ETH. You can split 1 ETH into P + N, and you can combine P + N back into 1 ETH. There is no borrowing, no debt, and no promise that exceeds the collateral.",
  },
  {
    type: "paragraph",
    text: "The system only decides how the original 1 ETH will be divided between the two sides at maturity. That division depends on three things: the index being tracked, the strike price, and the maturity date.",
  },
  {
    type: "paragraph",
    text: "To make this understandable, let us use ETH/USD. Suppose ETH is currently trading at $2,500. Now imagine a P token with a $1,500 strike. So the pair is: P1500 + N1500.",
  },
  {
    type: "paragraph",
    text: "At maturity, if ETH is still above $1,500, P receives enough ETH to be worth $1,500. N receives the leftover ETH. If ETH is $2,500 at maturity, P gets 0.6 ETH because 0.6 ETH is worth $1,500. N gets 0.4 ETH, which is worth $1,000. Together, they still equal 1 ETH.",
  },
  {
    type: "table",
    title: "P1500 And N1500 Payoff",
    columns: ["ETH Price at Maturity", "P1500 Receives", "Value of P", "N1500 Receives", "Value of N"],
    rows: [
      ["$3,000", "0.50 ETH", "$1,500", "0.50 ETH", "$1,500"],
      ["$2,500", "0.60 ETH", "$1,500", "0.40 ETH", "$1,000"],
      ["$2,000", "0.75 ETH", "$1,500", "0.25 ETH", "$500"],
      ["$1,500", "1.00 ETH", "$1,500", "0.00 ETH", "$0"],
      ["$1,000", "1.00 ETH", "$1,000", "0.00 ETH", "$0"],
    ],
  },
  {
    type: "paragraph",
    text: "This table explains the whole mechanism. When ETH is above the strike, P behaves like a protected dollar claim. When ETH falls to the strike, P receives the entire ETH. When ETH falls below the strike, P cannot stay worth $1,500 because the system only has 1 ETH. So P becomes worth whatever 1 ETH is worth.",
  },
  {
    type: "figure",
    title: "P And N Behavior",
    src: "/research/stablecoins-not-built-on-debt/p-n-behavior-chart.png",
    alt: "Chart showing P and N behavior across ETH prices",
    caption: "Figure 2: P remains stable around the strike when ETH is above the strike. N captures the upside. If ETH falls below the strike, P gets the full ETH, but its dollar value can drift below the target.",
    visual: "rate-spread",
  },
  {
    type: "paragraph",
    text: "This is the entire tradeoff. No one gets liquidated, but the protected token stops being perfectly stable if the market moves too far.",
  },
  {
    type: "paragraph",
    text: "The system does not remove loss. It changes the shape of loss. In a debt system, the user is stable until they suddenly get liquidated. In this option system, the user is not liquidated, but their stable exposure can slowly drift.",
  },
  {
    type: "paragraph",
    text: "That difference sounds small, but it changes the whole philosophy of the product.",
  },
  { type: "heading", text: "What the Strike Price Actually Means" },
  {
    type: "paragraph",
    text: "Strike price sounds more complicated than it is. In this design, the strike is basically the protection level.",
  },
  {
    type: "paragraph",
    text: "If the strike is $1,500, then P tries to behave like a $1,500 claim as long as ETH stays above $1,500. So strike is not a prediction. It is not saying ETH will go to $1,500. It is more like saying: this is the line where the protected token starts losing its clean stable behavior.",
  },
  {
    type: "paragraph",
    text: "If ETH is far above the strike, P is comfortable. If ETH gets close to the strike, P becomes risky. If ETH goes below the strike, P becomes plain ETH exposure.",
  },
  {
    type: "table",
    title: "Strike Price Risk Choice",
    columns: ["Strike", "What It Means When ETH Is $2,500", "Benefit", "Risk"],
    rows: [
      ["$2,200", "Very close to current ETH price", "More protected dollar exposure", "High drift risk"],
      ["$1,500", "Moderate cushion", "Balanced protection", "Still needs monitoring"],
      ["$1,000", "Large cushion", "Safer protection", "Less capital efficient"],
    ],
  },
  {
    type: "paragraph",
    text: "The strike is basically a tradeoff between safety and capital efficiency. A higher strike gives more stable-dollar exposure, but it sits closer to the danger zone. A lower strike gives more safety, but it gives less protected dollar exposure for the same 1 ETH.",
  },
  {
    type: "paragraph",
    text: "This is similar to collateral ratios in borrowing. If you borrow aggressively against ETH, you are more capital efficient but closer to liquidation. If you choose a high strike in this design, you are more capital efficient but closer to drift. Different language. Similar tradeoff.",
  },
  {
    type: "figure",
    title: "Strike Price Risk Choice",
    src: "/research/stablecoins-not-built-on-debt/strike-price-risk-choice.png",
    alt: "Diagram showing strike price as a user risk choice",
    caption: "Figure 3: The strike is not a prediction. It is the user's chosen protection level. Higher strike gives more capital efficiency but more drift risk. Lower strike gives more cushion but less protected dollar exposure.",
    visual: "rate-spread",
  },
  { type: "heading", text: "Why Vitalik Says to Buy Strikes Below the Current Price" },
  {
    type: "paragraph",
    text: "This part confused me at first because it sounds like some options-trading instruction. But the intuition is simple.",
  },
  {
    type: "paragraph",
    text: "If ETH is at $2,500 and your goal is stability, you should not buy a P token with a $2,450 strike. That is like standing right next to the cliff. A small ETH move and your stable asset starts behaving less stable.",
  },
  {
    type: "paragraph",
    text: "Instead, you buy a P token with a strike far below the current ETH price, like P1500 or P1000. That way ETH has to fall a lot before your P token stops behaving like a protected asset.",
  },
  {
    type: "paragraph",
    text: "This is what deep in-the-money means here. You are choosing a P token that is safely away from the danger zone. The goal is not to maximize every dollar of capital efficiency. The goal is to keep the protected asset actually protected.",
  },
  {
    type: "paragraph",
    text: "This is where user behavior becomes important. The user is not supposed to just buy one P token and forget about it forever. They need to monitor the distance between current ETH price and strike. If ETH starts falling close to the strike, they should rotate.",
  },
  { type: "heading", text: "What Rotation Means" },
  {
    type: "paragraph",
    text: "Rotation simply means selling the old P token and buying a safer one. Suppose ETH starts at $2,500 and you buy P1500. At this point, there is decent cushion. Now imagine ETH falls to $1,850. You are still above the $1,500 strike, but the distance is much smaller. Your P token is no longer as comfortable as it was before.",
  },
  {
    type: "paragraph",
    text: "So you rotate. You sell P1500 and buy P1000. Now your new safety line is lower. This is not very different from rolling futures before expiry or rolling an options position. The goal is to avoid sitting in a position when its risk profile starts changing.",
  },
  {
    type: "table",
    title: "Rotation Triggers",
    columns: ["Situation", "What Is Happening", "What User/Vault Should Do"],
    rows: [
      ["ETH far above strike", "P has a strong safety cushion", "Hold position"],
      ["ETH moving closer to strike", "P still works, but risk is rising", "Prepare to rotate"],
      ["ETH very close to strike", "P may start drifting", "Rotate into lower strike"],
      ["Maturity approaching", "Oracle settlement risk rises", "Roll before maturity"],
      ["Market liquidity is weak", "Rotation may be expensive", "Reduce trading or use deeper markets"],
    ],
  },
  {
    type: "paragraph",
    text: "In practice, normal users will not do this manually. A normal user does not want to think about strike, maturity, slippage, oracle resolution, and whether to rotate today or tomorrow. That is too much.",
  },
  {
    type: "paragraph",
    text: "So if this idea ever becomes useful, it will probably not be used directly by most people. It will be wrapped into a vault or automated strategy. The user will deposit ETH, and the vault will manage the P positions behind the scenes.",
  },
  { type: "heading", text: "Why You Should Not Hold Until Maturity" },
  {
    type: "paragraph",
    text: "If you hold the P token until maturity, you are holding it into the oracle resolution moment. At that point, the asset is no longer behaving like a smooth stability product. It is becoming a final settlement claim.",
  },
  {
    type: "paragraph",
    text: "The oracle decides the final value. The P and N tokens settle. The payoff becomes fixed. If your goal is not settlement but continuous stable exposure, you probably do not want to go through that moment.",
  },
  {
    type: "paragraph",
    text: "It is like futures. A trader who wants continuous exposure does not usually wait for delivery. They roll before expiry. Same here. If you want stable-ish exposure, you roll before maturity.",
  },
  {
    type: "paragraph",
    text: "This also means the product is not passive in the same way USDC is passive. USDC does not need rolling. This does. And that is a real weakness.",
  },
  { type: "heading", text: "The Real Innovation: No Liquidation" },
  {
    type: "paragraph",
    text: "The more I look at this design, the more I feel the real innovation is not synthetic stablecoin. The real innovation is removing liquidation as the base safety mechanism.",
  },
  {
    type: "paragraph",
    text: "In a normal CDP system, the protocol makes a promise and then needs liquidation to keep that promise safe. In this system, the protocol does not make an uncapped promise. It only splits the ETH that already exists.",
  },
  {
    type: "paragraph",
    text: "P can receive at most 1 ETH. N can receive at most 1 ETH. Together, they can never receive more than 1 ETH. That is why the system cannot become insolvent in the same way as a debt-based stablecoin. There is no bad debt because there is no debt. There is just a capped payoff.",
  },
  {
    type: "callout",
    label: "Design Choice",
    text: "DeFi often tries to solve risk with more automation, faster liquidations, better bots, and more aggressive oracle systems. Vitalik is saying: maybe the better solution is to design the payoff so liquidation is not needed in the first place.",
    tone: "accent",
  },
  {
    type: "paragraph",
    text: "That is a deeper design choice.",
  },
  { type: "heading", text: "But This Is Not a USDC Killer" },
  {
    type: "paragraph",
    text: "It is important not to overhype this. This is not going to replace USDC for payments. If I want to send someone $100, I do not want to explain strike price, maturity, drift, or rebalancing. I just want to send $100.",
  },
  {
    type: "paragraph",
    text: "If a company is doing payroll, they do not want stable-ish. If a trader is calculating PnL, they do not want mostly stable. If an accountant is calculating taxes, they do not want it tracks unless ETH moves too close to the strike.",
  },
  {
    type: "paragraph",
    text: "So this is not a perfect simulated dollar. It is not clean money. It is more like protected exposure. That difference matters because if we judge this as a stablecoin, it looks weak. But if we judge it as a non-liquidating protection product, it becomes more interesting.",
  },
  {
    type: "callout",
    label: "Use Case",
    text: "Are there users who want to reduce ETH volatility without selling ETH, without borrowing, and without trusting a centralized issuer?",
    tone: "info",
  },
  {
    type: "paragraph",
    text: "That is where the real use case starts.",
  },
  {
    type: "table",
    title: "User Need Comparison",
    columns: ["User Need", "USDC / USDT", "CDP Stablecoin", "Option-Based P Token"],
    rows: [
      ["Exact dollar payment", "Strong", "Strong if peg holds", "Weak"],
      ["Avoid issuer risk", "Weak", "Stronger", "Strong"],
      ["Avoid liquidation", "Strong", "Weak", "Strong"],
      ["Keep ETH-linked exposure", "Weak", "Medium", "Medium"],
      ["Reduce volatility", "Strong", "Strong", "Medium/Strong, depending on strike"],
      ["UX simplicity", "Strong", "Medium", "Weak unless wrapped in a vault"],
    ],
  },
  {
    type: "paragraph",
    text: "This is why I think calling it a stablecoin may actually hurt the idea. The moment people hear stablecoin, they compare it to USDC. And compared to USDC, this is messy.",
  },
  {
    type: "paragraph",
    text: "But if you call it non-liquidating protection, the idea becomes much clearer. It is not trying to be perfect money. It is trying to be a better risk-management primitive.",
  },
  { type: "heading", text: "Who Would Actually Want This?" },
  {
    type: "paragraph",
    text: "The cleanest customer is an ETH-rich user who wants temporary stability. They do not want to sell ETH, borrow against ETH, take USDC issuer risk, or face liquidation risk. So they buy protected exposure. Their edge is simple: they get lower volatility without liquidation.",
  },
  {
    type: "paragraph",
    text: "The second customer is a DAO treasury. A DAO may have ETH-denominated wealth but fiat-denominated expenses. It needs to pay people, fund grants, pay audits, or manage runway. Selling ETH into stablecoins may be practical, but it creates issuer and custody risk. Borrowing against ETH keeps upside but creates liquidation risk. A non-liquidating stability vault could become a treasury tool.",
  },
  {
    type: "paragraph",
    text: "The third customer is someone who does not like centralized stablecoins. This is not the biggest market, but it is real. Some users care deeply about censorship resistance and issuer risk. For them, a less perfect but more crypto-native stability tool might be acceptable.",
  },
  {
    type: "paragraph",
    text: "The fourth customer is the speculator on the other side. For every P buyer, someone has to hold N. N is the risky upside token. The N buyer is basically saying: I want leveraged ETH upside with capped downside.",
  },
  {
    type: "table",
    title: "Likely Users",
    columns: ["User Type", "Their Problem", "Why This Model Helps", "Main Tradeoff"],
    rows: [
      ["ETH holder", "Wants temporary stability without selling ETH", "Gets protection without liquidation", "Protection can drift"],
      ["DAO treasury", "Needs short-term runway protection without fully exiting ETH", "Reduces ETH volatility", "Requires strategy management"],
      ["Stablecoin skeptic", "Dislikes issuer/censorship risk", "Gets crypto-native stability exposure", "Worse UX than stablecoins"],
      ["Options trader", "Wants capped-loss upside", "Buys the N side", "Can lose full premium"],
      ["Structured-product user", "Wants one-click protection", "Uses a vault instead of managing options manually", "Pays vault/rolling costs"],
    ],
  },
  {
    type: "paragraph",
    text: "This table is where the actual usability becomes clearer. The customer is not everyone who uses stablecoins. The customer is someone who specifically values non-liquidation and crypto-native protection.",
  },
  {
    type: "figure",
    title: "Users And Protocols Map",
    src: "/research/stablecoins-not-built-on-debt/users-protocols-map.png",
    alt: "Diagram mapping users and protocols for option-based protection",
    caption: "Figure 5: The product has two sides: users who want protection and protocols/traders who can price or package that protection. The first real market is probably not payments, but treasury and risk-management use cases.",
    visual: "market-map",
  },
  { type: "heading", text: "The Product Should Probably Be a Vault" },
  {
    type: "paragraph",
    text: "If this idea ever becomes usable, I do not think the main product will be raw P tokens. The main product should be a vault.",
  },
  {
    type: "paragraph",
    text: "A user deposits ETH. The vault chooses strikes, chooses maturities, buys P tokens, rotates before maturity, manages slippage, and publishes the risk profile. The user simply chooses a strategy.",
  },
  {
    type: "figure",
    title: "Vault Product Flow",
    src: "/research/stablecoins-not-built-on-debt/vault-product-flow.png",
    alt: "Diagram showing a vault abstraction for option-based protection",
    caption: "Figure 4: A real product would likely hide most of the complexity. The user would not manually manage every strike and maturity. A vault or strategy layer would handle rotation, rebalancing, and maturity management.",
    visual: "reserve-flow",
  },
  {
    type: "table",
    title: "Vault Product Types",
    columns: ["Vault Type", "Strategy", "User Profile", "Risk"],
    rows: [
      ["Conservative", "Lower strike, larger cushion", "DAO treasury / risk-averse ETH holder", "Lower capital efficiency"],
      ["Balanced", "Moderate strike and active rolling", "DeFi-native treasury/user", "Medium drift risk"],
      ["Aggressive", "Higher strike, more exposure", "User wants more dollar protection per ETH", "Higher drift risk"],
    ],
  },
  {
    type: "paragraph",
    text: "The vault would not say: this is always worth $1. It would say: this strategy tries to preserve short-term purchasing power while avoiding forced liquidation.",
  },
  {
    type: "paragraph",
    text: "That is honest. And honestly, this is probably the best go-to-market wedge. Not new stablecoin. Not USDC killer. Not algorithmic dollar. But: non-liquidating ETH downside protection.",
  },
  {
    type: "paragraph",
    text: "That sounds less sexy, but it is much more real.",
  },
  { type: "heading", text: "Which Protocols Could Use This?" },
  {
    type: "paragraph",
    text: "This is where the idea becomes useful from an investment perspective. We do not need to build everything from zero. A lot of pieces already exist in DeFi. The missing part is the right product layer.",
  },
  {
    type: "paragraph",
    text: "Options protocols are the most obvious beneficiaries. They already understand strike, maturity, collateral, payoff, market makers, and settlement. The problem with onchain options historically has been that they are too trader-focused and often struggle with consistent demand.",
  },
  {
    type: "paragraph",
    text: "This model could give options protocols a new demand source. Instead of only selling volatility trading tools, they could sell protection. A P-token market is not just an options trade. It is a stability product.",
  },
  {
    type: "paragraph",
    text: "Structured-product protocols may benefit even more because the hardest part is not the formula. The hardest part is managing the strategy: which strike to use, how often to rotate, how much slippage is acceptable, when maturity should be avoided, and how users should understand the risk.",
  },
  {
    type: "paragraph",
    text: "UMA-style synthetic contract systems could also benefit. This model is very close to long/short collateral settlement at expiry. That makes it useful for assets where real-time liquidation is not practical.",
  },
  {
    type: "paragraph",
    text: "This matters for long-tail synthetic assets. USD/ETH is easy to price. But what about CPI? What about rent prices in a city? What about commodity baskets? What about personalized cost-of-living exposure? These are harder to support with real-time liquidation oracles. But if the asset only settles at maturity, the oracle problem becomes easier.",
  },
  {
    type: "paragraph",
    text: "Synthetix-like protocols could use this idea too, but probably not to replace perps. Traders still want deep liquidity, instant execution, leverage, and tight pricing. But for slower synthetic indices, this design could be useful.",
  },
  {
    type: "paragraph",
    text: "CDP stablecoin protocols could use it as an adjacent product, not a replacement. A Maker-style or Liquity-style system could offer two different products: one product gives exact stablecoin borrowing but includes liquidation risk; another product gives non-liquidating protected exposure but includes drift risk.",
  },
  {
    type: "table",
    title: "Protocol Categories",
    columns: ["Protocol Category", "How This Model Helps", "Likely Product"],
    rows: [
      ["Options protocols", "Creates demand beyond pure volatility trading", "P/N markets with strikes and maturities"],
      ["Structured-product vaults", "Abstracts strike selection and rolling", "Protected ETH vault"],
      ["UMA-style synthetic systems", "Supports expiry-based settlement", "CPI/rent/commodity index claims"],
      ["Synthetix-like systems", "Adds slower long-tail synthetic exposure", "Non-liquidating index products"],
      ["CDP/stablecoin protocols", "Gives users an alternative to liquidation debt", "Adjacent protected-exposure product"],
      ["Lending markets", "Could use mature P tokens as collateral later", "Conservative collateral asset, if liquid"],
    ],
  },
  {
    type: "paragraph",
    text: "Some users hate liquidation more than they hate drift. Some users hate drift more than they hate liquidation. Both markets can exist.",
  },
  { type: "heading", text: "Do We Need New Systems?" },
  {
    type: "paragraph",
    text: "My answer is: not fully, but somewhat.",
  },
  {
    type: "paragraph",
    text: "The primitives exist. Options protocols exist. Oracle systems exist. Vault infrastructure exists. Market makers exist. Synthetic asset ideas exist.",
  },
  {
    type: "paragraph",
    text: "But the clean user-facing product does not really exist yet. The missing thing is not just code. The missing thing is market structure.",
  },
  {
    type: "paragraph",
    text: "For this to work, there needs to be deep liquidity across strikes and maturities. Users need to rotate cheaply. Market makers need to hold N. Vaults need to manage positions without eating too much slippage.",
  },
  {
    type: "paragraph",
    text: "If rebalancing costs too much, the product may become uncompetitive very quickly. This is the practical wall. The idea is elegant, but the market has to be good enough for the elegance to matter.",
  },
  {
    type: "paragraph",
    text: "That is usually where DeFi ideas live or die. Not in the formula. In liquidity.",
  },
  { type: "heading", text: "The Main Risks" },
  {
    type: "paragraph",
    text: "The first risk is drift. This is the risk that the protected token stops tracking well when ETH gets close to the strike. If ETH falls below the strike, P becomes 1 ETH. It is not a dollar claim anymore.",
  },
  {
    type: "paragraph",
    text: "The second risk is rebalancing. Someone has to rotate positions when ETH gets close to strike or when maturity approaches. If the user or vault rotates too late, the position drifts. If it rotates too often, costs increase.",
  },
  {
    type: "paragraph",
    text: "The third risk is slippage. This may be the biggest real-world risk. If P/N markets are not liquid, users will lose money every time they rebalance. And if the product loses too much value through rolling, people will just use USDC or a normal stablecoin.",
  },
  {
    type: "paragraph",
    text: "The fourth risk is N-side demand. P buyers need N buyers. If nobody wants the risky side, protection becomes expensive. The system needs speculators, market makers, and options traders to make the protection side usable.",
  },
  {
    type: "paragraph",
    text: "The fifth risk is oracle settlement. The design removes real-time liquidation oracles, which is a big improvement. But it still needs an oracle at maturity. So oracle risk is reduced, not removed.",
  },
  {
    type: "paragraph",
    text: "The sixth risk is UX. Strike, maturity, drift, rolling, slippage, oracle settlement - these are not things normal users want to think about. If the product is not abstracted properly, it will stay inside a small circle of DeFi nerds.",
  },
  {
    type: "table",
    title: "Risk Map",
    columns: ["Risk", "What It Means", "Why It Matters"],
    rows: [
      ["Drift risk", "P stops tracking near/below strike", "User loses stable exposure"],
      ["Rebalancing risk", "Position must be rotated", "Bad timing hurts performance"],
      ["Slippage risk", "Rolling costs too much", "Can make product uncompetitive"],
      ["N-side demand risk", "Not enough buyers for risky side", "Protection becomes expensive"],
      ["Oracle risk", "Settlement still needs oracle", "Reduced, not removed"],
      ["UX risk", "Too complex for normal users", "Needs vault abstraction"],
    ],
  },
  {
    type: "figure",
    title: "Risk Map",
    src: "/research/stablecoins-not-built-on-debt/risk-map.png",
    alt: "Diagram showing risks for option-based synthetic assets",
    caption: "Figure 6: This design does not remove risk. It moves risk away from liquidation and into drift, rebalancing, liquidity, and UX.",
    visual: "market-map",
  },
  { type: "heading", text: "The Harsh Truth" },
  {
    type: "paragraph",
    text: "This idea is not useful for everyone.",
  },
  {
    type: "paragraph",
    text: "If you want to send dollars, use a stablecoin. If you want max leverage, use perps. If you want exact borrowing liquidity, use a CDP. If you want simple treasury cash, use something liquid and boring.",
  },
  {
    type: "paragraph",
    text: "This model is for a different person. It is for someone who says: I hold ETH. I want some stability. I do not want to sell. I do not want to borrow. I do not want liquidation. I am okay with imperfect tracking. I understand that protection has a cost.",
  },
  {
    type: "paragraph",
    text: "That is the customer.",
  },
  {
    type: "paragraph",
    text: "This is why I think calling it a stablecoin may actually hurt the idea. The moment people hear stablecoin, they compare it to USDC. And compared to USDC, this is messy.",
  },
  {
    type: "paragraph",
    text: "But if you call it non-liquidating protection, the idea becomes much clearer. It is not trying to be perfect money. It is trying to be a better risk-management primitive.",
  },
  { type: "heading", text: "Why I Still Think It Matters" },
  {
    type: "paragraph",
    text: "The reason I find this idea interesting is not because it will immediately become a huge consumer product. It is interesting because it changes the lens.",
  },
  {
    type: "paragraph",
    text: "Most synthetic asset designs start with: how do we keep the debt safe? This design starts with: what if we avoid debt?",
  },
  {
    type: "paragraph",
    text: "That is a very different starting point. And in crypto, starting points matter.",
  },
  {
    type: "paragraph",
    text: "If the base primitive is debt, you inherit liquidation, real-time oracle risk, bad debt risk, and liquidation cascades. If the base primitive is a capped option claim, you inherit drift, rebalancing, liquidity, and strategy risk.",
  },
  {
    type: "paragraph",
    text: "Neither is free. But the second set of risks may be more manageable for some use cases, especially for long-tail synthetic assets.",
  },
  {
    type: "paragraph",
    text: "I do not think the largest opportunity is only ETH/USD stability. The bigger opportunity may be synthetic exposure to indices that are currently hard to build: CPI exposure, rent index exposure, commodity basket exposure, cost-of-living protection, DAO treasury hedges, and personalized savings baskets.",
  },
  {
    type: "paragraph",
    text: "These things are difficult in debt-based systems because you need continuous pricing and liquidation. But if you only need maturity settlement, more things become possible.",
  },
  {
    type: "paragraph",
    text: "That is where this idea becomes deeper than stablecoins. It starts looking like a way to build markets around future purchasing power.",
  },
  { type: "heading", text: "My Final Understanding" },
  {
    type: "paragraph",
    text: "Vitalik's idea is not build another stablecoin. It is more like: can we build stable exposure without building a liquidation machine underneath it?",
  },
  {
    type: "paragraph",
    text: "The answer is to split ETH into two claims. P gets the protected side. N gets the risky upside side. Together they always equal the original ETH. Because the system never promises more than it holds, it does not need forced liquidation.",
  },
  {
    type: "paragraph",
    text: "That is the clean part.",
  },
  {
    type: "paragraph",
    text: "The messy part is everything around it. P can drift. Users need to rebalance. Markets need liquidity. Vaults need good strategy. The product is not useful as perfect money. The UX is too hard without abstraction.",
  },
  {
    type: "callout",
    label: "Final Understanding",
    text: "This is not a USDC replacement. It is a new way to think about crypto-native protection.",
    tone: "accent",
  },
  {
    type: "paragraph",
    text: "The best first product is probably a protected ETH vault, not a stablecoin. The best first users are probably ETH holders, DAO treasuries, DeFi-native funds, and people who care more about avoiding liquidation and issuer risk than having a perfect dollar.",
  },
  {
    type: "paragraph",
    text: "The best protocol beneficiaries are options venues, structured-product vaults, UMA-style synthetic systems, and maybe CDP protocols as an adjacent product.",
  },
  {
    type: "paragraph",
    text: "The edge is simple but powerful: it turns the stable asset problem from a liquidation problem into a risk-tranching problem.",
  },
  {
    type: "paragraph",
    text: "And that may be the real insight. For years, DeFi has treated liquidation as the natural cost of creating synthetic stability. Vitalik's article asks whether that cost is actually necessary.",
  },
  {
    type: "paragraph",
    text: "Maybe for some products it is. But maybe for others, stability should not come from debt at all. Maybe it should come from options, from capped payoffs, from users choosing their own protection level, and from markets that price risk without needing to forcibly liquidate anyone.",
  },
  {
    type: "paragraph",
    text: "That is the part worth thinking about. Not because the model is perfect. But because it points toward a different kind of DeFi - one where stability is not borrowed into existence, but structured.",
  },
  {
    type: "sources",
    items: ["Vitalik Buterin, Ethereum Research: Building index-tracking assets on top of options instead of debt"],
  },
];

export const articles: Article[] = [
  {
    slug: "usdd-pendle-investment-memo",
    title: "USDD Investment Memo: Why the Pendle Listing Matters",
    thesis: "USDD's Pendle market matters because it brings the stablecoin's yield into DeFi's fixed-yield ecosystem, where it can be priced, traded, and structured.",
    tags: ["USDD", "Pendle", "Stablecoins", "Yield"],
    date: "2025-01-20",
    readTime: 14,
    status: "Memo",
    category: "Stablecoin Yield",
    featured: true,
    conclusion: "USDD has built a reserve engine that generates real income, and Pendle gives that yield a market.",
    coverArt: { variant: "flows", colors: ["#0b2f1e", "#32d583", "#facc15"], label: "UP" },
    content: usddPendleContent,
  },
  {
    slug: "stablecoin-card-account",
    title: "The Stablecoin Card Is Not the Product. The Account Is.",
    thesis: "Stablecoin cards, crypto neobanks, PaymentScan data, settlement, working capital, credit, and AI-assisted financial accounts.",
    tags: ["Stablecoin Cards", "Crypto Neobanks", "Settlement", "Working Capital", "Consumer Crypto"],
    date: "2026-06-24",
    readTime: 16,
    status: "Published",
    category: "Consumer Crypto",
    featured: true,
    conclusion: "That is how stablecoin cards become more than cards.",
    content: stablecoinCardAccountContent,
  },
  {
    slug: "stablecoins-not-built-on-debt",
    title: "What If Stablecoins Were Not Built on Debt?",
    thesis: "A practical explanation of Vitalik Buterin's option-based synthetic asset design.",
    tags: ["Stablecoins", "Options", "Synthetic Assets", "Liquidation", "DeFi Design"],
    date: "2026-06-24",
    readTime: 23,
    status: "Published",
    category: "Protocol Research",
    featured: true,
    conclusion: "This is not a USDC replacement. It is a new way to think about crypto-native protection.",
    content: stablecoinsNotBuiltOnDebtContent,
  },
];
