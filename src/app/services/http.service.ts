import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../task";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }

 public get(url: string): Observable<Task[]>{
    return this.httpClient.get<Task[]>(url);
  }

}


