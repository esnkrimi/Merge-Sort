import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  toShow: any;

  calculate() {
    this.setup();
  }

  setup() {
    let i = 0;
    const array = ['F', 'D', 'J', 'B', 'E','F', 'Z', 'X', 'T','F'];

    this.toShow = this.mergeSort<string>(array,'ASC', (a: string, b: string) => a.localeCompare(b));
  }

  mergeSort<T>(arr: T[], order = 'ASC',
    compareWith?: (a: T, b: T) => number): T[] {
    compareWith = compareWith ? compareWith : (e1: any, e2: any) => e1 - e2;
    return this.splitAndMerge(arr, 0, arr.length - 1, order, compareWith);
  }

  splitAndMerge<T>(arr: T[], minIndex: number, maxIndex: number,
    order = 'ASC', compareWith?: (a: T, b: T) => number): T[] {
    if (!arr || minIndex > maxIndex) {
      return [];
    }

    if (minIndex === maxIndex) {
      return [arr[minIndex]];
    }

    let mid = Math.trunc((minIndex + maxIndex) / 2);

    const left: T[] = this.splitAndMerge<T>(arr, minIndex, mid,
      order, compareWith);
    const right: T[] = this.splitAndMerge<T>(arr, mid + 1, maxIndex,
      order, compareWith);

    return this.merge<T>(left, right, order, compareWith);
  }

  // arr1 e arr2 devem estar ordenados
  // O(n)
  merge<T>(arr1: T[], arr2: T[], order = 'ASC',
    compareWith?: (a: T, b: T) => number): T[] {
    if (!arr1 && !arr2) {
      return [];
    }

    let i = 0;
    let j = 0;
    const merged: T[] = [];
    while (j < arr2.length && i < arr1.length) {
      if (order === 'ASC' ? compareWith(arr1[i], arr2[j]) < 0 : compareWith(arr1[i], arr2[j]) > 0) {
        merged.push(arr1[i++]);
      } else {
        merged.push(arr2[j++]);
      }
    }

    for (; i < arr1.length; i++) {
      merged.push(arr1[i]);
    }

    for (; j < arr2.length; j++) {
      merged.push(arr2[j]);
    }

    return merged;
  }
}

