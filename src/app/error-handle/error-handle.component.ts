import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.scss']
})
export class ErrorHandleComponent implements OnInit {
  @Input() errorMessage: string;
  @Output() dismissError: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }


  removeError() {
    this.dismissError.emit()

  }

  ngOnInit(): void {

  }



}
