import { NodeCG } from './nodecg';
// eslint-disable-next-line @typescript-eslint/camelcase
import { sheets_v4 } from 'googleapis';
import { googleSpreadsheetUrlToId } from './lib/helper';
import { SpeedcontrolUserAdditionArray } from '../nodecg/replicants';

// eslint-disable-next-line @typescript-eslint/camelcase
export const importUserAddition = (nodecg: NodeCG, spreadsheet: sheets_v4.Sheets): void => {
    const logger = new nodecg.Logger(`${nodecg.bundleName}:import-user-addition`);
    const userAdditionArrayRep = nodecg.Replicant('speedcontrolUserAdditionArray');

    const importAdditionFromSpreadsheet = async (
        url: string, sheetName: string, runnerIdIndex: number, nicoIndex: number, youtubeIndex: number, twitterIndex: number
    ): Promise<boolean> => {
        const spreadsheetId = googleSpreadsheetUrlToId(url);
        const valueResponse = await spreadsheet.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName
        });

        if (!valueResponse.data.values) {
            return false;
        }
        const additionDataArray: SpeedcontrolUserAdditionArray = valueResponse.data.values.filter((_, index) => {
            return index !== 0;
        }).map((values) => {
            return {
                id: values[runnerIdIndex],
                social: {
                    nico: values[nicoIndex] !== '' ? values[nicoIndex] : undefined,
                    youtube: values[youtubeIndex] !== '' ? values[youtubeIndex] : undefined,
                    twitter: values[twitterIndex] !== '' ? values[twitterIndex] : undefined
                }
            };
        });
        userAdditionArrayRep.value = additionDataArray;
        return true;
    }

    nodecg.listenFor('importAdditionFromSpreadsheet', ({url, sheetName, indexes}: {
        url: string;
        sheetName: string;
        indexes: {
            runnerId: number;
            nico: number;
            youtube: number;
            twitter: number;
        };
    }, ack: any) => {
        try {
            ack(null, importAdditionFromSpreadsheet(url, sheetName, indexes.runnerId, indexes.nico, indexes.youtube, indexes.twitter));
        } catch(err) {
            logger.error(err);
            ack(err);
        }
    });
}