import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  fetchData<T>(apiCall: () => Promise<T>): Promise<{ data: T | null, error: string | null }> {
    return apiCall()
        .then(data => ({ data, error: null }))
        .catch(error => ({ data: null, error: error.message || 'An error occurred' }));
  }
}

