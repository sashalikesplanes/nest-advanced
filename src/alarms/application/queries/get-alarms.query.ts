import { Query } from '@nestjs-architects/typed-cqrs';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

export class GetAlarmsQuery extends Query<AlarmReadModel[]> {}
