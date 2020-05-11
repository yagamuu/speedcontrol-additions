import { SpeedcontrolUserAddition } from "./generated/speedcontrolUserAddition";
import { SheetData } from '../types/SheetData';

export type MessageMap = {
    'updateUserAddition': {
        data: SpeedcontrolUserAddition;
    };

    'loadSheetsFromSpreadsheet': {
        data: string;
        result: SheetData[];
    };

    'importAdditionFromSpreadsheet': {
        data: {
            url: string;
            sheetName: string;
            indexes: {
                runnerId: number;
                nico: number;
                youtube: number;
                twitter: number;
            }
        },
        result: boolean;
    }

    'importCommentatorFromSpreadsheet': {
        data: {
            url: string;
            sheetName: string;
            indexes: {
                runId: number;
                name: number;
                twitch: number;
                nico: number;
                youtube: number;
                twitter: number;
            }
        },
        result: boolean;
    }
};
