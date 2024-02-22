import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/interfaces/data.interface';
import { DataService } from 'src/services/data.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data: Data[] = [];
  groupedData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response: Data[]) => {
      this.data = response;
      this.groupData();
    });
  }

  groupData(): void {
    const groupedByYear = this.data.reduce((acc: any, curr: Data) => {
      const year = new Date(curr.Date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);
      return acc;
    }, {});

    const groupKeys = Object.keys(groupedByYear);

    if (groupKeys.length === 1) {
      // Only one common year, display all rows
      this.groupedData = groupKeys.map(year => ({
        year,
        data: groupedByYear[year]
      }));
    } else {
      // Mixed entries, group by common year and unique years
      const commonYears = groupKeys.filter(year => groupedByYear[year].length > 1);
      const uniqueYears = groupKeys.filter(year => groupedByYear[year].length === 1);

      this.groupedData = commonYears.map(year => ({
        year,
        data: groupedByYear[year]
      }));

      if (uniqueYears.length > 0) {
        this.groupedData.push({
          year: 'Unique Years',
          data: uniqueYears.flatMap(year => groupedByYear[year])
        });
      }
    }
  }
}
