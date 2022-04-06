import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../task";


@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  getTasks(): void{
    this.tasks = this.taskService.getTasks()
  }

  ngOnInit(): void {
  }

  onAdd(){
    let textTask = (<HTMLInputElement>document.querySelector('#inputTask')).value.trim();
    if (textTask){
      this.taskService.onAdd(textTask);
      this.getTasks();
      (<HTMLInputElement>document.querySelector('#inputTask')).value = '';
    }

  }
}
