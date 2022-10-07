import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { BarChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import axios from 'axios';

const colors = ThemeColors();

const ClassDistribution = () => {
  const [barChartData, setBarChartData] = useState({
    labels: ['5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Students',
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [],
        borderWidth: 2,
      },
    ],
  });

  const getBarChartData = async () => {
    const { schoolId } = JSON.parse(window.localStorage.getItem('userdata'));
    const res = await axios.get(`/getBarChartData?schoolId=${schoolId}`);
    if (res.status === 200) {
      const temp = barChartData;
      temp.datasets[0].data = res.data;
      setBarChartData(temp);
    }
  };

  useEffect(() => {
    getBarChartData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Class-wise Student Distribution" />
        </CardTitle>
        <div className="chart-container">
          <BarChart shadow data={barChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ClassDistribution;
