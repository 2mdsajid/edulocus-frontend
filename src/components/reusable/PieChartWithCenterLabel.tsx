"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Type for the Props
type Props<T> = {
  chartTitle: string;
  chartDescription: string;
  nameKey: keyof T; // Dynamic name key -- for label data
  dataKey: keyof T; // Dynamic data key -- for value
  centreLabel: string;
  chartData: T[]; // Dynamic chart data of any type
};

export function PieChartWithCenterLabel<T extends Record<string, any>>(
  props: Props<T>
) {
  const {
    chartTitle,
    chartDescription,
    nameKey,
    dataKey,
    centreLabel,
    chartData,
  } = props;

  const totalScore = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + Number(curr[dataKey]), 0); // Sum the values based on the dataKey
  }, [chartData, dataKey]);

  // Generate chart configuration dynamically
  const chartConfig = generatePieChartConfig(chartData, nameKey);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={String(dataKey)} // Convert dynamic key to string
              nameKey={String(nameKey)} // Convert dynamic key to string
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalScore.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {centreLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            {/* Ensure the legend receives correct props and renders labels */}
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey={String(nameKey)} // Make sure nameKey is passed correctly
                />
              }
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Type for generic chart data
type GenericChartData = { [key: string]: any };

// Generates the chart configuration with dynamic labels
export const generatePieChartConfig = <T extends GenericChartData>(
  data: T[],
  key: keyof T
): ChartConfig => {
  const config: ChartConfig = {};

  data.forEach((item, index) => {
    const labelValue = String(item[key]); // Dynamically extract the value using the key
    config[labelValue] = {
      label: labelValue.toLowerCase(),
    };
  });

  return config;
};
