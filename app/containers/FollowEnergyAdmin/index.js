import React, {useState, useEffect} from 'react';
import {Grid,  Tabs, Tab, Box} from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import LineChart from '../../components/LineChart';
import Speedometer from '../../components/Speedmetter';
import PaperWrapper from '../../components/PaperWrapper';
import { urlLink } from '../../helper/route';

import Calendar from 'moedim';

const labels = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h']


const FollowEnergyAdmin = () => {
    const [currentDay, setCurrentDay] = useState(new Date());
    //get Device Id
    const { id } = useParams();

    console.log("iddđ", id);

    const [value, setValue] = useState(0);
    const handleChangeTime = (event, newValue) => {
        setValue(newValue);
    }


    const [currentElectric, setCurrentElectric] = useState(70);
    //per 15 minutes
    const getCurrentElectric = async () => {
        const apiUrl = urlLink.api.serverUrl + urlLink.api.getLatestDataDeviceEnergy + `${id}`;
        try {
          const response = await axios.get(apiUrl);

          setCurrentElectric(response.data.data.Records[0].Value.Current);
      
          console.log("getCurrentElectric", response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        getCurrentElectric();
    
        const intervalId = setInterval(() => {
          getCurrentElectric();
        }, 1000*60);

        return () => clearInterval(intervalId);
      }, []);

    const [currentDayData, setCurrentDayData ] = useState([]);
    const getCurrentDayData = async () => {
        const apiUrl = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}/2024-01-09T00:00:00.000Z/2024-01-09T23:59:59.999Z`;
        // http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/23/2024-01-09T00:00:00/2024-01-09T23:59:59
        try {
          const response = await axios.get(apiUrl);

          setCurrentDayData(response.data.data);
      
          console.log("getCurrentDayData", response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        getCurrentDayData();
    
        const intervalId = setInterval(() => {
            getCurrentDayData();
        }, 1000*60);

        return () => clearInterval(intervalId);
      }, []);

    return (
        <>
            <h1>Theo dõi năng lượng</h1>
            {/* display: 'flex', justifyContent: 'center'  */}
            <div style={{marginLeft:'150px' }}>
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
                <Grid item xs={12} sm={7} md={5} style={{ height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <LineChart textY='(kWh)' nameChart='Total kWh' dataEnergy={currentDayData.kWhPerHour} labelsEnergy={labels}/>
                </Grid>

                <Grid item xs={12} sm={4} md={3} 
                    style={{ backgroundColor: 'white', height: '300px', margin: '8px', justifyContent: 'center', 
                        alignItems:'center', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', 
                        borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <Speedometer
                        id="dial6"
                        value={currentElectric}
                        title="Electric (A) lastupdate"
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={3} style={{height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <LineChart textY='(W)' nameChart='Active Power last update x1000' dataEnergy={currentDayData.activePowerPerHour} labelsEnergy={labels}/>
                </Grid>

                <Grid item xs={12} sm={7} md={7} style={{height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <LineChart textY='(A)' nameChart='Current Electric per 1 hour' dataEnergy={currentDayData.electricPerHour} labelsEnergy={labels}/>
                </Grid>

                <Grid item xs={12} sm={4} md={4} style={{ height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                         justifyContent: 'center', alignItems:'center', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Calendar value={currentDay} onChange={(d) => setValue(d)} style={{width: '300px', height: '200px'}}/>
                </Grid>
            </Grid>
            </div>
        </>
    );
}
export default FollowEnergyAdmin;