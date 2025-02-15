import { GreekMetrics, OptionsData, CongressionalTrade, MarketSentiment } from '../utils/fakeData'

export type ReportDataSource = 'optionsData' | 'greekMetrics' | 'congressionalTrades' | 'marketSentiment'

export type ReportVisualization = 'table' | 'chart' | 'summary'

export interface ReportSection {
  title: string
  dataSource: ReportDataSource
  visualization: ReportVisualization
  options?: {
    chartType?: 'line' | 'bar' | 'pie'
    metrics?: string[]
    timeframe?: string
    aggregation?: 'sum' | 'average' | 'count'
  }
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  sections: ReportSection[]
}

export interface ReportData {
  optionsData?: OptionsData[]
  greekMetrics?: GreekMetrics[]
  congressionalTrades?: CongressionalTrade[]
  marketSentiment?: MarketSentiment[]
}

export interface ReportGenerationOptions {
  template: ReportTemplate
  data: ReportData
  format: 'pdf' | 'csv' | 'json'
  customization?: {
    branding?: {
      logo?: string
      colors?: {
        primary: string
        secondary: string
      }
    }
    header?: {
      title?: string
      subtitle?: string
      date?: Date
    }
    footer?: {
      text?: string
      pageNumbers?: boolean
    }
  }
}
