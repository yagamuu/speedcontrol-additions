import { Assets } from "./asset";
import { GoogleApiDefined } from './generated/googleApiDefined';
import { SpeedcontrolUserAdditionArray } from './generated/speedcontrolUserAdditionArray';
import { SpeedcontrolPlayerArray } from "./generated/speedcontrolPlayerArray";
import { CommentatorArray } from "./generated/commentatorArray";
import { SpeedcontrolCurrentRunIndex } from "./generated/speedcontrolCurrentRunIndex";

type ReplicantMap = {
    assets: Assets,
    commentatorArray: CommentatorArray,
    googleApiDefined: GoogleApiDefined,
    speedcontrolCurrentRunIndex: SpeedcontrolCurrentRunIndex,
    speedcontrolUserAdditionArray: SpeedcontrolUserAdditionArray,
    speedcontrolPlayerArray: SpeedcontrolPlayerArray,
};

type ReplicantName = (
    'commentatorArray' |
    'googleApiDefined' |
    'speedcontrolCurrentRunIndex' |
    'speedcontrolUserAdditionArray' |
    'speedcontrolPlayerArray'
);

export {
    Assets,
    CommentatorArray,
    GoogleApiDefined,
    SpeedcontrolCurrentRunIndex,
    SpeedcontrolUserAdditionArray,
    SpeedcontrolPlayerArray,
    ReplicantMap,
    ReplicantName
};
