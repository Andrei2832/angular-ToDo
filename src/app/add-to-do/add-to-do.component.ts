import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../services/task.service";
import {Task} from "../task";
import {HttpService} from "../services/http.service";



@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {

  @ViewChild('inputTask',{static: false}) public test: ElementRef | undefined;

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private httpService: HttpService) { }

  getTasks(): void{
    this.tasks = this.taskService.getTasks();
  }

  upload(): void{
    this.taskService.upload();

    this.getTasks();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onCheckAll():void{
    this.taskService.onCheckAll();
    this.getTasks();
  }

  onDeleteCheck():void{
    this.taskService.onDeleteCheck();
    this.getTasks();
  }

  onAdd(textTask: string): void{
    if (textTask){
      this.taskService.onAdd(textTask);
      this.getTasks();
      (this.test?.nativeElement).value = '';
    }

  }
}
