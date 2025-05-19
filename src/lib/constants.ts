export type MetricDataPoint = {
  name: string; // Typically a time label like "10:00", "10:05" or index
  value: number;
};

const generateRandomData = (count: number, min: number, max: number): MetricDataPoint[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: `T-${count - i}`, // Simulate time progression
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export const MOCK_CPU_USAGE_DATA: MetricDataPoint[] = generateRandomData(20, 5, 80); // %
export const MOCK_MEMORY_USAGE_DATA: MetricDataPoint[] = generateRandomData(20, 20, 75); // %
export const MOCK_DISK_SPACE_DATA: MetricDataPoint[] = generateRandomData(20, 10, 90); // %
export const MOCK_NETWORK_ACTIVITY_DATA: MetricDataPoint[] = generateRandomData(20, 0, 100); // Mbps or similar unit

export const getLatestDataPointValue = (data: MetricDataPoint[]): number => {
  if (data.length === 0) return 0;
  return data[data.length - 1].value;
};

export const VitalsChartConfigBase = {
  value: {
    label: "Value",
  },
};
