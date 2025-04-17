export default function isWithinRange(row: any, columnId: any, value: any) {
    console.log(row, columnId)
    const savedDate = row.getValue(columnId);
    console.log('SAVED DATE', savedDate)
    const date = new Date(savedDate)
    const { from, to } = value;                 // value => two date input values
    //If one filter defined and date is null filter it
    if ((from || to) && !date) return false;
    if (from && !to) {
        return date.getTime() >= from.getTime()
    } else if (!from && to) {
        return date.getTime() <= to.getTime()
    } else if (from && to) {
        return date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
    } else return true;
};