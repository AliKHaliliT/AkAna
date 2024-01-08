/**
 * Represents the template for lameness detection analytics.
 * @typedef {Object[]} LamenessDetectionTemplate
 * @property {number} value - The value associated with the template.
 * @property {string} color - The color associated with the template.
 * @property {string} gradientCenterColor - The gradient center color associated with the template.
 * @property {string} legendName - The legend name associated with the template.
 * @property {boolean} [focused] - Indicates if the template is focused.
 * @property {string} [infoText] - Additional information about the template.
 */
const lamenessDetectionTemplate = [
  {
    value: 999,
    color: "green",
    gradientCenterColor: "#DFFFD5",
    legendName: "Healthy",
    focused: true,
  },
  {
    value: 999,
    color: "red",
    gradientCenterColor: "#FFA07A",
    legendName: "Lame",
  },
  {
    value: 999,
    color: "orange",
    gradientCenterColor: "#FFFFE0",
    legendName: "FIR",
    infoText: "FIR, short for further investigation required, signals that while the system assessed the input, it couldn't conclusively determine the cow's health status. Consequently, it suggests a veterinarian checkup might be necessary.",
  },
  {
    value: 999,
    color: "grey",
    gradientCenterColor: "#D3D3D3",
    legendName: "Uncertain",
    infoText: "Uncertain, indicates the system's inability to ascertain the cow's health status, potentially stemming from issues with the input data. Please review the data and attempt the process again.",
  },
];
  
export default lamenessDetectionTemplate;