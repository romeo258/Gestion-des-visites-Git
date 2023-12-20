import { Visitor } from './visitor';


export interface Visit {
    visitCode: number;
    purpose: string;
    date: Date;
    departureDate: Date;
    visitor: Visitor;
  }