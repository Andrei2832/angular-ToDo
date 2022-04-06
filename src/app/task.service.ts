import { Injectable } from '@angular/core';
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  constructor() { }

  getTasks(): Task[]{
    return this.tasks;
  }

  onAdd(textTask: string){
    let newTask: Task = {
      title: textTask,
      done: false
    }
    this.tasks.push(newTask);
  }

  onDelete(task: Task){
    let del = this.tasks.indexOf(task);
    this.tasks.splice(del,1);
  }
}
