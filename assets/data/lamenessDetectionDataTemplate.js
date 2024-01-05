import formatDate from "../utils/getDate";

const today = formatDate();

const lamenessDetectionDataTemplate = {
    [today]: { healthy: 1, lame: 1, fir: 1, uncertain: 1 },
};

export default lamenessDetectionDataTemplate;
