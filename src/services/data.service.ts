import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Data } from 'src/app/interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Observable<Data[]> {
    const data: Data[] = [
      { Date: "2022-01-01", firstName: "John", lastName: "Doe" },
      { Date: "2022-02-15", firstName: "Jane", lastName: "Smith" },
      { Date: "2023-03-20", firstName: "Alice", lastName: "Johnson" },
      { Date: "2022-06-10", firstName: "Bob", lastName: "Brown" },
      { Date: "2024-07-25", firstName: "Charlie", lastName: "Davis" },
      { Date: "2024-08-05", firstName: "Emily", lastName: "Wilson" },
      { Date: "2021-09-12", firstName: "Alex", lastName: "Johnson" }
    ];

    return of(data);
  }
}
