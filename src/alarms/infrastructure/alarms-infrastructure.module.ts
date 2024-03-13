import { Module } from "@nestjs/common";
import { OrmAlarmRepository } from "./persistence/orm/repositories/alarm.repository";
import { InMemoryAlarmRepository } from "./persistence/in-memory/repositories/alarm.repository";

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule = driver === 'orm' ? OrmAlarmRepository : InMemoryAlarmRepository;

    return {
      module: persistenceModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    }
  }
}
