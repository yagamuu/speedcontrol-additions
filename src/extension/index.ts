import { NodeCG } from './nodecg';
import { speedcontrolUserAddition } from './speedcontrolUserAddition';
import { spreadsheet } from './spreadsheet';
import { speedcontrol } from './speedcontrol';

export = (nodecg: NodeCG): void => {
    speedcontrolUserAddition(nodecg);
    spreadsheet(nodecg);
    speedcontrol(nodecg);
}