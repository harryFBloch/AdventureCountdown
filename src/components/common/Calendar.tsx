import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import './Calendar.css'

interface Props {
  finishedDates: {[key: string]: Date[]},
  almostFinishedDates: {[key: string]: Date[]},
}

export const Calendar = ({ finishedDates, almostFinishedDates }: Props): ReactElement => {

  const highlightDates = [finishedDates, almostFinishedDates]
  console.log('highlight', highlightDates)

  return (
    <>
    {finishedDates !== undefined && almostFinishedDates !== undefined && 
    <DatePicker onChange={() => {}}
      selected={new Date()} inline highlightDates={[...highlightDates]}/>
    }
    </>
  )
}

export default Calendar;