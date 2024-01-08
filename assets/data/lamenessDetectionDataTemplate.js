import formatDate from "../utils/getDate";

const today = formatDate();

// For demo purposes and the chart to be displayed completely, the template contains values of one
// Later on, the template should be zeroed out and the zero values should be filtered out by 
// uncommenting the code in assets/components/homePage/analytics/analytics.js' useEffect hook
/**
 * Template for lameness detection data.
 * @type {Object}
 */
const lamenessDetectionDataTemplate = {
    [today]: { healthy: 1, lame: 1, fir: 1, uncertain: 1 },
};

export default lamenessDetectionDataTemplate;
