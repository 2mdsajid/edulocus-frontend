"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { subjectChartConfig } from "./chart-configs";
import { TSubjectwiseScoresChartData } from "@/lib/schema/users.schema";

type Props = {
    data: TSubjectwiseScoresChartData[]
};


export function VariousSubjectScore(props: Props) {
    const { data: chartData } = props;

    const totalScore = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + Number(curr['score']), 0); // Sum the values based on the dataKey
    }, [chartData, 'subject']);


    return (
        <Card className="flex flex-col">
            <CardHeader className="items-start pb-0">
                <CardTitle>{`Various Subjects Scores`}</CardTitle>
                {/* <CardDescription>{chartDescription}</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={subjectChartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >

                    <PieChart>

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey={String('score')} // Convert dynamic key to string
                            nameKey={String('subject')} // Convert dynamic key to string
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
                                                    {'Total'}
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
                                    className="border"
                                    nameKey={String('subject')}
                                    payload={chartData.map((entry) => ({
                                        value: entry.subject,
                                        color: '#8884d8', // Use a default color since 'color' doesn't exist in the type
                                        payload: entry
                                    }))}
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
