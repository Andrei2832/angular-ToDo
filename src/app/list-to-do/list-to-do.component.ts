import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {

  isCheck = false;

  @Input() task!: Task;
  @Input() index!: number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

  }

  onDelete(task: Task): void{
    this.taskService.onDelete(task);
  }
}
