import { Command } from '@nestjs-architects/typed-cqrs';
import { Alarm } from 'src/alarms/domain/alarm';

export class CreateAlarmCommand extends Command<Alarm> {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly triggeredAt: Date,
    public readonly items: { name: string; type: string }[],
  ) {
    super();
  }
}
