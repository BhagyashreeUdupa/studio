import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { DetectAnomaliesOutput } from "@/ai/flows/detect-anomalies";

type Anomaly = DetectAnomaliesOutput["anomalies"][0];

interface AnomalyAlertProps {
  anomaly: Anomaly;
}

const AnomalyAlert: React.FC<AnomalyAlertProps> = ({ anomaly }) => {
  return (
    <Alert variant="destructive" className="mb-4 shadow-md">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Anomaly Detected: {anomaly.metric}</AlertTitle>
      <AlertDescription>
        <p><strong>Value:</strong> {anomaly.value} (at index {anomaly.index})</p>
        <p><strong>Reason:</strong> {anomaly.description}</p>
      </AlertDescription>
    </Alert>
  );
};

export default AnomalyAlert;
