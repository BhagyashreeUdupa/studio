import type { LucideIcon } from "lucide-react";
import VitalsChart from "./VitalsChart";
import type { MetricDataPoint } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  IconComponent: LucideIcon;
  currentValue: number;
  unit: string;
  data: MetricDataPoint[];
  chartColor?: string; // HSL format for chart line
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  IconComponent,
  currentValue,
  unit,
  data,
  chartColor,
  description,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {currentValue}
          <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
        {description && (
           <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
        <div className="mt-4 h-[150px]">
          <VitalsChart data={data} dataKey={title.toLowerCase().replace(' ', '')} color={chartColor} unit={unit === '%' ? '%' : ''} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
