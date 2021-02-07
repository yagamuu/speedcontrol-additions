import { NodeCG } from './nodecg';
import { speedcontrolUserAddition } from './speedcontrolUserAddition';
import { spreadsheet } from './spreadsheet';
import { speedcontrol } from './speedcontrol';
import { commentator } from './commentator';

export = (nodecg: NodeCG): void => {
    speedcontrolUserAddition(nodecg);
    spreadsheet(nodecg);
    speedcontrol(nodecg);
    commentator(nodecg);
}
