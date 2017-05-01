import React, {Component} from 'react';
import {
  Line
} from 'recharts';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import Breadcrumb from '../ui/Breadcrumb'
import ResponsiveTable from '../ui/ResponsiveTable'
import Nh from '../helpers/NumberHelper'
import LineChart from '../charts/LineChart'
import ChartValue from '../charts/PlotValue'
import {ChartSmallTitle, ChartToolTip} from '../styles/BaseStyles'

const data = require('../data/ProjectedPopulation.json');

const headers = ['Year','India', 'China', 'USA', 'World']

const CustomToolTip = ({payload, label}) => {
  if (payload.length == 0) return <span></span>
  return <ChartToolTip>
    <div className='date' style={{backgroundColor: 'gray'}}>{label}</div>
    {payload.map((payload) => {
      return <div>{payload.name}: {Nh.abbr(payload.value)}</div>
    })
    }
  </ChartToolTip>
}


export default class Forecasts extends Component {

  formattedtabularData = () => {
    return data.slice().map((el) => {
      return [el['Year'], Nh.humanize(el['India']), Nh.humanize(el['China']), Nh.humanize(el['Usa']), Nh.humanize(el['World'])]
    })
  }

  renderChart = () => {
    return <Grid fluid>
      <Row>
        <Col xs={12} sm={6}>
          <ChartSmallTitle>India, China and USA: Forecasted population growth</ChartSmallTitle>
          <LineChart plotBy='Year' label='India Population' color='green' data={data}
                     valueType={ChartValue.BIG_NUMBER} customToolTip={<CustomToolTip/>}>
            <Line dataKey="India" stroke="green" dot={false}/>
            <Line dataKey="China" stroke="orange"  dot={false}/>
            <Line dataKey="Usa" stroke="blue"  dot={false}/>
          </LineChart>
        </Col>
      </Row>
    </Grid>
  }

  render() {
    return <div>
      <Breadcrumb  category='Demography'  label={`Population Forecast`}/>
      <Tabs>
        <TabList>
          <Tab>Facts</Tab>
          <Tab>Data</Tab>
          <Tab>FAQ</Tab>
        </TabList>

        <TabPanel>
          <h2>{this.renderChart()}</h2>
        </TabPanel>
        <TabPanel>
          <ResponsiveTable data={this.formattedtabularData()} headers={headers}/>
        </TabPanel>
        <TabPanel>
          <h2>FAQ</h2>
        </TabPanel>
      </Tabs>
    </div>
  }
}

