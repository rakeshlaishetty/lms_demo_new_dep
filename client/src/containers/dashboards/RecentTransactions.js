/* eslint-disable react/no-array-index-key */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import formatNumber from 'helpers/formatNumber';


const RecentTransactions = ({data}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="Recent Transactions" />
          </CardTitle>
          <div className="dashboard-logs">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <table className="table table-sm table-borderless">
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span
                            className="log-indicator align-middle border-theme-1"
                          />
                        </td>
                        <td>
                          <span className="font-weight-medium">
                            {item.studentId.name}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-muted">{formatNumber(item.amount)}</span>
                        </td>
                        <td className="text-right">
                          <span className="text-muted">{(new Date(item.date)).toLocaleDateString()}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default RecentTransactions;
