import { NodeCG } from './nodecg';
import { speedcontrolUserAddition } from './speedcontrolUserAddition';
import { spreadsheet } from './spreadsheet';
import { spotify } from './spotify'
import { speedcontrol } from './speedcontrol';
import { twitter } from './twitter';

export = (nodecg: NodeCG): void => {
    speedcontrolUserAddition(nodecg);
    spreadsheet(nodecg);
    spotify(nodecg);
    speedcontrol(nodecg);
    twitter(nodecg);
}