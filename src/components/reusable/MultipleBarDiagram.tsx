"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Generic Props type for making the BarChart reusable
type Props<T> = {
    chartTitle: string;
    chartDescription: string;
    xAxisKey: keyof T; // Dynamic x-axis key for data (like month)
    dataKeys: Array<keyof T>; // Array of dynamic data keys for bar values
    chartData: T[]; // Dynamic chart data of any type
    footerDescription?: string; // Optional footer description text
    trendingUpText?: string; // Optional text for trending information
    config?: ChartConfig
};

// Reusable BarChart component
export function MultipleBarDiagram<T extends Record<string, any>>(props: Props<T>) {
    const {
        chartTitle,
        chartDescription,
        xAxisKey,
        dataKeys,
        chartData,
        footerDescription,
        trendingUpText
    } = props;

    const chartConfig = props.config || generateBarChartConfig(chartData, dataKeys);

    return (
        <Card className="">
            {/* <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader> */}
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
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
                            tickFormatter={(value) => value} // Shorten to 3 characters
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {dataKeys.map((key, index) => (
                            <Bar key={String(key)} dataKey={String(key)} fill={`var(--color-${String(key)})`} radius={4} />
                        ))}

                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
            </CardFooter>
        </Card>
    );
}

// Generates the chart configuration with dynamic labels for bar keys
export const generateBarChartConfig = <T extends Record<string, any>>(
    data: T[],
    dataKeys: Array<keyof T>
): ChartConfig => {
    const config: ChartConfig = {};

    dataKeys.forEach((key) => {
        const labelValue = String(key); // Dynamically extract the data key
        config[labelValue] = {
            label: labelValue.toLowerCase(), // You can customize how you want the label
            color: "hsl(var(--chart-1))", // You can customize the color logic as needed
        };
    });

    return config;
};
