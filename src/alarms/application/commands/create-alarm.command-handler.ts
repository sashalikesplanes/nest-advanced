import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements IInferredCommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing CreateAlarmCommand: ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.create(command.name, command.severity, command.triggeredAt, command.items);
    const newAlarm = await this.alarmRepository.save(alarm);

    // Not the best way, should be from aggregate root
    this.eventBus.publish(new AlarmCreatedEvent(newAlarm));

    return newAlarm;
  }
}
