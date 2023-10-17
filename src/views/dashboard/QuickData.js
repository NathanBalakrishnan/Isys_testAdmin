import React from 'react'
import { Chart } from 'react-google-charts';

export const data = [
  [
    "Element",
    "Days",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["National", 10, "yellow", null],
  ["Public", 7, "orange", null],
  ["Festival", 8, "red", null],
  ["Others", 5, "green", null],
];

export const options = {
  title: "Yearly Holidays",
  width: 250,
  height: 400,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

const QuickData = () => {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default QuickData