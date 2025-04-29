export interface TimelineEntry {
  id: string
  period: string
  achievements: string[]
  color: "blue" | "red"
}

export const timelineData: TimelineEntry[] = [
  {
    id: "2014-2015",
    period: "2014 - 2015",
    color: "blue",
    achievements: [
      "Packaging: Concept, Product & Pack Test, Segmentation and Communication tests",
      "Beverage: Concept, Product & Pack Test, Segmentation and Communication tests",
      "Tobacco: Brand Advocate (Qual) & Brand Equity Study (CAPI)",
      "Financial: Segmentation and communication test",
      "Social Sector: (International) Study on Behavioral Economics",
      "Social Sector: Monitoring & Evaluation Studies (Tracking) & Other Social Studies",
      "Automobile: Market Size Estimation & Forecasting Sales",
      "Industrial: Sector Analysis Potential New Category Launch & Market Sizing of Sewing Thread",
    ],
  },
  {
    id: "2016-2017",
    period: "2016 - 2017",
    color: "red",
    achievements: [
      "Packaging & Brand Identity Testing",
      "Beverage Sector: Nationwide Price Elasticity & Conjoint for CSD & Energy Drinks",
      "Telecom: Price Elasticity Studies",
      "Industrial: Market Sizing of Door Locks",
      "Automobile Sector: Segmentation Studies",
      "Social Sector: WASH & Other Projects",
      "Telecom: Retail Evaluation & Tracking Shopper Insights",
      "Automobile: Customer Satisfaction, Mystery Shopping Tracking & Conjoint Studies",
      "Industrial: Sector Analysis Category Launch (Market Sizing) of four new (Chemical) products",
      "Telecom: Churn Study Tracker",
      "Social Sector (International): M&E Project: Schools Tracking",
    ],
  },
  {
    id: "2018-2019",
    period: "2018 - 2019",
    color: "blue",
    achievements: [
      "Packaging: Pack Tests (CLT)",
      "Digital: Online Diary Study",
      "Tobacco: Campaign Evaluation Study",
      "DFIs: Mystery Shopping Tracking",
      "Telecom: Mystery Shopping & Calling Annual Tracker",
      "Microfinance: Customer Satisfaction Annual Tracker",
      "Telecom: Churn Study Tracker",
      "Social Sector: (International) Market Size Assessment & Value Chain Analysis",
      "Paint: Annual Pricing Tracker",
      "Mystery Shopping: Mystery Shopping Tracker for a reputed bank",
      "Microfinance: Customer Satisfaction Annual Tracker",
      "FMCG (International): Online Diary Study",
      "Industrial: Sector Analysis of Steel Products",
      "Tobacco: Socioeconomic Profiling of Farmers",
    ],
  },
  {
    id: "2020-2022",
    period: "2020 - 2022",
    color: "red",
    achievements: [
      "Product Testing: Fem Care Product Testing (HUT) & (CLT)",
      "Tobacco: Product Test (CLT)",
      "FMCG: Campaign Evaluation",
      "Tobacco: Pack + Product Test (CLT)",
      "Concept Product Testing: Kitchen Towels",
      "Industrial: Sector Analysis of Acids",
      "Telecom: Coverage Expansion Assessment",
      "Industrial: PVC Market Size Estimation",
      "Financial: Mystery Shopping",
      "Pharma: Location Test",
      "Industrial: Sector Analysis of Super Capacitors & Packaging Industry",
      "Health Sector Study (Healthcare Services in Pakistan)",
      "Brand Health Study – Surface Cleaners",
      "Usage & Attitude - Diapers",
    ],
  },
  {
    id: "2023-2024",
    period: "2023 - 2024",
    color: "blue",
    achievements: [
      "Industrial Sector Analysis: Folding Cartons",
      "Education: NFE & OOSC",
      "Skin Care: Qualitative Research U&A and Campaign Evaluation",
      "Vaping Industry U&A",
      "Tissue Paper: Product Testing CLT",
      "DFIs: Mystery Shopping Tracking for Reputed Bank",
      "Social Sector: Climate Change Impact Study",
      "Fem-care: Product Test via CLT to identify the winner against the competition",
    ],
  },
]

