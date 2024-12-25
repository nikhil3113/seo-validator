"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface RadialChartProps {
  seoPercentage: number;
  showHeader?: boolean;
  showFooter?: boolean;
  sizeConfig? :boolean
}

const chartConfig = {
  seo: {
    label: "SEO Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RadialChart({
  seoPercentage,
  showHeader = true,
  showFooter = true,
  sizeConfig = false
}: RadialChartProps) {
  const chartData = [
    { name: "seo", value: seoPercentage, fill: "var(--color-seo)" },
  ];

  return (
    <Card className={`flex flex-col ${sizeConfig ? "w-60 shadow-none border-none" : "w-full"}`}>
      {showHeader && (
        <CardHeader className="items-center pb-0">
          <CardTitle>SEO Score</CardTitle>
          <CardDescription>Based on title and description</CardDescription>
        </CardHeader>
      )}

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180 + (seoPercentage * 180) / 100}
            endAngle={0}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="value"
              background
              //   clockwise={true}
              cornerRadius={5}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {seoPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          SEO Score
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {showFooter && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {seoPercentage >= 80 ? "Great SEO score!" : "Room for improvement"}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Based on title and description analysis
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
