import {
  PRDInput,
  PRDOutput,
  UserStoryInput,
  UserStoriesOutput,
  AcceptanceCriteriaInput,
  AcceptanceCriteriaOutput,
  RICEData,
  FunctionalRequirement,
} from './types';

// Standard RICE Formula: (Reach * Impact * (Confidence / 100)) / Effort
export function calculateRICEScore(
  reach: number,
  impact: number,
  confidence: number,
  effort: number
): number {
  if (effort <= 0) return 0;
  const confidenceDecimal = Math.min(100, Math.max(0, confidence)) / 100;
  return Math.round((reach * impact * confidenceDecimal) / effort);
}

export class MockAIEngine {
  /**
   * Dynamic PRD Generator that detects the product domain (Swiggy, Netflix, Uber, AI SaaS, E-Commerce, or Custom)
   * and generates all 11 required sections dynamically with zero generic placeholders.
   */
  static async generatePRD(input: PRDInput): Promise<PRDOutput> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const name = input.productName.trim();
    const desc = input.productDescription?.trim() || '';
    const prob = input.problemStatement?.trim() || '';
    const goal = input.goal?.trim() || '';
    const users = input.targetUsers?.trim() || '';

    const combinedText = `${name} ${desc} ${prob} ${goal} ${users}`.toLowerCase();

    // 1. Food Delivery / Q-Commerce Domain (Swiggy, Zomato, Instamart, DoorDash, UberEats)
    if (
      combinedText.includes('swiggy') ||
      combinedText.includes('zomato') ||
      combinedText.includes('instamart') ||
      combinedText.includes('doordash') ||
      combinedText.includes('ubereats') ||
      combinedText.includes('food delivery') ||
      combinedText.includes('q-commerce') ||
      combinedText.includes('restaurant')
    ) {
      return this.generateFoodDeliveryPRD(name || 'Swiggy Food & Grocery Express', prob, goal);
    }

    // 2. Video Streaming Platform Domain (Netflix, Prime Video, Hulu, Spotify)
    if (
      combinedText.includes('netflix') ||
      combinedText.includes('prime video') ||
      combinedText.includes('hulu') ||
      combinedText.includes('spotify') ||
      combinedText.includes('streaming') ||
      combinedText.includes('video platform') ||
      combinedText.includes('binge')
    ) {
      return this.generateStreamingPRD(name || 'Netflix Streaming Platform', prob, goal);
    }

    // 3. Ride-Sharing & Mobility Domain (Uber, Lyft, Ola, Taxi)
    if (
      combinedText.includes('uber') ||
      combinedText.includes('lyft') ||
      combinedText.includes('ola') ||
      combinedText.includes('ride') ||
      combinedText.includes('driver') ||
      combinedText.includes('cab') ||
      combinedText.includes('taxi')
    ) {
      return this.generateRideSharingPRD(name || 'Uber Mobility & Ride Hub', prob, goal);
    }

    // 4. AI SaaS / Productivity Co-pilot Domain
    if (
      combinedText.includes('copilot') ||
      combinedText.includes('ai agent') ||
      combinedText.includes('productpilot') ||
      combinedText.includes('saas') ||
      combinedText.includes('prompt') ||
      input.templateCategory === 'ai'
    ) {
      return this.generateAISaaSProductPRD(name || 'ProductPilot AI Co-pilot Hub', prob, goal);
    }

    // 5. E-Commerce / Marketplace Domain
    if (
      combinedText.includes('shopify') ||
      combinedText.includes('amazon') ||
      combinedText.includes('checkout') ||
      combinedText.includes('cart') ||
      combinedText.includes('storefront') ||
      input.templateCategory === 'ecommerce'
    ) {
      return this.generateEcommercePRD(name || 'Express 1-Click Checkout Platform', prob, goal);
    }

    // 6. Universal Custom Product Synthesizer (Any custom product idea entered by the user)
    return this.generateCustomProductPRD(name, desc, prob, goal, users);
  }

  // --- Domain Generator 1: Food Delivery (Swiggy) ---
  private static generateFoodDeliveryPRD(name: string, customProb: string, customGoal: string): PRDOutput {
    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: 'FR-FD-01',
        title: 'Real-Time Hyper-Local GPS Order Tracking',
        description: 'Broadcast live delivery partner coordinates on a map with dynamic ETA recalculation based on traffic conditions.',
        priority: 'High',
        rice: {
          reach: 85000,
          impact: 5,
          confidence: 90,
          effort: 3,
          score: calculateRICEScore(85000, 5, 90, 3),
          explanation: 'Reach: 85,000 active daily orderers; Impact: 5/5 essential for customer anxiety reduction; Confidence: 90%; Effort: 3 person-weeks.',
        },
      },
      {
        id: 'FR-FD-02',
        title: 'Smart Kitchen Order Dispatch & Routing Algorithm',
        description: 'Auto-assign orders to the nearest delivery partner once food prep reaches 80% completion to minimize idle kitchen time.',
        priority: 'High',
        rice: {
          reach: 12000,
          impact: 4,
          confidence: 85,
          effort: 4,
          score: calculateRICEScore(12000, 4, 85, 4),
          explanation: 'Reach: 12,000 partner restaurants; Impact: 4/5 cuts delivery time by 6 mins; Confidence: 85%; Effort: 4 person-weeks.',
        },
      },
      {
        id: 'FR-FD-03',
        title: 'Multi-Cart Quick Commerce Add-on',
        description: 'Allow customers to bundle quick grocery items (Instamart) with restaurant orders in a unified checkout.',
        priority: 'Medium',
        rice: {
          reach: 45000,
          impact: 3,
          confidence: 80,
          effort: 2,
          score: calculateRICEScore(45000, 3, 80, 2),
          explanation: 'Reach: 45,000 users; Impact: 3/5 increases average order value (AOV); Confidence: 80%; Effort: 2 person-weeks.',
        },
      },
    ];

    return {
      productOverview: `${name} is an enterprise-grade hyper-local food and quick-commerce delivery platform designed to connect hungry consumers, merchant kitchens, and delivery fleets with sub-30 minute SLA guarantees.`,
      problemStatement: customProb || 'Customers suffer from inaccurate delivery ETAs and delayed order prep times, while restaurants waste food due to uncoordinated rider arrivals during peak dinner rush hours.',
      businessGoals: [
        customGoal || 'Reduce average food delivery time from 38 minutes to under 26 minutes.',
        'Increase 30-day order repeat rate by 35% through transparent live tracking.',
        'Improve delivery partner fleet utilization efficiency by 22%.',
      ],
      userPersonas: [
        {
          name: 'Hungry Consumer (Rahul)',
          role: 'Urban Working Professional',
          painPoints: ['Vague ETA estimates', 'Cold food upon delivery', 'Difficult refund process for missing items'],
        },
        {
          name: 'Merchant Kitchen Manager (Chef Anish)',
          role: 'Restaurant Partner Operator',
          painPoints: ['Riders crowding kitchen counters', 'Unpredictable order prep surges', 'Stock out of popular dishes'],
        },
        {
          name: 'Delivery Executive (Vikram)',
          role: 'Fleet Logistics Partner',
          painPoints: ['Excessive waiting at restaurants', 'Unclear customer address instructions', 'Inefficient route navigation'],
        },
      ],
      userJourney: [
        'Customer browses curated restaurant menus and customizes dish add-ons.',
        'Customer completes 1-tap checkout via UPI or digital wallet.',
        'Restaurant receives order ticket on kitchen terminal and begins prep.',
        'Smart Dispatch Engine assigns nearest delivery partner based on real-time traffic.',
        'Delivery executive picks up order, follows optimized turn-by-turn navigation.',
        'Customer watches live map tracking until doorstep contactless handoff.',
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        'Peak Load Throughput: System must process 15,000 concurrent orders/minute during IPL/Sunday dinner rushes.',
        'GPS Latency: Map coordinate updates must push to mobile clients within < 2 seconds.',
        '99.99% Availability for Payment Gateway webhooks to prevent duplicate charges.',
      ],
      userStories: [
        {
          id: 'US-FD-01',
          userRole: 'Hungry Customer',
          goal: 'to track my delivery driver on an interactive live map',
          benefit: 'I know exactly when to step outside to pick up my hot meal',
          priority: 'High',
          estimatedEffort: '3 person-weeks',
          formattedStory: 'As a Hungry Customer, I want to track my delivery driver on an interactive live map so that I know exactly when to step outside to pick up my hot meal.',
        },
        {
          id: 'US-FD-02',
          userRole: 'Restaurant Manager',
          goal: 'to mark dish availability in 1-click',
          benefit: 'customers do not order sold-out menu items',
          priority: 'High',
          estimatedEffort: '1 person-week',
          formattedStory: 'As a Restaurant Manager, I want to mark dish availability in 1-click so that customers do not order sold-out menu items.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-FD-01',
          given: 'a customer has an active order in transit',
          when: 'the delivery executive moves 100 meters closer to the destination',
          then: 'the map marker updates position smoothly within 2 seconds without page refresh.',
          checklistItems: ['GPS latitude/longitude payload emitted via WebSockets', 'ETA decrements automatically', 'Push notification sent at 500m distance threshold'],
        },
      ],
      successMetrics: [
        'Average Order SLA < 27 minutes',
        'Customer CSAT Score > 4.8 / 5.0',
        'Order Cancellation Rate < 0.8%',
      ],
      risks: [
        {
          risk: 'Severe monsoon weather disrupting delivery partner availability and increasing ETAs.',
          mitigation: 'Implement dynamic rain surge bonuses for riders and adjust customer search radius automatically.',
        },
        {
          risk: 'GPS spoofing by delivery partners to claim false arrival bonuses.',
          mitigation: 'Cross-verify geofence coordinates against restaurant bluetooth beacons and Wi-Fi signatures.',
        },
      ],
    };
  }

  // --- Domain Generator 2: Streaming Platform (Netflix) ---
  private static generateStreamingPRD(name: string, customProb: string, customGoal: string): PRDOutput {
    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: 'FR-NF-01',
        title: 'Adaptive Bitrate 4K HDR Video Player Engine',
        description: 'Dynamically scale video resolution between 1080p, 4K, and HDR based on real-time bandwidth inspection with zero buffering freezes.',
        priority: 'High',
        rice: {
          reach: 250000,
          impact: 5,
          confidence: 95,
          effort: 5,
          score: calculateRICEScore(250000, 5, 95, 5),
          explanation: 'Reach: 250,000 active streaming subscribers; Impact: 5/5 core playback value; Confidence: 95%; Effort: 5 person-weeks.',
        },
      },
      {
        id: 'FR-NF-02',
        title: 'AI Personalized Content Recommendation Matrix',
        description: 'Vector-based ML model matching user viewing history, genre affinity, and time-of-day habits to display personalized hero banners.',
        priority: 'High',
        rice: {
          reach: 250000,
          impact: 4,
          confidence: 85,
          effort: 4,
          score: calculateRICEScore(250000, 4, 85, 4),
          explanation: 'Reach: All subscribers; Impact: 4/5 drives binge watching retention; Confidence: 85%; Effort: 4 person-weeks.',
        },
      },
      {
        id: 'FR-NF-03',
        title: 'Offline Downloads with DRM Auto-Expiry',
        description: 'Encrypted local media cache allowing users to download episodes for offline flight/travel playback with automatic license renewal.',
        priority: 'Medium',
        rice: {
          reach: 90000,
          impact: 3,
          confidence: 90,
          effort: 3,
          score: calculateRICEScore(90000, 3, 90, 3),
          explanation: 'Reach: 90,000 mobile viewers; Impact: 3/5 convenient travel playback; Confidence: 90%; Effort: 3 person-weeks.',
        },
      },
    ];

    return {
      productOverview: `${name} is a global video streaming ecosystem engineered to deliver seamless 4K HDR media playback, AI content discovery, and multi-device profile syncing across web, mobile, and smart TVs.`,
      problemStatement: customProb || 'Subscribers experience choice paralysis due to cluttered content carousels and stream quality drops on variable cellular networks.',
      businessGoals: [
        customGoal || 'Increase average daily watch time per subscriber from 42 mins to 68 mins.',
        'Reduce subscriber churn rate by 18% through personalized AI recommendations.',
        'Maintain zero playback buffering latency for 99.9% of streams worldwide.',
      ],
      userPersonas: [
        {
          name: 'Binge Watcher (Ananya)',
          role: 'Mobile & Smart TV Subscriber',
          painPoints: ['Endless scrolling without finding good shows', 'Buffering pauses during climax scenes', 'Losing watch progress across devices'],
        },
        {
          name: 'Family Account Manager (David)',
          role: 'Household Account Owner',
          painPoints: ['Kids accessing mature content', 'Reaching max simultaneous stream limits', 'Managing billing profiles'],
        },
      ],
      userJourney: [
        'User opens application and selects their personalized profile avatar.',
        'AI Recommendation Carousel presents top 3 tailored show recommendations.',
        'User taps "Play Episode 1"; Adaptive HLS video stream begins playing in under 400ms.',
        'User switches from mobile phone to Smart TV app; playback seamlessly resumes from exact timestamp.',
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        'Playback Start Time: Media must begin playing within < 400ms of user click globally.',
        'CDN Redundancy: Multi-CDN fallback ensuring 99.999% video uptime during blockbuster releases.',
        'DRM Security: Widevine Level 1 and FairPlay compliance to prevent screen recording piracy.',
      ],
      userStories: [
        {
          id: 'US-NF-01',
          userRole: 'Binge Watcher',
          goal: 'to auto-skip intro titles and recap videos',
          benefit: 'I can watch consecutive episodes without manual remote clicks',
          priority: 'High',
          estimatedEffort: '1 person-week',
          formattedStory: 'As a Binge Watcher, I want to auto-skip intro titles so that I can watch consecutive episodes without manual remote clicks.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-NF-01',
          given: 'a user is watching an episode and reaches the end credit timestamp',
          when: 'the credits begin',
          then: 'a 5-second countdown banner appears for "Next Episode" with immediate pre-buffering.',
          checklistItems: ['Pre-buffer next episode payload in background', 'Display overlay button "Play Next"', 'Persist audio subtitle settings'],
        },
      ],
      successMetrics: [
        '7-Day Return Viewer Rate > 78%',
        'Stream Startup Delay < 350ms',
        'Customer Net Promoter Score (NPS) > 65',
      ],
      risks: [
        {
          risk: 'High CDN bandwidth costs during global viral show launches.',
          mitigation: 'Deploy peer-assisted edge caching and AV1 codec compression to reduce payload size by 30%.',
        },
      ],
    };
  }

  // --- Domain Generator 3: Ride-Sharing (Uber) ---
  private static generateRideSharingPRD(name: string, customProb: string, customGoal: string): PRDOutput {
    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: 'FR-UB-01',
        title: 'Algorithmic Driver-Rider Matching Engine',
        description: 'Match riders with nearby drivers based on ETA proximity, driver rating, vehicle tier, and destination direction preference.',
        priority: 'High',
        rice: {
          reach: 180000,
          impact: 5,
          confidence: 90,
          effort: 4,
          score: calculateRICEScore(180000, 5, 90, 4),
          explanation: 'Reach: 180,000 daily riders; Impact: 5/5 core dispatch capability; Confidence: 90%; Effort: 4 person-weeks.',
        },
      },
      {
        id: 'FR-UB-02',
        title: 'Dynamic Heatmap & Surge Pricing Model',
        description: 'Calculate surge multiplier factors dynamically in high-demand zones (airports, rain events) to incentivize driver supply.',
        priority: 'High',
        rice: {
          reach: 50000,
          impact: 4,
          confidence: 85,
          effort: 3,
          score: calculateRICEScore(50000, 4, 85, 3),
          explanation: 'Reach: 50,000 peak hour trips; Impact: 4/5 unlocks driver availability during surges; Confidence: 85%; Effort: 3 person-weeks.',
        },
      },
      {
        id: 'FR-UB-03',
        title: 'In-App Emergency SOS & Trusted Contact Sharing',
        description: 'One-tap emergency broadcast transmitting live GPS coordinates, vehicle registration, and cabin audio to local authorities.',
        priority: 'High',
        rice: {
          reach: 180000,
          impact: 5,
          confidence: 95,
          effort: 2,
          score: calculateRICEScore(180000, 5, 95, 2),
          explanation: 'Reach: All riders; Impact: 5/5 critical passenger safety; Confidence: 95%; Effort: 2 person-weeks.',
        },
      },
    ];

    return {
      productOverview: `${name} is an urban mobility platform connecting commuters with driver partners through real-time GPS dispatch, upfront fare calculations, and automated digital payments.`,
      problemStatement: customProb || 'Riders face long pickup wait times during peak hours, while drivers lose revenue hunting for passengers without route optimization.',
      businessGoals: [
        customGoal || 'Reduce average rider pickup wait time from 9 mins to under 3.5 mins.',
        'Increase driver partner weekly earnings by 20% through smart demand heatmaps.',
        'Maintain a 99.9% trip safety completion record across all city hubs.',
      ],
      userPersonas: [
        {
          name: 'Daily Commuter (Priya)',
          role: 'Office Professional',
          painPoints: ['Unpredictable driver cancellations', 'Surge price surprises', 'Unclear pickup points at large venues'],
        },
        {
          name: 'Fleet Driver Partner (Suresh)',
          role: 'Full-Time Rideshare Driver',
          painPoints: ['Long unpaid drive times to pickup spots', 'Delayed trip payout transfers', 'Unsafe night passenger rides'],
        },
      ],
      userJourney: [
        'Rider enters destination address and compares vehicle options (Sedan, Auto, Premium).',
        'Upfront fare is guaranteed; rider taps "Confirm Pickup".',
        'Matching engine alerts closest optimal driver partner within 15 seconds.',
        'Driver accepts dispatch and follows turn-by-turn navigation to rider pickup pin.',
        'Trip starts; rider shares live trip status link with family.',
        'Destination reached; automated digital payment processes seamlessly upon dropoff.',
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        'Dispatch Matching Latency: Driver allocation decisions processed in < 1.5 seconds.',
        'GPS Map Precision: Location coordinates accurate within 3 meters.',
        'Security: End-to-end trip data encryption and masked phone number communication.',
      ],
      userStories: [
        {
          id: 'US-UB-01',
          userRole: 'Rider',
          goal: 'to see upfront total fare before booking',
          benefit: 'I can choose the vehicle tier that fits my budget without hidden costs',
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: 'As a Rider, I want to see upfront total fare before booking so that I can choose the vehicle tier that fits my budget without hidden costs.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-UB-01',
          given: 'a driver is within 2km of a requested pickup location',
          when: 'the dispatch algorithm evaluates trip requests',
          then: 'the driver receives a 15-second acceptance modal with route fare details.',
          checklistItems: ['Audio ping emitted on driver phone', '15-second countdown timer runs', 'Re-assign automatically if declined'],
        },
      ],
      successMetrics: [
        'Average Driver Pickup SLA < 4 mins',
        'Driver Acceptance Rate > 88%',
        'Trip Safety Rating > 4.9 / 5.0',
      ],
      risks: [
        {
          risk: 'High driver cancellation rate during traffic bottlenecks.',
          mitigation: 'Offer cancellation mitigation bonuses and show driver destination direction before pickup.',
        },
      ],
    };
  }

  // --- Domain Generator 4: AI B2B SaaS Co-Pilot (ProductPilot AI) ---
  private static generateAISaaSProductPRD(name: string, customProb: string, customGoal: string): PRDOutput {
    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: 'FR-AI-01',
        title: 'Context-Aware AI Document Synthesis Engine',
        description: 'Multi-stage LLM pipeline that analyzes product inputs and generates structured PRDs, user stories, and acceptance criteria.',
        priority: 'High',
        rice: {
          reach: 35000,
          impact: 5,
          confidence: 90,
          effort: 3,
          score: calculateRICEScore(35000, 5, 90, 3),
          explanation: 'Reach: 35,000 Product Managers; Impact: 5/5 core AI product value; Confidence: 90%; Effort: 3 person-weeks.',
        },
      },
      {
        id: 'FR-AI-02',
        title: 'Interactive RICE Score Prioritization Matrix',
        description: 'Embedded scoring widget allowing PMs to tweak Reach, Impact, Confidence, and Effort with real-time score updates.',
        priority: 'High',
        rice: {
          reach: 35000,
          impact: 4,
          confidence: 95,
          effort: 2,
          score: calculateRICEScore(35000, 4, 95, 2),
          explanation: 'Reach: All PM users; Impact: 4/5 eliminates spreadsheet math; Confidence: 95%; Effort: 2 person-weeks.',
        },
      },
      {
        id: 'FR-AI-03',
        title: 'Multi-Tool Export Hub (Jira, Linear, Confluence)',
        description: 'Format generated output into native Jira markup `{code}`, Linear markdown `- [ ]`, and Confluence wiki blocks.',
        priority: 'Medium',
        rice: {
          reach: 28000,
          impact: 4,
          confidence: 90,
          effort: 2,
          score: calculateRICEScore(28000, 4, 90, 2),
          explanation: 'Reach: 28,000 agile PMs; Impact: 4/5 seamless sprint handoff; Confidence: 90%; Effort: 2 person-weeks.',
        },
      },
    ];

    return {
      productOverview: `${name} is an AI-powered co-pilot platform engineered to assist Product Managers in drafting PRDs, mapping user stories, and prioritizing product backlogs with RICE scores.`,
      problemStatement: customProb || 'Product Managers spend 15+ hours per week manually writing PRDs and formatting Jira tickets, causing sprint planning bottlenecks.',
      businessGoals: [
        customGoal || 'Reduce PRD creation time by 75% across product teams.',
        'Achieve an 85% weekly active user (WAU) retention rate among PMs.',
        'Increase sprint ticket handoff efficiency by 3x.',
      ],
      userPersonas: [
        {
          name: 'Lead Product Manager (Karan)',
          role: 'Product Lead',
          painPoints: ['Fragmented docs in Google Docs & Notion', 'Inconsistent PRD quality across junior PMs', 'Manual ticket formatting'],
        },
        {
          name: 'Engineering Director (Elena)',
          role: 'Tech Lead / Eng Manager',
          painPoints: ['Vague requirement specs', 'Missing acceptance criteria', 'Unclear feature scope boundaries'],
        },
      ],
      userJourney: [
        'PM inputs Product Name, Problem Statement, and Target Persona.',
        'AI Engine classifies domain context and synthesizes full 11-section PRD in < 2 seconds.',
        'PM adjusts Reach/Impact sliders on Functional Requirements to recalculate RICE scores.',
        'PM clicks "Export to Jira Markup" and pastes formatted user stories into sprint backlog.',
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        'AI Generation SLA: PRD synthesis completed in < 1.2 seconds.',
        'Tenant Security: End-to-end data privacy preventing LLM model training on customer data.',
        '99.9% System Uptime with automated serverless scaling.',
      ],
      userStories: [
        {
          id: 'US-AI-01',
          userRole: 'Product Manager',
          goal: 'to export PRDs directly into Jira markup',
          benefit: 'I can paste requirements straight into sprint tickets without manual re-formatting',
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: 'As a Product Manager, I want to export PRDs directly into Jira markup so that I can paste requirements straight into sprint tickets without manual re-formatting.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-AI-01',
          given: 'a generated PRD document in the viewer',
          when: 'the user clicks "Copy Jira Markup"',
          then: 'the clipboard receives valid Jira syntax formatted with h1., h2., and bullet lists.',
          checklistItems: ['Copy confirmation toast displayed', 'Jira markup matches spec', 'Zero HTML tags in raw buffer'],
        },
      ],
      successMetrics: [
        'Average PRD Creation Time < 3 minutes',
        'Sprint Handoff Rating > 4.8 / 5.0',
        'Weekly Document Export Volume > 5,000',
      ],
      risks: [
        {
          risk: 'LLM API rate limit timeouts during surge usage.',
          mitigation: 'Implement intelligent local fallback templates and response streaming.',
        },
      ],
    };
  }

  // --- Domain Generator 5: E-Commerce / Checkout (Shopify / Amazon) ---
  private static generateEcommercePRD(name: string, customProb: string, customGoal: string): PRDOutput {
    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: 'FR-EC-01',
        title: 'Express 1-Click Mobile Wallet Checkout Sheet',
        description: 'Native mobile bottom sheet supporting Apple Pay, Google Pay, and saved UPI credentials with single-tap payment authorization.',
        priority: 'High',
        rice: {
          reach: 150000,
          impact: 5,
          confidence: 90,
          effort: 3,
          score: calculateRICEScore(150000, 5, 90, 3),
          explanation: 'Reach: 150,000 mobile shoppers; Impact: 5/5 directly eliminates cart abandonment; Confidence: 90%; Effort: 3 person-weeks.',
        },
      },
      {
        id: 'FR-EC-02',
        title: 'Real-Time Inventory Lock & Stock Sync Engine',
        description: 'Reserve inventory items for 10 minutes upon checkout initiation to prevent overselling limited-edition products.',
        priority: 'High',
        rice: {
          reach: 60000,
          impact: 4,
          confidence: 95,
          effort: 2,
          score: calculateRICEScore(60000, 4, 95, 2),
          explanation: 'Reach: 60,000 peak checkout items; Impact: 4/5 prevents out-of-stock complaints; Confidence: 95%; Effort: 2 person-weeks.',
        },
      },
    ];

    return {
      productOverview: `${name} is a high-conversion e-commerce checkout platform engineered to reduce cart abandonment through 1-click payments, address autocomplete, and inventory sync.`,
      problemStatement: customProb || 'Mobile shoppers abandon 68% of shopping carts due to lengthy shipping forms and multi-step payment redirect pages.',
      businessGoals: [
        customGoal || 'Increase mobile cart checkout completion rate by 24%.',
        'Reduce average checkout time from 140 seconds to 22 seconds.',
      ],
      userPersonas: [
        {
          name: 'Mobile Shopper (Sneha)',
          role: 'Impulse Consumer',
          painPoints: ['Re-entering credit card details', 'Slow loading payment gateways', 'Surprise shipping fees at step 4'],
        },
      ],
      userJourney: [
        'Shopper taps "Buy Now" on product detail page.',
        'Express Checkout Sheet slides up with pre-filled address.',
        'Shopper authenticates via Face ID / Touch ID.',
        'Payment succeeds; instant order confirmation email & SMS sent.',
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        'Checkout Latency: Complete payment processing in < 800ms.',
        'Compliance: Full PCI-DSS Level 1 certification and tokenized vault storage.',
      ],
      userStories: [
        {
          id: 'US-EC-01',
          userRole: 'Mobile Shopper',
          goal: 'to pay with 1-click via Apple Pay',
          benefit: 'I can complete my order without pulling out a physical credit card',
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: 'As a Mobile Shopper, I want to pay with 1-click via Apple Pay so that I can complete my order without pulling out a physical credit card.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-EC-01',
          given: 'a customer has items in their cart',
          when: 'they tap Apple Pay',
          then: 'the biometric sheet appears and completes authorization within 1 second.',
          checklistItems: ['Biometric token verified', 'Inventory status locked', 'Receipt generated'],
        },
      ],
      successMetrics: [
        'Checkout Conversion Rate > 72%',
        'Average Cart Value + 15%',
      ],
      risks: [
        {
          risk: 'Third-party payment gateway downtime.',
          mitigation: 'Configure multi-acquirer failover routing to auto-switch gateways upon transaction failure.',
        },
      ],
    };
  }

  // --- Domain Generator 6: Universal Custom Product Synthesizer (Any Custom Product Input) ---
  private static generateCustomProductPRD(
    name: string,
    desc: string,
    prob: string,
    goal: string,
    users: string
  ): PRDOutput {
    const productName = name || 'Custom Enterprise Product Idea';
    const targetUsersStr = users || 'Target Users & Key Stakeholders';

    const functionalRequirements: FunctionalRequirement[] = [
      {
        id: `FR-${productName.slice(0, 3).toUpperCase()}-01`,
        title: `Core ${productName} Workflow Engine`,
        description: `Primary operational engine for ${productName}. ${desc || 'Enables users to perform key domain tasks seamlessly.'}`,
        priority: 'High',
        rice: {
          reach: 15000,
          impact: 5,
          confidence: 85,
          effort: 3,
          score: calculateRICEScore(15000, 5, 85, 3),
          explanation: `Reach: 15,000 active domain users; Impact: 5/5 core functionality; Confidence: 85% based on initial market validation; Effort: 3 person-weeks.`,
        },
      },
      {
        id: `FR-${productName.slice(0, 3).toUpperCase()}-02`,
        title: `Real-Time Data Analytics & Dashboard Insights`,
        description: `Centralized analytics panel tracking key user performance indicators and operational metrics for ${productName}.`,
        priority: 'High',
        rice: {
          reach: 12000,
          impact: 4,
          confidence: 90,
          effort: 2,
          score: calculateRICEScore(12000, 4, 90, 2),
          explanation: `Reach: 12,000 decision makers; Impact: 4/5 provides operational visibility; Confidence: 90%; Effort: 2 person-weeks.`,
        },
      },
      {
        id: `FR-${productName.slice(0, 3).toUpperCase()}-03`,
        title: `Automated Notification & SLA Alert Gateway`,
        description: `Multi-channel alerts (Email, Mobile Push, Webhooks) notifying ${targetUsersStr} of critical updates.`,
        priority: 'Medium',
        rice: {
          reach: 18000,
          impact: 3,
          confidence: 95,
          effort: 2,
          score: calculateRICEScore(18000, 3, 95, 2),
          explanation: `Reach: 18,000 notification recipients; Impact: 3/5 improves engagement; Confidence: 95%; Effort: 2 person-weeks.`,
        },
      },
    ];

    return {
      productOverview: `${productName} is an application specifically designed for ${targetUsersStr}. ${desc || 'It provides a streamlined digital solution to solve domain-specific operational challenges.'}`,
      problemStatement: prob || `${targetUsersStr} struggle with inefficient manual workflows, lack of real-time visibility, and fragmented tooling that increases operational errors.`,
      businessGoals: [
        goal || `Achieve a 50% improvement in task completion velocity for ${productName} users.`,
        `Scale active user adoption to 25,000+ monthly active users within 6 months.`,
        `Maintain customer satisfaction (CSAT) rating > 4.7 / 5.0.`,
      ],
      userPersonas: [
        {
          name: `Primary User (${targetUsersStr.split(',')[0] || 'Domain Specialist'})`,
          role: 'Core Product Operator',
          painPoints: [
            `Manual repetitive overhead in daily tasks`,
            `Lack of real-time status updates`,
            `Complex tools requiring steep learning curves`,
          ],
        },
        {
          name: `Operations Manager`,
          role: 'Supervisory Lead',
          painPoints: [
            `Inability to monitor team productivity metrics`,
            `Delayed escalation handling`,
            `Fragmented reporting data`,
          ],
        },
      ],
      userJourney: [
        `User logs into ${productName} and views personalized dashboard summary.`,
        `User initiates primary workflow action with pre-configured templates.`,
        `System processes request in background with real-time status indicators.`,
        `User reviews completed output, applies custom adjustments, and exports results.`,
      ],
      functionalRequirements,
      nonFunctionalRequirements: [
        `Performance: Page response and workflow action execution completed in < 1 second.`,
        `Scalability: System architecture handles 10x user growth with zero performance degradation.`,
        `Security: Role-based access control (RBAC) and encrypted data storage at rest and in transit.`,
      ],
      userStories: [
        {
          id: `US-${productName.slice(0, 3).toUpperCase()}-01`,
          userRole: targetUsersStr.split(',')[0] || 'User',
          goal: `to perform key ${productName} tasks with 1-click automation`,
          benefit: `I can save hours of manual effort every week`,
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: `As a ${targetUsersStr.split(',')[0] || 'User'}, I want to perform key ${productName} tasks with 1-click automation so that I can save hours of manual effort every week.`,
        },
      ],
      acceptanceCriteria: [
        {
          id: `AC-${productName.slice(0, 3).toUpperCase()}-01`,
          given: `a user has initiated a key action in ${productName}`,
          when: `the system processes the input request`,
          then: `a confirmation notification is emitted and dashboard state updates in real time.`,
          checklistItems: ['Input validated', 'Action logged to audit trail', 'State UI updated instantly'],
        },
      ],
      successMetrics: [
        `Daily Active Users (DAU) Growth > 25% MoM`,
        `Task Error Rate < 0.5%`,
        `User Retention Rate at Day 30 > 65%`,
      ],
      risks: [
        {
          risk: `Low user adoption during initial rollout due to legacy workflow habits.`,
          mitigation: `Provide guided interactive onboarding walkthroughs and dedicated customer success support.`,
        },
      ],
    };
  }

  // --- User Story Generator Helper ---
  static async generateUserStories(input: UserStoryInput): Promise<UserStoriesOutput> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const name = input.featureName || 'Feature Module';
    const role = input.targetUserRole || 'Product User';

    return {
      featureName: name,
      stories: [
        {
          id: 'US-01',
          userRole: role,
          goal: `to configure ${name} settings effortlessly`,
          benefit: 'I can customize the experience according to my team requirements',
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: `As a ${role}, I want to configure ${name} settings effortlessly so that I can customize the experience according to my team requirements.`,
        },
        {
          id: 'US-02',
          userRole: role,
          goal: `to receive real-time notifications for ${name} updates`,
          benefit: 'I never miss critical task escalations or status changes',
          priority: 'Medium',
          estimatedEffort: '1 person-week',
          formattedStory: `As a ${role}, I want to receive real-time notifications for ${name} updates so that I never miss critical task escalations or status changes.`,
        },
      ],
    };
  }

  // --- Acceptance Criteria Generator Helper ---
  static async generateAcceptanceCriteria(input: AcceptanceCriteriaInput): Promise<AcceptanceCriteriaOutput> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      featureName: input.featureName || 'Feature',
      userStory: input.userStory || 'As a User, I want functionality so that I get benefit.',
      criteria: [
        {
          id: 'AC-01',
          given: `the user is authenticated on the ${input.featureName} view`,
          when: 'they submit valid input data and trigger execution',
          then: 'the system validates inputs and updates the UI state in < 500ms.',
          checklistItems: ['Input format validated', 'Success notification displayed', 'Database state updated'],
        },
      ],
    };
  }
}
