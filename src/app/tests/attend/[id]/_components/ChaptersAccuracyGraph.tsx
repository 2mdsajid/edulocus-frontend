"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TChapterAccuracy } from "@/lib/schema/tests.schema"

const chartConfig = {
    accuracy: {
        label: "Accuracy",
        color: "hsl(var(--chart-3))",
    },
    chapter: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

type Props = {
    data: TChapterAccuracy[]
}

export function ChaptersAccuracyGraph(props: Props) {
    const { data } = props
    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <CardTitle>Chapters Accuracy Score</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        className="py-6 lg:py-10"
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="accuracy" />
                        <YAxis
                            dataKey="chapter"
                            type="category"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.replace(/_/g, ' ')}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="accuracy" className="mr-5" fill="var(--color-accuracy)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>

    )
}
