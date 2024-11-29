import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  id: any;
  data: any;
  newTask: string = '';
  description: string = '';
  public items: { id: any, task: string, description: string, isEditing: boolean }[] = [];
  constructor(private dataService: DataService) {}

  
  getTask() {
    this.dataService.getData().subscribe((res: any) => {
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
      this.dataService.insertData(newTodo).subscribe(() => {
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
    this.dataService.deleteData(id).subscribe(() => {
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
      this.dataService.updateTask(id, updatedData).subscribe(() => {
        this.getTask();  
      });
    }
  }

 
  private updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.items));
  }
}

