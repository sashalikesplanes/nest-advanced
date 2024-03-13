import { Query } from '@nestjs-architects/typed-cqrs';
import { Alarm } from 'src/alarms/domain/alarm';

export class GetAlarmsQuery extends Query<Alarm[]> {}
