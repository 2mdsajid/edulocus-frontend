"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Generic Props type for making the LineChart reusable
type Props<T> = {
  chartTitle: string;
  chartDescription: string;
  xAxisKey: keyof T; // Dynamic x-axis key for data (like month, date)
  dataKey: keyof T; // Dynamic data key for line value (like score, visitors)
  chartData: T[]; // Dynamic chart data of any type
  footerDescription?: string; // Optional footer description text
  trendingUpText?: string; // Optional text for trending information
};

// Reusable LineChart component
export function ReusableLineChart<T extends Record<string, any>>(props: Props<T>) {
  const { 
    chartTitle, 
    chartDescription, 
    xAxisKey, 
    dataKey, 
    chartData, 
    footerDescription, 
    trendingUpText 
  } = props;

  const  chartConfig = generateLineChartConfig(chartData,dataKey)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={String(xAxisKey)} // Dynamically set x-axis key
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(-2)} // Shorten to 3 characters
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={String(dataKey)} // Dynamically set data key for line values
              type="natural"
              stroke={chartConfig[String(dataKey)]?.color || "var(--color-primary)"} // Use configured color or fallback
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trendingUpText && (
          <div className="flex gap-2 font-medium leading-none">
            {trendingUpText} <TrendingUp className="h-4 w-4" />
          </div>
        )}
        {footerDescription && (
          <div className="leading-none text-muted-foreground">
            {footerDescription}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}


// Type for generic chart data
type GenericChartData = { [key: string]: any };

// Generates the chart configuration with dynamic labels
export const generateLineChartConfig = <T extends GenericChartData>(
  data: T[],
  dataKey: keyof T
): ChartConfig => {
  const config: ChartConfig = {};

  if (data.length > 0 && dataKey in data[0]) {
    const labelValue = String(dataKey); // Dynamically extract the data key
    config[labelValue] = {
      label: labelValue.toLowerCase(), // You can customize how you want the label
      color: "hsl(var(--chart-1))", // You can customize the color logic as needed
    };
  }

  return config;
};
