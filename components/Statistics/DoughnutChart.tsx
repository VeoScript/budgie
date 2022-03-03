import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface TypeProps {
  overall_income: any
  overall_expenses: any
  overall_balance: any
}

const DoughnutChart: React.FC<TypeProps> = ({ overall_income, overall_expenses, overall_balance }) => {

  const data = {
    labels: ['Overall Income', 'Overall Expenses', 'Overall Balance'],
    datasets: [
      {
        label: 'Budget Plans Statistics',
        data: [overall_income, overall_expenses, overall_balance],
        backgroundColor: [
          '#87D61D',
          '#F95B5B',
          '#3AB3F3',
        ],
        borderColor: [
          '#47710F',
          '#D90909',
          '#096495',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[30rem] p-5">
      <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart