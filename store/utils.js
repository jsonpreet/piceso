export function getValueInRange(value, min, max) {
    let valueInRange = value;

    if (min !== undefined) {
        valueInRange = Math.max(valueInRange, min);
    }

    if (max != undefined) {
        valueInRange = Math.min(valueInRange, max);
    }

    return valueInRange;;
};

export const removeQueryParam = (url) => {
    return hasQueryParams(url) ? url.substring(0, url.indexOf('?')) : url
}

export function hasQueryParams(url) {
  return url.includes('?');
}

export function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const calculateDurationUntilNow = (p_timeStampNanoSeconds) => {
    const milliseconds = p_timeStampNanoSeconds / 1000000;
    const durationUntilNowInMilliseconds = new Date().getTime() - milliseconds;
    const durationInMinutes = durationUntilNowInMilliseconds / 1000 / 60;

    if (durationInMinutes < 60) {
        return Math.floor(durationInMinutes) + 'm';
    }

    const durationInHours = durationInMinutes / 60;

    if (durationInHours < 24) {
        return Math.floor(durationInHours) + 'h';
    }

    const durationInDays = durationInHours / 24;

    return Math.floor(durationInDays) + 'd';
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const dateFormat = (p_timeStampNanoSeconds) => {
    const milliseconds = p_timeStampNanoSeconds / 1000000;
    const date = new Date(milliseconds);
    //return new Date(milliseconds).toLocaleString('en-US');
    // const formattedDate = new Date(milliseconds).toLocaleString('en-US', {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric',
    //     hour12: true
    // });
    const formattedDate = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',

    }) + ' · ' + date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    return formattedDate;
}

export const isValidURL = (URL) => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
    return regex.test(URL);
};