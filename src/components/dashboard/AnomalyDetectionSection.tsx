"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { detectAnomalies, type DetectAnomaliesInput, type DetectAnomaliesOutput } from "@/ai/flows/detect-anomalies";
import AnomalyAlert from "./AnomalyAlert";
import { useToast } from "@/hooks/use-toast";
import type { MetricDataPoint } from "@/lib/constants";
import { Zap, Loader2 } from "lucide-react";

interface AnomalyDetectionSectionProps {
  cpuData: MetricDataPoint[];
  memoryData: MetricDataPoint[];
  diskData: MetricDataPoint[];
  networkData: MetricDataPoint[];
}

const AnomalyDetectionSection: React.FC<AnomalyDetectionSectionProps> = ({
  cpuData,
  memoryData,
  diskData,
  networkData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [anomalies, setAnomalies] = useState<DetectAnomaliesOutput["anomalies"]>([]);
  const { toast } = useToast();

  const handleDetectAnomalies = async () => {
    setIsLoading(true);
    setAnomalies([]);

    const input: DetectAnomaliesInput = {
      cpuUsage: cpuData.map(d => d.value),
      memoryUsage: memoryData.map(d => d.value),
      diskSpace: diskData.map(d => d.value),
      networkActivity: networkData.map(d => d.value),
    };

    try {
      const result = await detectAnomalies(input);
      if (result.anomalies && result.anomalies.length > 0) {
        setAnomalies(result.anomalies);
        toast({
          title: "Anomalies Detected!",
          description: `Found ${result.anomalies.length} potential issues.`,
        });
      } else {
        toast({
          title: "No Anomalies Found",
          description: "System metrics appear to be within normal ranges.",
        });
      }
    } catch (error) {
      console.error("Error detecting anomalies:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to detect anomalies. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-accent" />
          AI Anomaly Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleDetectAnomalies} disabled={isLoading} className="w-full mb-6">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Analyzing..." : "Detect Anomalies"}
        </Button>
        
        {anomalies.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Detected Anomalies:</h3>
            {anomalies.map((anomaly, index) => (
              <AnomalyAlert key={index} anomaly={anomaly} />
            ))}
          </div>
        )}
        {!isLoading && anomalies.length === 0 && (
           <p className="text-sm text-muted-foreground text-center">No anomalies detected yet or after the last scan.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionSection;
