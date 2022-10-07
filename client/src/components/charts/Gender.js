/* eslint-disable prefer-rest-params */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { ThemeColors } from 'helpers/ThemeColors';
import axios from 'axios'
import { pieChartOptions } from './config';


const colors = ThemeColors();

const Gender = ({ shadow = false }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [data, setData] = useState({
    labels: ['Males', 'Females'],
    datasets: [
      {
        label: '',
        borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3],
        backgroundColor: [
          colors.themeColor1_10,
          colors.themeColor2_10,
          colors.themeColor3_10,
        ],
        borderWidth: 2,
        data: [],
      },
    ],
  })

  const getData = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(
      `/admission/getGenderDistribution?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setDataset([parseInt(res.data.males, 10), parseInt(res.data.females, 10)]);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const temp = data;
    temp.datasets[0].data = dataset;
    setData(temp)
  }, [dataset])

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.defaults.pieWithShadow = Chart.defaults.pie;
        Chart.controllers.pieWithShadow = Chart.controllers.pie.extend({
          draw(ease) {
            Chart.controllers.pie.prototype.draw.call(this, ease);
            const {
              chart: { ctx },
            } = this;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            ctx.responsive = true;
            Chart.controllers.pie.prototype.draw.apply(this, arguments);
            ctx.restore();
          },
        });
      }
      const context = chartContainer.current.getContext('2d');
      const newChartInstance = new Chart(context, {
        type: shadow ? 'pieWithShadow' : 'pie',
        options: pieChartOptions,
        data,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

export default Gender;
