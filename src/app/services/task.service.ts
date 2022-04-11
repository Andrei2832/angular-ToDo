import { Injectable } from '@angular/core';
import {Task} from "../task";
import {HttpService} from "./http.service";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = this.getTasks();

  constructor(private httpService: HttpService) { }

  getTasks(): Task[]{
    let localTasks = JSON.parse(localStorage.getItem('tasks') as string);
    return localTasks == null ? [] : localTasks.tasks;
  }

  upload(): void{
    this.httpService.get('https://jsonplaceholder.typicode.com/todos').subscribe((serv)=>{
      TaskService.setLocalStorageTasks(serv);
    });
  }

  onAdd(textTask: string):void{
    let tasks = this.getTasks();
    let newTask: Task = {
      userId: 1,
      id: tasks[tasks.length-1] == undefined ? 0 : tasks[tasks.length-1].id + 1 ,
      title: textTask,
      completed: false
    }
    tasks.push(newTask);

    TaskService.setLocalStorageTasks(tasks);
  }

  onDelete(id: number):void{
    let tasks = this.getTasks();
    tasks = tasks.filter((task)=>task.id != id);

    TaskService.setLocalStorageTasks(tasks);
  }
  onDeleteCheck():void{
    let tasks = this.getTasks();
    tasks = tasks.filter((task)=>!task.completed);

    TaskService.setLocalStorageTasks(tasks);
  }
  onCheckAll():void{
    let tasks = this.getTasks();
    for (let task of tasks){
      task.completed = true;
    }
    console.log(tasks);
    TaskService.setLocalStorageTasks(tasks);
  }

  onCheckbox(id: number):void{
    let tasks = this.getTasks();
    tasks.find((i) => i.id == id)!.completed = !tasks.find((i) => i.id == id)!.completed;

    TaskService.setLocalStorageTasks(tasks);
  }

  private static setLocalStorageTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify({tasks: tasks}));
  }

}
