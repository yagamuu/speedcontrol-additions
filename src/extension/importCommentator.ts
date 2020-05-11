import { NodeCG } from './nodecg';
// eslint-disable-next-line @typescript-eslint/camelcase
import { sheets_v4 } from 'googleapis';
import { v4 as uuid} from 'uuid';
import { googleSpreadsheetUrlToId } from './lib/helper';
import { CommentatorArray } from '../nodecg/replicants';

// eslint-disable-next-line @typescript-eslint/camelcase
export const importCommentator = (nodecg: NodeCG, spreadsheet: sheets_v4.Sheets): void => {
    const logger = new nodecg.Logger('ome-speedrun-layout:import-commentator');
    const commentatorArrayRep = nodecg.Replicant('commentatorArray', {
        defaultValue: []
    });

    const importCommentatorFromSpreadsheet = async (
        url: string, sheetName: string, runIdIndex: number, nameIndex: number, twitchIndex: number, nicoIndex: number, youtubeIndex: number, twitterIndex: number
    ): Promise<boolean> => {
        const spreadsheetId = googleSpreadsheetUrlToId(url);
        const valueResponse = await spreadsheet.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName
        });

        if (!valueResponse.data.values) {
            return false;
        }
        const commentatorArray: CommentatorArray = valueResponse.data.values.filter((_, index) => {
            return index !== 0;
        }).map((values) => {
            const runIdValue = values[runIdIndex] as string;
            return {
                id: uuid(),
                assignedRunIdArray: runIdValue !== '' ? runIdValue.split(',').map((val) => {return val.trim()}) : [],
                name: values[nameIndex] !== '' ? values[nameIndex] : undefined,
                social: {
                    twitch: values[twitchIndex] !== '' ? values[twitchIndex] : undefined,
                    nico: values[nicoIndex] !== '' ? values[nicoIndex] : undefined,
                    youtube: values[youtubeIndex] !== '' ? values[youtubeIndex] : undefined,
                    twitter: values[twitterIndex] !== '' ? values[twitterIndex] : undefined
                }
            };
        });
        commentatorArrayRep.value = commentatorArray;
        return true;
    }

    nodecg.listenFor('importCommentatorFromSpreadsheet', ({url, sheetName, indexes}: {
        url: string;
        sheetName: string;
        indexes: {
            runId: number;
            name: number;
            twitch: number;
            nico: number;
            youtube: number;
            twitter: number;
        };
    }, ack: any) => {
        try {
            ack(null, importCommentatorFromSpreadsheet(url, sheetName, indexes.runId, indexes.name, indexes.twitch, indexes.nico, indexes.youtube, indexes.twitter));
        } catch(err) {
            logger.error(err);
            ack(err);
        }
    });
}