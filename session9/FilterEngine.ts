export class FilterEngine<T> {
  /**
   * Dynamically filters an array of objects based on a given key and value.
   */
  public filterByProperty(items: T[], property: keyof T, value: any): T[] {
    return items.filter(item => item[property] === value);
  }
}
