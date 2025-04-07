
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogLevelChangeResponse } from "@/types/api";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LogLevelResultProps {
  result: LogLevelChangeResponse;
}

const LogLevelResult: React.FC<LogLevelResultProps> = ({ result }) => {
  const { packageName, previousLevel, newLevel, successCount, failureCount, failedPods } = result;
  
  const hasFailures = failureCount > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Log Level Change Result</CardTitle>
            <CardDescription>
              Package: {packageName}
            </CardDescription>
          </div>
          <Badge variant={hasFailures ? "destructive" : "default"} className="ml-2">
            {successCount} Success / {failureCount} Failed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Previous Level</p>
            <div className="flex items-center">
              <Badge variant="outline">{previousLevel || "N/A"}</Badge>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">New Level</p>
            <div className="flex items-center">
              <Badge>{newLevel}</Badge>
            </div>
          </div>
        </div>

        {hasFailures && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="failed-pods">
              <AccordionTrigger>
                <div className="flex items-center text-destructive">
                  <AlertCircle size={16} className="mr-2" />
                  <span>{failureCount} Failed Pods</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 mt-2">
                  {failedPods.map((pod, index) => (
                    <div key={index} className="border rounded p-2">
                      <p className="font-medium">{pod.name}</p>
                      {pod.errorMessage && (
                        <p className="text-sm text-destructive">{pod.errorMessage}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {!hasFailures && successCount > 0 && (
          <div className="mt-4 flex items-center text-green-600">
            <CheckCircle size={18} className="mr-2" />
            <span>All pods successfully updated</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogLevelResult;
