import { setHours, setMinutes, format, addMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // Horário Inicial -> 09:00
  const endTime = setMinutes(setHours(date, 19), 0); // Horário Final -> 21:00
  const interval = 60; // intervalo para cada servico
  const timeList: string[] = []; // array vazio para armazenas os horários gerados

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}