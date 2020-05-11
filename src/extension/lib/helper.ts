import { URL } from 'url'

export const googleSpreadsheetUrlToId = (url: string): string => {
    const spreadSheetUrl = new URL(url);
    const pathNames = spreadSheetUrl.pathname.split('/');
    // pathName must be '[0]/spreadsheets'[1]/'d'[2]/<spreadsheet id>[3]
    return pathNames[3] || '';
}