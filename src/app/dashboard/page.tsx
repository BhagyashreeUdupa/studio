"use client"; // Required because we use hooks like useState, useEffect for dynamic data

import { useEffect, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import AnomalyDetectionSection from "@/components/dashboard/AnomalyDetectionSection";
import { Cpu, MemoryStick, HardDrive, Network, RefreshCcw } from "lucide-react";
import {
  MOCK_CPU_USAGE_DATA,
  MOCK_MEMORY_USAGE_DATA,
  MOCK_DISK_SPACE_DATA,
  MOCK_NETWORK_ACTIVITY_DATA,
  getLatestDataPointValue,
  type MetricDataPoint,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to generate new mock data
const generateNewMockData = (count: number, min: number, max: number): MetricDataPoint[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: `T-${count - i}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};


export default function DashboardPage() {
  const [cpuData, setCpuData] = useState<MetricDataPoint[]>([]);
  const [memoryData, setMemoryData] = useState<MetricDataPoint[]>([]);
  const [diskData, setDiskData] = useState<MetricDataPoint[]>([]);
  const [networkData, setNetworkData] = useState<MetricDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate fetching new data
    setTimeout(() => {
      setCpuData(generateNewMockData(20, 5, 80));
      setMemoryData(generateNewMockData(20, 20, 75));
      setDiskData(generateNewMockData(20, 10, 90));
      setNetworkData(generateNewMockData(20, 0, 100));
      setIsLoading(false);
    }, 500);
  };
  
  useEffect(() => {
    // Initial data load
    setCpuData(MOCK_CPU_USAGE_DATA);
    setMemoryData(MOCK_MEMORY_USAGE_DATA);
    setDiskData(MOCK_DISK_SPACE_DATA);
    setNetworkData(MOCK_NETWORK_ACTIVITY_DATA);
    setIsLoading(false);
  }, []);

  if (isLoading && cpuData.length === 0) { // Show skeleton only on initial load
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={refreshData} variant="outline" size="sm" disabled={isLoading}>
          <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="CPU Usage"
          IconComponent={Cpu}
          currentValue={getLatestDataPointValue(cpuData)}
          unit="%"
          data={cpuData}
          chartColor="hsl(var(--chart-1))"
          description="Current processor utilization"
        />
        <MetricCard
          title="Memory Usage"
          IconComponent={MemoryStick}
          currentValue={getLatestDataPointValue(memoryData)}
          unit="%"
          data={memoryData}
          chartColor="hsl(var(--chart-2))"
          description="Current RAM utilization"
        />
        <MetricCard
          title="Disk Space"
          IconComponent={HardDrive}
          currentValue={getLatestDataPointValue(diskData)}
          unit="%"
          data={diskData}
          chartColor="hsl(var(--chart-3))"
          description="Current primary disk usage"
        />
        <MetricCard
          title="Network Activity"
          IconComponent={Network}
          currentValue={getLatestDataPointValue(networkData)}
          unit=" Mbps"
          data={networkData}
          chartColor="hsl(var(--chart-4))"
          description="Current network throughput"
        />
      </div>

      <div>
        <AnomalyDetectionSection
          cpuData={cpuData}
          memoryData={memoryData}
          diskData={diskData}
          networkData={networkData}
        />
      </div>
    </div>
  );
}

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3 p-6 border rounded-lg bg-card shadow-sm">
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-[150px] w-full" />
  </div>
);
