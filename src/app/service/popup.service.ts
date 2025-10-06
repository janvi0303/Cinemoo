import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private hasTakenQuiz = false;

  constructor(private router: Router) {}

  showQuizPopup(): boolean {
    // Check if user is new (you can modify this logic based on your auth)
    const isNewUser = !localStorage.getItem('hasTakenQuiz');
    
    if (isNewUser && !this.hasTakenQuiz) {
      this.hasTakenQuiz = true;
      return true;
    }
    return false;
  }

  closePopup() {
    this.hasTakenQuiz = true;
    localStorage.setItem('hasTakenQuiz', 'true');
  }

  redirectToQuiz() {
    this.router.navigate(['/quiz']);
    this.closePopup();
  }
}