import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Output() close = new EventEmitter<void>();

  @Input() title: string = '';

  onClose() {
    this.close.emit();
  }
}
