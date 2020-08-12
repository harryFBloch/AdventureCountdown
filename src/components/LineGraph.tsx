import React, { ReactElement } from 'react'
import Chart ,{Line, ChartData} from 'react-chartjs-2';


interface ComponentProps {
  data: {[key: string]: {data: {t: Date, y: number}[],  color: string}};
  title: string;
  fill?: boolean;
  legend?: boolean;
}



export const LineGraph = ({ data, title, fill=false, legend = false }: ComponentProps): ReactElement => {

  const lineData = Object.keys(data).map((key) => {
    return {
      label: key,
        fill: fill,
        backgroundColor: data[key].color,
        borderColor: data[key].color,
        borderWidth: 2,
        data: data[key].data,
        lineTension: 0.5,
    }
  })

  return (
    <Line height={200}
          data={{datasets: lineData}}
          options={{
            title:{
              display:true,
              text: title,
              fontSize:20,
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day'
                }
              }]
            },
            legend: {
              display:legend,
              position:'bottom'
            },
            layout: {
              
            }
          }}
        />
  )
}

export default LineGraph