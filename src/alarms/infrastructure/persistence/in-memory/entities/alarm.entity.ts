import { AlarmItemEntity } from "../entities/alarm-item.entity";

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: AlarmItemEntity[];
}
