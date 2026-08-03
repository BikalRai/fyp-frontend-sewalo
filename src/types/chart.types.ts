export interface LiquidityData {
  date: string;
  jobs: number;
  bids: number;
  unlocks: number;
}

export interface LiquidityChartProps {
  data: LiquidityData[] | undefined;
  isLoading?: boolean;
}
