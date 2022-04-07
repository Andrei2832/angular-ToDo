import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/task.service";
import {AddToDoComponent} from "../add-to-do/add-to-do.component";

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {

  isCheck = false;

  @Input() task: Task;
  @Input() index: number;

  constructor(private taskService: TaskService, private addToDo: AddToDoComponent) { }

  ngOnInit(): void {

  }

  onDelete(id: number): void{
    this.taskService.onDelete(id);
    this.addToDo.getTasks();
  }

  onCheckbox(task: Task): void{
    this.taskService.onCheckbox(task.id);
  }
}
