import './App.css';
import React from 'react';
import { useGetAppointmentListQuery } from './api/appointmentApi';

import { match } from 'ts-pattern';
import { Loader } from './components/Loader';
import { AppointmentTable } from './components/AppointmentTable';

function App() {
  const { data, isError, isFetching, isSuccess } = useGetAppointmentListQuery();
  return (
    <>
      {match({ isError, isFetching, isSuccess })
        .with({ isError: true }, () => (
          <div className='w-screen h-screen flex justify-center items-center'>
            <h3>Something went wrong, Please try later.</h3>
          </div>
        ))
        .with({ isFetching: true }, () => (
          <div className='w-screen h-screen flex justify-center items-center'>
            <Loader />
          </div>
        ))
        .with({ isSuccess: true }, () => <AppointmentTable appointments={data.appointments} />)
        .otherwise(() => (
          <>Something unexpected happened. Please contact admin.</>
        ))}
    </>
  );
}

export default App;
