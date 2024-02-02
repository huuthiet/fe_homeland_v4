import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import dayjs, { Dayjs } from 'dayjs';

import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import LineChart from '../../components/LineChart';
import Speedometer from '../../components/Speedmetter';
import PaperWrapper from '../../components/PaperWrapper';
import { urlLink } from '../../helper/route';
import './style.scss';

import Calendar from 'moedim';
import moment, { isDate } from 'moment-timezone';

const labelsInDay = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h']

function getDaysInCurrentMonth() {
  // Set the timezone to 'Asia/Ho_Chi_Minh' (Vietnam timezone)
  moment.tz.setDefault('Asia/Ho_Chi_Minh');

  const today = moment();
  const daysInMonth = today.daysInMonth();

  const dayLabels = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayLabels.push(day);
  }

  return dayLabels;
}

const labelsInMon = getDaysInCurrentMonth();


const FollowEnergyHost = () => {
  // console.log("labelsInMon", labelsInMon)
  const [currentDay, setCurrentDay] = useState(new Date());
  //get Device Id
  const { id, name } = useParams();

  //note
  const [showAlert, setShowAlert] = useState(false);
  const [titleKwhChart, setTitleKwhChart] = useState('');

  const currentDate = new Date();
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] 
    = useState(dayjs(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`)
    .format('YYYY-MM-DD'));
  // ngày bắt đầu và kế thúc để hiển thị, chưa lọc
  const [startDateDisplay, setStartDateDisplay] =  useState(startDate);
  const [endDateDisplay, setEndDateDisplay] =  useState(endDate);

  const handleStartDateDisplayChange = (event) => {
    const newDate = event.target.value;

    setStartDateDisplay(newDate);
  };
  const handleEndDateDisplayChange = (event) => {
    const newDate = event.target.value;

    setEndDateDisplay(newDate);
  };

  const handleButtonFilter = async () => {
    if (endDateDisplay < startDateDisplay) {
      setShowAlert(true);
      // console.log("kết quả so sánh", endDateDisplay < startDateDisplay);
    } else {
      // console.log("kết quả so sánh", endDateDisplay < startDateDisplay);
      setShowAlert(false);

       let apiGetDay = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerDayByTime + id + '/' +  startDateDisplay  + '/' + endDateDisplay;

      //  console.log("apiGetDay", apiGetDay);

      try {
        startLoading();
        const response = await axios.get(apiGetDay);

        // <LineChart textY='(kWh)' nameChart={`Total kWh: ${totalkWh}`} 
        // dataEnergy={currentKwh} labelsEnergy={labelLineChart}/>

        const result = response.data.data;

        // parseFloat(responseMon.data.data.totalkWhMon).toFixed(2);

        setTotalkWh(parseFloat(result.totalkWhTime).toFixed(2));
        setCurrentKwh(result.kWhData);
        setLabelLineChart(result.labelTime);

        setTitleKwhChart(`Total kWh from ${startDateDisplay} to ${endDateDisplay}`)
  
        console.log("response.data.data", response.data.data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }  finally {
        stopLoading();
      }
    }
  }


  //--------------------------


  const [labelLineChart, setLabelLineChart] = useState(labelsInDay);

  // let apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;

  let apiKwh = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + id;

  const [value, setValue] = useState(0);
  const handleChangeTime = (event, newValue) => {
    setValue(newValue);
  }


  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [totalkWh, setTotalkWh] = useState(-1);
  const [currentElectric, setCurrentElectric] = useState(70);
  //per 15 minutes
  const getCurrentElectric = async () => {
    const apiUrl = urlLink.api.serverUrl + urlLink.api.getLatestDataDeviceEnergy + `${id}`;
    try {
      const response = await axios.get(apiUrl);

      let electric = response.data.data.Current;

      setCurrentElectric(electric);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCurrentElectric();

    const intervalId = setInterval(() => {
      getCurrentElectric();
    }, 1000 *60*60);

    return () => clearInterval(intervalId);
  }, []);

  const [currentDayData, setCurrentDayData] = useState([]);
  const [currentKwh, setCurrentKwh] = useState([]);
  const getCurrentDayData = async () => {
    console.log("value", value);

    // console.log("Gọi lại ", apiKwh);

    startLoading();

    const current = new Date();

    const currentYear = current.getFullYear();
    const currentMon = current.getMonth() + 1;

    const apiUrl = apiKwh;
    const apiUrlDay = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + id;
    const apiUrlMon = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerDay + id + '/' + currentYear + '/' + currentMon;
    try {
      const responseDay = await axios.get(apiUrlDay);
      const responseMon = await axios.get(apiUrlMon);

      if (value === 0) {
        setCurrentKwh(responseDay.data.data.kWhData);
        const formattedTotalkWh = parseFloat(responseDay.data.data.totalkWhDay).toFixed(2);
        setTotalkWh(formattedTotalkWh);

        setLabelLineChart(labelsInDay);

        setTitleKwhChart(`Total kWh today`);

      } else if (value === 1) {
        const formattedTotalkWh = parseFloat(responseMon.data.data.totalkWhMon).toFixed(2);
        setTotalkWh(formattedTotalkWh);
        setCurrentKwh(responseMon.data.data.kWhData);

        setLabelLineChart(labelsInMon);

        setTitleKwhChart(`Total kWh this month`);

      }
      setCurrentDayData(responseDay.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      stopLoading();
    }
  };


  useEffect(() => {
    // if (value === 0) {
    //   setLabelLineChart(labelsInDay);
    // } else if (value === 1) {
    //   setLabelLineChart(labelsInMon);
    // }
    getCurrentDayData();

    const intervalId = setInterval(() => {
      getCurrentDayData();
    }, 1000 * 60*60);

    return () => clearInterval(intervalId);
  }, [value]);

  const followTotalKwhCard = {
    height: '308px',
    borderRadius: '10px',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.08)',
    margin: '8px 8px 8px 0px',
  }

  const followElectricCard = {
    height: '308px',
    borderRadius: '10px',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '8px 0px 8px 0px'

  }

  const followActiveCard = {
    height: '308px',
    borderRadius: '10px',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '8px 0px 8px 8px'

  }

  const followCard = {
    height: '308px',
    borderRadius: '10px',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0px 8px 8px 0px'
  }

  const calendarCard = {
    height: '308px',
    borderRadius: '10px',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0px 0px 8px 8px',
  }

  return (
    <>
      <Helmet>
        <title>Energy Host</title>
        <meta name="description" content="Description of Energy" />
        </Helmet>
        <div className="title-abc">Theo dõi năng lượng: {name}</div>

        {showAlert && (
                <Alert severity="error">
                  Vui lòng nhập ngày sau lớn hơn ngày trước!
                </Alert>
              )}
          <br/>


      {loading && <div className="loading-overlay"></div>}

      <div style={{ textAlign: 'center' }}>
              <label htmlFor="startdate">Từ ngày: </label>
              <input
                type='date'
                id='startdate'
                value={startDateDisplay}
                onChange={handleStartDateDisplayChange}
                style={{ marginRight: '8px' }} 
              />
              <label htmlFor="enddate">Đến ngày: </label>
              <input
                type='date'
                id='enddate'
                value={endDateDisplay}
                onChange={handleEndDateDisplayChange}
                style={{ marginRight: '8px' }}  
              />
              <Button onClick={handleButtonFilter} variant="contained" color="primary">
                Lọc
              </Button>
            </div>

      <div style={{ marginLeft: '100px' }}>
        <Tabs
          value={value}
          onChange={handleChangeTime}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          label="scrollable auto tabs example">
          <Tab label="1 Ngày" />
          <Tab label="1 Tháng" />
        </Tabs>
      </div>
      <div>
        <Grid container justify="center">
          <Grid style={followTotalKwhCard} item xs={12} sm={7} md={5}>
            <LineChart textY='(kWh)' nameChart={`${titleKwhChart}: ${totalkWh}`} dataEnergy={currentKwh} labelsEnergy={labelLineChart} />
          </Grid>

          <Grid item xs={12} sm={4} md={3}
            style={followElectricCard}>
            <Speedometer
              id="dial6"
              value={currentElectric}
              title="Electric (A)"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} style={followActiveCard}>
            <LineChart textY='(kW)' nameChart='Active Power' dataEnergy={currentDayData.activePowerPerHour} labelsEnergy={labelsInDay} />
          </Grid>

          <Grid item xs={12} sm={7} md={7} style={followCard}>
            <LineChart textY='(A)' nameChart='Current Electric per 1 hour' dataEnergy={currentDayData.electricPerHour} labelsEnergy={labelsInDay} />
          </Grid>

          <Grid item xs={12} sm={4} md={4} style={calendarCard}>
            <Calendar value={currentDay} onChange={(d) => setValue(d)} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default FollowEnergyHost;