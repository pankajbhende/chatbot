import { useEffect, useRef } from 'react';
  import Chart from 'chart.js/auto';

  function PriceChart({ chartData }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        chartRef.current = new Chart(canvasRef.current, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              x: { title: { display: true, text: 'Time' } },
              y: { title: { display: true, text: 'Price (USD)' } },
            },
          },
        });
      }
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, []);

    useEffect(() => {
      if (chartRef.current) {
        chartRef.current.data = chartData;
        chartRef.current.update();
      }
    }, [chartData]);

    return (
      <div className="chart-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    );
  }

  export default PriceChart;