import * as React from 'react'
import { motion } from 'framer-motion'
import { useAlert } from '../../contexts/AlertContext'
import { generateOptionsData, generateCongressionalTrades, generateMarketSentiment, generateGreekMetrics } from '../../utils/fakeData'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

interface ReportTemplate {
  id: string
  name: string
  description: string
  sections: ReportSection[]
}

import type { OptionsData, GreekMetrics, CongressionalTrade, MarketSentiment } from '../../utils/fakeData'

interface ReportData {
  optionsData: OptionsData[]
  greekMetrics: GreekMetrics[]
  congressionalTrades: CongressionalTrade[]
  marketSentiment: MarketSentiment[]
}

interface ReportSection {
  title: string
  dataSource: keyof ReportData
  visualization: 'table' | 'chart' | 'summary'
  options?: Record<string, unknown>
}

const defaultTemplates: ReportTemplate[] = [
  {
    id: 'options-flow',
    name: 'Options Flow Analysis',
    description: 'Comprehensive analysis of options flow data with Greek metrics',
    sections: [
      {
        title: 'Options Flow Overview',
        dataSource: 'optionsData',
        visualization: 'table'
      },
      {
        title: 'Greek Metrics Analysis',
        dataSource: 'greekMetrics',
        visualization: 'chart'
      }
    ]
  },
  {
    id: 'congressional',
    name: 'Congressional Trading Report',
    description: 'Analysis of recent congressional trading activity',
    sections: [
      {
        title: 'Recent Trades',
        dataSource: 'congressionalTrades',
        visualization: 'table'
      },
      {
        title: 'Performance Summary',
        dataSource: 'congressionalTrades',
        visualization: 'summary'
      }
    ]
  },
  {
    id: 'market-sentiment',
    name: 'Market Sentiment Analysis',
    description: 'Detailed market sentiment indicators and trends',
    sections: [
      {
        title: 'Sentiment Overview',
        dataSource: 'marketSentiment',
        visualization: 'chart'
      }
    ]
  }
]

export function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<ReportTemplate | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  type ReportDataType = {
    [K in keyof ReportData]: ReportData[K]
  }

  const [reportData, setReportData] = React.useState<ReportDataType>({
    optionsData: [],
    greekMetrics: [],
    congressionalTrades: [],
    marketSentiment: []
  })
  const { addAlert } = useAlert()

  const fetchReportData = React.useCallback(async () => {
    try {
      setIsGenerating(true)
      
      // Fetch data based on selected template
      const data: ReportDataType = {
        optionsData: [],
        greekMetrics: [],
        congressionalTrades: [],
        marketSentiment: []
      }
      
      if (selectedTemplate) {
        for (const section of selectedTemplate.sections) {
          switch (section.dataSource) {
            case 'optionsData':
              data.optionsData = await generateOptionsData(10)
              break
            case 'greekMetrics':
              data.greekMetrics = await generateGreekMetrics(24)
              break
            case 'congressionalTrades':
              data.congressionalTrades = await generateCongressionalTrades(5)
              break
            case 'marketSentiment':
              data.marketSentiment = await generateMarketSentiment(1)
              break
          }
        }
      }

      setReportData(data)
      addAlert({
        type: 'success',
        message: 'Report data fetched successfully'
      })
    } catch (err) {
      console.error('Failed to fetch report data:', err)
      addAlert({
        type: 'error',
        message: 'Failed to fetch report data'
      })
    } finally {
      setIsGenerating(false)
    }
  }, [selectedTemplate, addAlert])

  const generatePDF = React.useCallback(async () => {
    if (!selectedTemplate || !reportData) return

    try {
      const doc = new jsPDF()
      
      // Add header
      doc.setFontSize(20)
      doc.text(selectedTemplate.name, 20, 20)
      
      let yOffset = 40

      // Generate sections
      for (const section of selectedTemplate.sections) {
        doc.setFontSize(16)
        doc.text(section.title, 20, yOffset)
        yOffset += 10

        const sectionData = reportData[section.dataSource]
        if (!sectionData || !Array.isArray(sectionData) || sectionData.length === 0) continue
        
        // Handle specific data types based on section
        const data = section.dataSource === 'congressionalTrades' 
          ? (sectionData as unknown as CongressionalTrade[])
          : (sectionData as unknown as Record<string, unknown>[])
        
        // Ensure we have valid data for table operations
        if (!data[0]) continue

        switch (section.visualization) {
          case 'table': {
            const firstRow = data[0] as Record<string, unknown>
            // @ts-expect-error jspdf-autotable types not properly defined
            doc.autoTable({
              startY: yOffset,
              head: [Object.keys(firstRow)],
              body: data.map(row => Object.values(row as Record<string, unknown>)),
              margin: { top: 20 }
            })
            yOffset = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20
            break
          }
          case 'summary': {
            doc.setFontSize(12)
            if (section.dataSource === 'congressionalTrades') {
              const trades = data as unknown[] as CongressionalTrade[]
              const totalValue = trades.reduce((sum, trade) => sum + (trade.amount || 0), 0)
              const avgPerformance = trades.reduce((sum, trade) => sum + (trade.performance || 0), 0) / trades.length
              doc.text(`Total Trading Value: $${totalValue.toLocaleString()}`, 20, yOffset)
              yOffset += 10
              doc.text(`Average Performance: ${avgPerformance.toFixed(2)}%`, 20, yOffset)
              yOffset += 20
            }
            break
          }
          case 'chart': {
            // For demo purposes, we'll just add a text summary
            doc.setFontSize(12)
            doc.text('Chart visualization would be rendered here in production', 20, yOffset)
            yOffset += 20
            break
          }
          default: {
            break
          }
        }
      }

      // Save the PDF
      doc.save(`${selectedTemplate.id}-report.pdf`)
      
      addAlert({
        type: 'success',
        message: 'Report generated successfully'
      })
    } catch (err) {
      console.error('Failed to generate PDF report:', err)
      addAlert({
        type: 'error',
        message: 'Failed to generate PDF report'
      })
    }
  }, [selectedTemplate, reportData, addAlert])

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-colors ${
                selectedTemplate?.id === template.id
                  ? 'bg-blue-950/20 border-blue-500/20'
                  : 'hover:bg-blue-950/10'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <h3 className="text-lg font-semibold text-primary mb-2">{template.name}</h3>
              <p className="text-sm text-gray-400">{template.description}</p>
              <div className="mt-4 space-y-2">
                {template.sections.map((section, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {section.title}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={fetchReportData}
          disabled={!selectedTemplate || isGenerating}
          className="relative"
        >
          {isGenerating ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <span className="opacity-0">Generate Report</span>
            </>
          ) : (
            'Generate Report'
          )}
        </Button>

        <Button
          onClick={generatePDF}
          disabled={!selectedTemplate || !reportData || isGenerating}
          variant="outline"
        >
          Export PDF
        </Button>
      </div>

      {selectedTemplate && Object.keys(reportData).length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Report Preview</h2>
          <div className="space-y-6">
            {selectedTemplate.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium text-primary">{section.title}</h3>
                <div className="overflow-x-auto">
                  {section.visualization === 'table' && reportData[section.dataSource]?.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead>
                        <tr>
                          {reportData[section.dataSource]?.[0] && Object.keys(reportData[section.dataSource][0] as unknown as Record<string, unknown>).map((key) => (
                            <th
                              key={key}
                              className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {reportData[section.dataSource]?.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.values(row as Record<string, unknown>).map((value: unknown, valueIndex: number) => (
                              <td
                                key={valueIndex}
                                className="px-4 py-2 text-sm text-gray-300 whitespace-nowrap"
                              >
                                {typeof value === 'number'
                                  ? value.toLocaleString()
                                  : String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
