"use client";

import type { MetricDataPoint } from "@/lib/constants";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface VitalsChartProps {
  data: MetricDataPoint[];
  dataKey: string;
  color?: string; // HSL color string
  unit?: string;
}

const VitalsChart: React.FC<VitalsChartProps> = ({
  data,
  dataKey,
  color = "hsl(var(--chart-1))",
  unit = "%",
}) => {
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[150px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: -20, // Adjust to show YAxis labels if needed
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 6)} // Shorten labels if needed
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}${unit}`}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="value" // Assuming data structure { name: string, value: number }
          type="monotone"
          stroke={`var(--color-${dataKey})`}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default VitalsChart;
