// src/ai/flows/detect-anomalies.ts
'use server';

/**
 * @fileOverview An anomaly detection AI agent for system health metrics.
 *
 * - detectAnomalies - A function that handles the anomaly detection process.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  cpuUsage: z.array(z.number()).describe('Array of CPU usage percentages.'),
  memoryUsage: z.array(z.number()).describe('Array of memory usage percentages.'),
  diskSpace: z.array(z.number()).describe('Array of disk space usage percentages.'),
  networkActivity: z.array(z.number()).describe('Array of network activity values.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  anomalies: z.array(
    z.object({
      metric: z.string().describe('The metric where the anomaly was detected.'),
      index: z.number().describe('The index of the anomaly in the data array.'),
      value: z.number().describe('The value of the anomaly.'),
      description: z.string().describe('A description of the anomaly.'),
    })
  ).describe('Array of detected anomalies.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert system administrator specializing in anomaly detection.

You will be provided with time series data for CPU usage, memory usage, disk space usage, and network activity.
Your task is to identify any anomalies in the data and provide a description of each anomaly.

For each anomaly, specify the metric, index, value, and a brief description of why it is considered an anomaly.

CPU Usage: {{{cpuUsage}}}
Memory Usage: {{{memoryUsage}}}
Disk Space: {{{diskSpace}}}
Network Activity: {{{networkActivity}}}

Output the anomalies in JSON format.
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
