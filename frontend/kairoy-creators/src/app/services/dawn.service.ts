import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Web5 } from "@web5/api";
@Injectable({
  providedIn: 'root',
})
export class MyService {
  createRecord(data: any, protocol: string, schema: string, dataFormat: string): Observable<any> {

    const message = {
      protocol: protocol,
      schema: schema,
      dataFormat: dataFormat
    };

    return from(Web5.dwn.records.create({ data, message }));
  }
  // Query records
  queryRecords(protocol: string, schema: string, dataFormat: string): Observable<any> {
    const message = {
      filter: {
        protocol: protocol,
        schema: schema,
        dataFormat: dataFormat
      },
      dateSort: 'publshedAscending',
    };

    return from(Web5.dwn.records.query({ message }));
  }
  // get author records
  authorQueryRecords(protocol: string, schema: string, dataFormat: string): Observable<any> {
    from: did,
    const message = {
      filter: {
        protocol: protocol,
        schema: schema,
        dataFormat: dataFormat
      },
      dateSort: 'publshedAscending',
    };

    return from(Web5.dwn.records.query({ from: did, message }));
  }
  // query one record
  queryOneRecord(record: any): Observable<any> {

    const message = {
      filter: {
        recordId: record.id,
      }
    };

    return from(Web5.dwn.records.query({ message }));
  }
  // delete a record
  deleteRecord(record: any): Observable<any> {

    const message = {
      filter: {
        recordId: record.id,
      }
    };

    return from(Web5.dwn.records.delete({ message }));
  }
  // update a record
  UpdateRecord(data: any, protocol: string, schema: string, dataFormat: string, record): Observable<any> {

    const message = {
      protocol: protocol,
      schema: schema,
      dataFormat: dataFormat,
      filter: {
        recordId: record.id,
      }
    };

    return from(Web5.dwn.records.update({ data, message }));
  }
}
