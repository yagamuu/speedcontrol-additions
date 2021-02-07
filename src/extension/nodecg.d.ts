import { CreateNodecgInstance } from 'ts-nodecg/server';
import { Configschema } from '../nodecg/generated/configschema';
import { ReplicantMap } from '../nodecg/replicants';
import { SpeedcontrolReplicantMap } from '../nodecg/speedcontrol';
import { MessageMap } from '../nodecg/messages';

export type SpeedcontrolNodeCG = CreateNodecgInstance<
  'nodecg-speedcontrol',
  {},
  SpeedcontrolReplicantMap,
  {},
  true
>

export type NodeCG = CreateNodecgInstance<
  'speedcontrol-additions',
  Configschema,
  ReplicantMap,
  MessageMap
>;
