import { Injectable } from "@nestjs/common";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";

@Injectable()
export class InMemoryAlarmRepository implements CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materizalizedAlarms = new Map<string, AlarmReadModel>();
  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materizalizedAlarms.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const entity = AlarmMapper.toPersistence(alarm);
    this.alarms.set(entity.id, entity);
    const newEntity = this.alarms.get(entity.id) as AlarmEntity;
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(alarm: AlarmReadModel): Promise<void> {
    if (this.materizalizedAlarms.has(alarm.id)) {
      this.materizalizedAlarms.set(alarm.id, {
        ...this.materizalizedAlarms.get(alarm.id),
        ...alarm,
      });
      return;
    }

    this.materizalizedAlarms.set(alarm.id, alarm);
  }
}
