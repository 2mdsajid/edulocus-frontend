"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
import { TSubjectwiseScoresChartData } from "../../app/dashboard/_components/schema"
import { subjectChartConfig } from "./chart-configs"


type Props = {
  chartData: TSubjectwiseScoresChartData[]
}

export function SubjectWiseScoreBarGraph(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Wise Score</CardTitle>
        <CardDescription>Comprehensive chart to show accuracy of individual subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={subjectChartConfig}>
          <BarChart
            accessibilityLayer
            data={props.chartData}
            layout="vertical"
            margin={{
              right: 6,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="score" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="score"
              layout="vertical"
              fill="var(--color-score)"
              radius={4}
            >
              <LabelList
                dataKey="subject"
                position="inside"
                offset={8}
                className="fill-black"
                fontSize={12}
              />
              <LabelList
                dataKey="score"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
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
