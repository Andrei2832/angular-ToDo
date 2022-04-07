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
    //let tasks: Task[] = [];

    this.httpService.get('https://jsonplaceholder.typicode.com/todos').subscribe((serv)=>{
      this.setLocalStorageTasks(serv);
    });

    // this.httpService.get('https://jsonplaceholder.typicode.com/todos').subscribe(value => {
    //   for (let val of value){
    //     tasks.push(val);
    //     console.log(val);
    //     this.setLocalStorageTasks(tasks);
    //   }
    // });


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

    this.setLocalStorageTasks(tasks);
  }

  onDelete(id: number):void{
    let tasks = this.getTasks();
    tasks = tasks.filter((task)=>task.id != id);

    this.setLocalStorageTasks(tasks);
  }
  onDeleteCheck():void{
    let tasks = this.getTasks();
    tasks = tasks.filter((task)=>!task.completed);

    this.setLocalStorageTasks(tasks);

  }
  onCheckAll():void{
    let tasks = this.getTasks();
    for (let task of tasks){
      task.completed = true;
    }
    console.log(tasks);
    this.setLocalStorageTasks(tasks);
  }

  onCheckbox(id: number):void{
    let tasks = this.getTasks();
    tasks.find((i) => i.id == id)!.completed = !tasks.find((i) => i.id == id)!.completed;

    this.setLocalStorageTasks(tasks);
  }

  private setLocalStorageTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify({tasks: tasks}));
  }

}
