
import moment from 'moment-timezone';
import { TZ } from '../config';

export default class DateUtil {
    public static defaultFormat: string = "MM/DD/YYYY HH:mm:ss";
    public static defaultFormatRegex: RegExp = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4} (?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;


    static isDefaultFormat(dateTimeStr: string): boolean {
        return moment.utc(dateTimeStr, this.defaultFormat, true).isValid();
    }

    static ISOtoDefaultFormat(isoStr: string): string {
        return moment.utc(isoStr).format(this.defaultFormat); // Use moment.utc() to interpret the time as UTC
    }

    static defaultFormatToISO(dateTimeFormated: string): Date{
     
        return moment.utc(dateTimeFormated, this.defaultFormat).toDate();
    }

    static isSameOrAfter(dateA: Date | null , dateB: Date | null): boolean {
        return moment(dateA).isSameOrAfter(dateB);
    }


    static timeDifferenceInMs(dateA: Date, dateB: Date): number {
        return moment(dateA).diff(moment(dateB));
    }
}


