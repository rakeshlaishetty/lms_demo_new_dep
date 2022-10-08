import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { PieChart } from 'components/charts';

import { ThemeColors } from 'helpers/ThemeColors';

const colors = ThemeColors();

const GenderDistribution = ({ data, chartClass = 'chart-container' }) => {

    const chartData = {
        labels: ['Males', 'Females'],
        datasets: [
          {
            data: data,
            borderWidth: 2,
            borderColor: [colors.themeColor1, colors.themeColor2],
            backgroundColor: [
              colors.themeColor1_10,
              colors.themeColor2_10,
            ],
          },
        ],
      };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Gender Distribution" />
        </CardTitle>
        <div className={chartClass}>
          <PieChart shadow data={chartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default GenderDistribution;
