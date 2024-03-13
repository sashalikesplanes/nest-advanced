import { AlarmSeverity } from "./value-object/alarm-severity";

export class Alarm {
  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
  ) {}
}
