import { IInferredQueryHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarms/domain/alarm";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IInferredQueryHandler<GetAlarmsQuery> {

  constructor(private readonly alarmRepository: FindAlarmsRepository) { }

  async execute(query: GetAlarmsQuery) {
    return this.alarmRepository.findAll();
  }
}
