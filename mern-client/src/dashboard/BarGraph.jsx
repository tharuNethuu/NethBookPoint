import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ completedOrdersCount, nonCompletedOrdersCount, totalOrders }) => {
  // Calculate the percentages
  const completedPercentage = totalOrders > 0 ? (completedOrdersCount / totalOrders) * 100 : 0;
  const nonCompletedPercentage = totalOrders > 0 ? (nonCompletedOrdersCount / totalOrders) * 100 : 0;

  // Data for the bar chart
  const data = {
    labels: ['Completed Orders', 'Non-Completed Orders'],
    datasets: [
      {
        label: 'Percentage',
        data: [completedPercentage, nonCompletedPercentage],
        backgroundColor: ['#4caf50', '#f44336'], // Green for completed, Red for non-completed
        borderColor: ['#388e3c', '#d32f2f'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(2)}%`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className='bg-white shadow-sm shadow-yellow-600 rounded p-4 hover:shadow-lg hover:shadow-yellow-600'>
      <h2 className='text-xl font-bold text-yellow-600'>Completed vs Non-Completed Orders</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
