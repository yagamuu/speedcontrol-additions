
import { RunDataArray } from './external/speedcontrol/runDataArray';
import { RunDataActiveRunSurrounding } from './external/speedcontrol/runDataActiveRunSurrounding';
import { Timer } from './external/speedcontrol/timer';

type SpeedcontrolReplicantMap = {
    runDataArray: RunDataArray,
    runDataActiveRunSurrounding: RunDataActiveRunSurrounding,
    timer: Timer
};

type SpeedcontrolReplicantName = (
    'runDataArray' |
    'runDataActiveRunSurrounding' |
    'timer'
);

export {
    RunDataArray,
    RunDataActiveRunSurrounding,
    Timer,
    SpeedcontrolReplicantMap,
    SpeedcontrolReplicantName
};
