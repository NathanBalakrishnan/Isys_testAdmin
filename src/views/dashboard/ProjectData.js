import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
    [
      "Name",
      "Development",
      "Testing",
      "Design",
      "Support",
      "Review",
      "Average",
    ],
    ["HRMS", 165, 938, 522, 998, 450, 614.6],
    ["FNP", 135, 1120, 599, 1268, 288, 682],
    ["Isys", 157, 1167, 587, 807, 397, 623],
    ["ABC", 139, 1110, 615, 968, 215, 609.4],
    ["DBZ", 136, 691, 629, 1026, 366, 569.6],
  ];
  
  export const options = {
    title: "Overall project status",
    vAxis: { title: "Timeline" },
    hAxis: { title: "Project Name" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

const ProjectData = () => {
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default ProjectData