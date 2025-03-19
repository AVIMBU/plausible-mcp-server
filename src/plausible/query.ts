import { Tool } from "@modelcontextprotocol/sdk/types.js";

export interface QueryArgs {
  site_id: string;
  metrics: string[];
  date_range: string;
}

export const queryTool: Tool = {
  name: "plausible_query",
  description: "Query analytics data from Plausible",
  inputSchema: {
    type: "object",
    required: ["site_id", "metrics", "date_range"],
    properties: {
      site_id: {
        type: "string",
        description: "The domain of the site to query data for",
      },
      metrics: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "String list of metrics to query with the following options: 'visitors' 'int' The number of unique visitors | 'visits' 'int' The number of visits/sessions | 'pageviews'	'int' The number of pageview events	 | 'views_per_visit'	'float' The number of pageviews divided by the number of visits.	 | 'bounce_rate'	'float' Bounce rate percentage	 | 'visit_duration'	'int' Visit duration in seconds	 | 'events'	'int' The number of events (pageviews + custom events). When filtering by a goal, this metric corresponds to 'Total Conversions' in the dashboard.	 | 'scroll_depth'	'int' Page scroll depth averaged per session	Requires event:page filter or dimension being set | 'percentage'	'float' The percentage of visitors of total who fall into this category	Requires non-empty dimensions | 'conversion_rate'	'float' The percentage of visitors who completed the goal.	Requires non-empty dimensions, event:goal filter or dimension being set | 'group_conversion_rate'	'float' The percentage of visitors who completed the goal with the same dimension. Requires: dimension list passed, an event:goal filter or event:goal dimension	Requires non-empty dimensions, event:goal filter or dimension being set | 'average_revenue'	'Revenue' or null	Average revenue per revenue goal conversion	Requires revenue goals, event:goal filter or dimension for a relevant revenue goal. | 'total_revenue'	'Revenue' or null	Total revenue from revenue goal conversions	Requires revenue goals, event:goal filter or dimension for a relevant revenue goal.",
      },
      date_range: {
        type: "string",
        description:
          'Date range for the query, with the following options: ["2024-01-01", "2024-07-01"] Custom date range (ISO8601) | ["2024-01-01T12:00:00+02:00", "2024-01-01T15:59:59+02:00"] Custom date-time range (ISO8601) | "day"	Current day (e.g. 2024-07-01) | "7d"	Last 7 days relative to today | "30d"	Last 30 days relative to today | "month" Since the start of the current month | "6mo" Last 6 months relative to start of this month | "12mo" Last 12 months relative to start of this month | "year" Since the start of this year | "all"',
      },
    },
  },
};
