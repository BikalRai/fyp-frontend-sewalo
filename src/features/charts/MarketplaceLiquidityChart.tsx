import type { LiquidityChartProps } from "@/types/chart.types";
import { Badge, Card, Group, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import SeSpinner from "@/components/spinner/SeSpinner";

export function MarketplaceLiquidityChart({
  data,
  isLoading,
}: LiquidityChartProps) {
  // 2. Handle empty states natively to prevent render crashes
  if (!data || data.length === 0) {
    return (
      <>
        {isLoading ? (
          <SeSpinner />
        ) : (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text c="dimmed" ta="center" py="xl">
              No liquidity data available for this period.
            </Text>
          </Card>
        )}
      </>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* 3. Header section with context */}
      <Group justify="space-between" mb="lg">
        <div>
          <Text fw={600} size="lg">
            Marketplace Liquidity
          </Text>
          <Text size="sm" c="dimmed">
            7-Day Job vs. Bid Velocity
          </Text>
        </div>
        <Badge color="green" variant="light" size="lg">
          Live
        </Badge>
      </Group>

      {/* 4. The Chart Engine */}
      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        withLegend
        legendProps={{ verticalAlign: "bottom", height: 50 }}
        tooltipAnimationDuration={200}
        curveType="monotone" /* Smooths the lines for a polished look */
        strokeWidth={2}
        series={[
          { name: "jobs", color: "blue.6", label: "Jobs Posted" },
          { name: "bids", color: "teal.6", label: "Bids Placed" },
          { name: "unlocks", color: "violet.6", label: "Token Unlocks" },
        ]}
        // 5. UX Enhancement: Grid styling
        gridAxis="xy"
        withDots={false} /* Removes messy dots unless hovered */
      />
    </Card>
  );
}
