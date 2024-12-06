import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateCityCommand } from '../models/UpdateCityCommand';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-city-dialog',
  imports: [FormsModule],
  templateUrl: './update-city-dialog.component.html',
  styleUrl: './update-city-dialog.component.css',
})
export class UpdateCityDialogComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() closeDialog = new EventEmitter<void>();
  @Output() updateCity = new EventEmitter<UpdateCityCommand>();

  command: UpdateCityCommand = {
    id: this.id,
    name: this.name,
  };

  ngOnChanges() {
    this.command = { id: this.id, name: this.name };
  }

  reset() {
    this.command = { id: this.id, name: '' };
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
      this.updateCity.emit(this.command);
      this.close();
    }
  }
}
