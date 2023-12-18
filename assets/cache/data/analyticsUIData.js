const analyticsData = [
  {
    value: 500,
    color: "green",
    gradientCenterColor: "#DFFFD5",
    legendName: "Healthy",
    focused: true,
  },
  {
    value: 400,
    color: "red",
    gradientCenterColor: "#FFA07A",
    legendName: "Lame",
  },
  {
    value: 100,
    color: "orange",
    gradientCenterColor: "#FFDAB9",
    legendName: "FIR",
    infoText:
      "FIR, short for further investigation required, signals that while the system assessed the input, it couldn't conclusively determine the cow's health status. Consequently, it suggests a veterinarian checkup might be necessary.",
  },
  {
    value: 59,
    color: "grey",
    gradientCenterColor: "#D3D3D3",
    legendName: "Uncertain",
    infoText:
      "Uncertain, indicates the system's inability to ascertain the cow's health status, potentially stemming from issues with the input data. Please review the data and attempt the process again.",
  },
];
  
export default analyticsData;