import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FullScreenLoader from '../components/FullScreenLoader';
import Message from '../components/Message';
import SensorDataBarChart from '../components/sensor/bar';
import HumidityLineChart from '../components/sensor/humidity';
import TemperatureLineChart from '../components/sensor/temperature';
import { useGetAllSensorsQuery } from '../redux/api/sensorApi';
import { ISensorResponse } from '../redux/api/types';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns: GridColDef<ISensorResponse>[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  {
    field: 'humidity',
    headerName: 'Humidity',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'temperature',
    headerName: 'Temperature',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'season',
    headerName: 'Season',
    type: 'string',
    width: 150,
    editable: true,
  },
];

const HomePage = () => {
  const { isLoading, isError, error, data: sensors } = useGetAllSensorsQuery();

  useEffect(() => {
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: '#fff', height: '100vh' }}
    >
      {sensors?.length === 0 ? (
        <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
          <Message type='info' title='Info'>
            No posts at the moment
          </Message>
        </Box>
      ) : (
        <>
          <Box sx={{ height: 400, width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item>
                  {' '}
                  <TemperatureLineChart />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  {' '}
                  <HumidityLineChart />
                </Item>
              </Grid>
            </Grid>

            <SensorDataBarChart sensorData={sensors} />

            <DataGrid
              rows={sensors}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default HomePage;
