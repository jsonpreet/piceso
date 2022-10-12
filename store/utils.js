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