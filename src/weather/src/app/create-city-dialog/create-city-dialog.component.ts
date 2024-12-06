import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCityCommand } from '../models/CreateCityCommand';

@Component({
  selector: 'app-create-city-dialog',
  imports: [FormsModule],
  templateUrl: './create-city-dialog.component.html',
  styleUrl: './create-city-dialog.component.css',
})
export class CreateCityDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() closeDialog = new EventEmitter<void>();
  @Output() createCity = new EventEmitter<CreateCityCommand>();

  command: CreateCityCommand = {
    name: '',
  };

  reset() {
    this.command = { name: '' };
  }

  closeOnBackground(event: MouseEvent) {
    this.close();
  }

  close() {
    this.closeDialog.emit();
    this.reset();
  }

  submit() {
    if (this.command.name) {
      this.createCity.emit(this.command);
      this.close();
    }
  }
}
