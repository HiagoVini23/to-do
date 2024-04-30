import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthenticationService } from '../utils/authentication.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule, MatInputModule,
    MatCheckboxModule, NgIf, NgFor, MatFormFieldModule,FormsModule, ReactiveFormsModule, MatToolbarModule, NgStyle ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent implements OnInit {
  items: any[] = Array(10).fill(0);
  openInput = false;
  taskForm!: FormGroup;
  tasks: any;

  constructor(private authentication: AuthenticationService, 
    private taskService: TaskService,){

  }

  async ngOnInit() {
    this.taskForm = new FormGroup({
      description: new FormControl('', [Validators.required])
    })
    this.findAll()
  }

  async findAll(){
    this.tasks = await this.taskService.getTasks((await this.authentication.getLogUser()).id)
    console.log(this.tasks)
  }

  logout(){
    this.authentication.logout();
  }

  createTask(){

  }
}
