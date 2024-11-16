
"use client"

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TSubjectWiseChapterScores } from "../schema"

import { } from "../schema"
import { subjectWiseChapterScore } from "../methods"

const chartConfig = {
    accuracy: {
        label: "Accuracy",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type Props = {
    data: TSubjectWiseChapterScores
}

export function SubjectwiseAccuracy(props: Props) {
    const { data } = props
    const subjectWiseScoreData = subjectWiseChapterScore(data)
    const modifiedData = subjectWiseScoreData.map((item) => ({
        subject: item.name,
        accuracy: item.total > 0 ? (item.correct / item.total) * 100 : 0, // Avoid division by zero
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Accuracy Comparison </CardTitle>
                <CardDescription>Accuracy score of each individual subject!</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={modifiedData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="subject"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

