import { ActionType } from '../actionTypes';

export type Reminder = {daysBefore: number, id: string, deleted: boolean}
export type Reminders = {[id: string]: Reminder}

export const ReminderTemplate: Reminder = {daysBefore: 1, id: '', deleted: false}

export interface Adventure {
  date: string;
  title: string;
  note: string;
  adventureComplete: boolean;
  adventureDeleted: boolean;
  id: string;
  timeUntil: boolean;
  dateCreated: string;
  reminders: Reminders;
}

export const AdventureTemplate: Adventure = {
  date: String(new Date()),
  title: '',
  note: '',
  reminders: {},
  adventureComplete: false,
  adventureDeleted: false,
  id: '',
  timeUntil: true,
  dateCreated: '',
}

export type Adventures = {[id: string]: Adventure}

export type AdventuresAction = 
{ type: ActionType.CREATE_ADVENTURE, adventure: Adventure} |
{ type: ActionType.GET_ADVENTURES, adventures: Adventures} |
{ type: ActionType.DELETE_ADVENTURE, id: number }
  
  