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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TIndividualSubjectScores } from "@/lib/schema/tests.schema"

const chartConfig = {
    correct: {
        label: "Correct",
        color: "hsl(var(--chart-1))",
    },
    incorrect: {
        label: "Incorrect",
        color: "hsl(var(--chart-2))",
    },
    unattempt: {
        label: "Unattempt",
        color: "hsl(var(--chart-3))",
    },
    total: {
        label: "Total",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig


type Props = {
    data: TIndividualSubjectScores
}

export function SubjectScoreBreakdownGraph(props: Props) {
    const { data } = props
    const modifiedData = [{
        label: 'Scores',
        total: props.data.total,
        correct: props.data.correct,
        incorrect: props.data.incorrect,
        unattempt: props.data.unattempt
    }]
    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <CardTitle>Scores Breakdown</CardTitle>
                {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={modifiedData} className="py-6 lg:py-10">
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="correct" fill="var(--color-correct)" radius={4} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                        <Bar dataKey="unattempt" fill="var(--color-unattempt)" radius={4} />
                        <Bar dataKey="incorrect" fill="var(--color-incorrect)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}
