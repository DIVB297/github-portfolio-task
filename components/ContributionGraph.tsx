'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchContributions } from '@/lib/github';
import { ContributionDay } from '@/types/github';

// Dynamically import ReactECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface ContributionGraphProps {
  username: string;
}

export default function ContributionGraph({ username }: ContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributions(username).then((data) => {
      setContributions(data);
      setLoading(false);
    });
  }, [username]);

  if (loading) {
    return <div className="h-32 bg-github-hover animate-pulse rounded" />;
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  // Prepare data for ECharts heatmap
  const prepareHeatmapData = () => {
    const months: string[] = [];
    const data: [number, number, number][] = [];
    
    // Group contributions by weeks
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    // Generate month labels
    weeks.forEach((week, weekIndex) => {
      if (week[0]) {
        const date = new Date(week[0].date);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        if (weekIndex === 0) {
          months.push(month);
        } else if (weeks[weekIndex - 1] && weeks[weekIndex - 1][0]) {
          const prevDate = new Date(weeks[weekIndex - 1][0].date);
          if (prevDate.getMonth() !== date.getMonth()) {
            months.push(month);
          } else {
            months.push('');
          }
        }
      }
    });

    // Prepare data in [x, y, value] format for heatmap
    weeks.forEach((week, weekIndex) => {
      week.forEach((day, dayIndex) => {
        data.push([weekIndex, dayIndex, day.count]);
      });
    });

    return { months, data, weekCount: weeks.length };
  };

  const { months, data, weekCount } = prepareHeatmapData();

  // ECharts configuration
  const option = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        const contribution = params.value[2];
        const weekIndex = params.value[0];
        const dayIndex = params.value[1];
        const contributionIndex = weekIndex * 7 + dayIndex;
        const date = contributions[contributionIndex]?.date || '';
        return `${contribution} contributions on ${date}`;
      },
    },
    grid: {
      left: 40,
      top: 30,
      right: 10,
      bottom: 10,
    },
    xAxis: {
      type: 'category',
      data: months,
      splitArea: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 11,
        color: '#656d76',
      },
    },
    yAxis: {
      type: 'category',
      data: ['Mon', '', 'Wed', '', 'Fri', '', ''],
      splitArea: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 11,
        color: '#656d76',
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map(d => d[2]), 10),
      show: false,
      inRange: {
        color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        itemStyle: {
          borderRadius: 2,
          borderWidth: 2,
          borderColor: '#ffffff',
        },
        emphasis: {
          itemStyle: {
            borderColor: '#9ca3af',
            borderWidth: 1,
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-github-text">
          {totalContributions} contributions in the last year
        </h3>
      </div>

      <div className="overflow-x-auto bg-white border border-github-border rounded-md p-3">
        <ReactECharts
          option={option}
          style={{ height: '150px', width: '100%', minWidth: `${weekCount * 11}px` }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-github-muted">
        <span>Learn how we count contributions</span>
        <div className="flex items-center gap-2 ml-auto">
          <span>Less</span>
          <div className="flex gap-1">
            {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, index) => (
              <div
                key={index}
                className="w-[10px] h-[10px] rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
