/**
 * External function. Exports a column with text for each type - text, number, boolean, date, time, timespan, checkbox, status, enum & currency.
 * @param TEXT {string} - Text for text column
 * @param NUMBER {string} - Text for number column
 * @param BOOLEAN {string} - Text for bool column
 * @param DATE {string} - Text for date column
 * @param TIME {string} - Text for time column
 * @param TIMESPAN {string} - Text for timespan column
 * @param CHECKBOX {string} - Text for checkbox column
 * @param STATUS {string} - Text for status column
 * @param ENUM {string} - Text for enum column
 * @param CURRENCY {string} - Text for currency column
 * @returns string value for each parameter in the columns
 */
export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};
/**
 * Collects items and orders them by a value c
 * @param {any} c - parameter for an object c
 * @param {any} item - parameter collecting all items
 * @returns const type colType of ordered items
 */
export const colType = (c, item) => c.dynamicType?.(item) || c.type;
/**
 * Formats currency by USD
 * @param value - param for currency value
 * @returns returns currency value into string with USD format
 */
export const formatCurrency = (value) => "$" + value.toString();

/**
 * Formats time by its faule
 * @param value - parameter for the time value
 * @returns {*} formatted time string
 */
const formatTime = value => value;

/**
 * Formats the timespan per value param.
 * @param value - param for timespan
 * @returns {*} formatted TimeSpan string
 */
const formatTimeSpan = value => value;

/**
 * Formats date by param value
 * @param value - param for date value
 * @returns {*} formatted Date object
 */
const formatDate = value => value;

/**
 * Sorts an array of values by ascending
 * @param {Int16Array} array - param of an array of values to be sorted 
 * @param {any} keys - param for keys to be used for sorting
 * @param {any} asc - param for sorting values in array by ascending
 * @param {boolean} valueFormatter - param if the value has been formatted
 * @param {boolean} ifCallback - param if the value has been formatted to call back the function
 * @returns sorted array of values
 */
export function sortBy(array, keys, asc = true, valueFormatter = undefined, ifCallback = undefined) {
    return array.slice().sort((a, b) => comparator(a, b, keys, asc, valueFormatter, ifCallback));
}
/**
 * Formats cell content by the number of columns
 * @param {any} col - param for number of columns
 * @param {*} item - param for items inside the columns
 * @returns formatted cells for each column
 */
export function formatCellContent(col, item) {
    let formattedValue = col.key ? item[col.key] : item;

    if (col.format)
        formattedValue = col.format(item, col.key,);

    if (typeof formattedValue === 'number')
        switch (col.type) {
            case COLUMN_TYPE.TIME:
                formattedValue = formatTime(formattedValue); break;
            case COLUMN_TYPE.TIMESPAN:
                formattedValue = formatTimeSpan(formattedValue); break;
            case COLUMN_TYPE.DATE:
                formattedValue = formatDate(formattedValue); break;
            case COLUMN_TYPE.CURRENCY:
                formattedValue = formatCurrency(formattedValue); break;
        }
    else if (col.type == COLUMN_TYPE.STATUS)
        formattedValue = col.template(item);

    return formattedValue;
}
/**
 * Groups elements by keys
 * @param {list} list - param of list type with elements inside to be grouped
 * @param {any} key - param for keys to be used for grouping
 * @returns a list of elements grouped by keys
 */
export function groupBy(list, key) {
    return list.reduce((res, x) => {
        (res[x[key]] = res[x[key]] || []).push(x);
        return res;
    }, {});
}
/**
 * Enumerates data by property name
 * @param {any} data - param for the data to be enumerated
 * @param {string} propertyName - param for the property name to enumare the data
 * @returns {list} - returns a list of data enumerated by property name
 */
export function enumerateData(data, propertyName) {

    if (!data || !Array.isArray(data))
        throw new Error("Data parameter should be array")

    const list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const clickEvent = new CustomEvent('item_selected', {item: data[i]})

        li.innerText = data[i][propertyName] || '';
        li.addEventListener('click', (e) => li.dispatchEvent(clickEvent))

        list.appendChild(li);
    }

    return list;
}


/**
 * External function. Do not put documentation on this.
 * @param a {any}
 * @param b {any}
 * @param keys {string[]}
 * @param asc {boolean}
 * @param valueFormatter {function}
 * @param ifCallback {function}
 * @returns {boolean}
 */
function comparator(a, b, keys, asc, valueFormatter, ifCallback) {
}