import { Component, OnInit } from '@angular/core';
import { DataaService } from '../dataa.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  id: any;
  data: any;
  newTask: string = '';
  description: string = '';
  public items: { id: any, task: string, description: string, isEditing: boolean }[] = [];
  constructor(private dataaService: DataaService) {}

  
  getTask() {
    this.dataaService.getData().subscribe((res: any) => {
      this.items = res.map((item: any) => ({
        id: item.id,
        task: item.task,
        description: item.description, 
        isEditing: false
      }));
    });
  }

  
  insertData() {
    if (this.newTask.trim() !== '' && this.description.trim() !== '') {  
      const newTodo = { task: this.newTask, description: this.description, status: 'Active' };
      this.dataaService.insertData(newTodo).subscribe(() => {
        this.getTask();  
        this.newTask = '';
        this.description = ''; 
      });
    }
  }

  ngOnInit() {
    this.getTask();
  }
 
 
  deleteData(id: any) {
    this.dataaService.deleteData(id).subscribe(() => {
      this.getTask()
    });
  }
 
 
  public editTask(index: number) {
    this.items[index].isEditing = !this.items[index].isEditing;
  }
 
  public saveEdit(index: number) {
    const updatedTask = this.items[index].task;
    const updatedDescription = this.items[index].description;
    const id = this.items[index].id;
    if (id) {
      const updatedData = { task: updatedTask, description: updatedDescription };
      this.dataaService.updateTask(id, updatedData).subscribe(() => {
        this.getTask();  
      });
    }
  }

 
  private updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.items));
  }
}
