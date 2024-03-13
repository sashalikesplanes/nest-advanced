import { IInferredQueryHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmRepository } from "../ports/alarm.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IInferredQueryHandler<GetAlarmsQuery> {

  constructor(private readonly alarmRepository: AlarmRepository) { }

  async execute(query: GetAlarmsQuery) {
    return this.alarmRepository.findAll();
  }
}
