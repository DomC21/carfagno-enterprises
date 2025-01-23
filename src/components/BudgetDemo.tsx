import * as React from 'react'
import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { colorClasses, animationClasses } from '../utils/styles'

const COLORS = ['#14b8a6', '#3b82f6', '#6366f1']

export function BudgetDemo() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<number>(0)

  // Calculate budget breakdown
  const recommendedSavings = Math.max(income * 0.2, 0) // 20% rule
  const remainingBudget = Math.max(0, income - expenses - recommendedSavings)
  const actualSavings = Math.max(0, income - expenses)

  const data = [
    { name: 'Expenses', value: expenses },
    { name: 'Recommended Savings', value: recommendedSavings },
    { name: 'Remaining Budget', value: remainingBudget }
  ]

  // Generate insights based on the numbers
  const generateInsights = (): string[] => {
    const insights: string[] = []
    const savingsRate = (actualSavings / income) * 100

    if (expenses > income) {
      insights.push('⚠️ Your expenses exceed your income. Consider reviewing your spending.')
    }
    
    if (savingsRate < 20 && income > 0) {
      insights.push('💡 Try to save at least 20% of your income for long-term financial health.')
    }
    
    if (expenses > 0.7 * income) {
      insights.push('📊 Your expenses are over 70% of your income. Look for areas to reduce spending.')
    }

    return insights
  }

  return (
    <div className={`bg-blue-950/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl ${animationClasses.fadeIn}`}>
      <h3 className={`text-2xl font-bold ${colorClasses.primary} mb-4`}>Interactive Budget Calculator</h3>
      
      <p className={`${colorClasses.secondary} mb-6`}>
        Try adjusting your monthly income and expenses to see how your savings rate changes. Our calculator will provide personalized insights to help optimize your budget.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${colorClasses.secondary}`}>Monthly Income</label>
            <Input
              type="number"
              min="0"
              value={income || ''}
              onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
              className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20`}
              placeholder="Enter your monthly income"
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${colorClasses.secondary}`}>Monthly Expenses</label>
            <Input
              type="number"
              min="0"
              value={expenses || ''}
              onChange={(e) => setExpenses(Math.max(0, Number(e.target.value)))}
              className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20`}
              placeholder="Enter your monthly expenses"
            />
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${colorClasses.primary}`}>Financial Insights</h4>
            <ul className="space-y-2">
              {generateInsights().map((insight, index) => (
                <li key={index} className={`${colorClasses.secondary} text-sm`}>{insight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(15 23 42)',
                    border: '1px solid rgb(51 65 85)',
                    borderRadius: '0.375rem'
                  }}
                  itemStyle={{ color: '#94a3b8' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 bg-blue-900/30 rounded-lg ${colorClasses.border}`}>
            <p className={`${colorClasses.secondary} text-sm mb-2`}>
              Monthly Savings Potential: <span className={colorClasses.primary}>${actualSavings.toFixed(2)}</span>
              <span className="block mt-1 text-xs text-gray-400">This is how much you could save based on your current budget</span>
            </p>
            <p className={`${colorClasses.secondary} text-sm`}>
              Recommended Savings (20% Rule): <span className={colorClasses.primary}>${recommendedSavings.toFixed(2)}</span>
              <span className="block mt-1 text-xs text-gray-400">Financial experts recommend saving at least 20% of your income</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button 
          className={`group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}
        >
          Schedule Your Personal Budget Review Session!
        </Button>
      </div>
    </div>
  )
}
