import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-faqq',
  templateUrl: './faqq.component.html',
  styleUrls: ['./faqq.component.css']
})
export class FaqqComponent {
  faqForm: FormGroup;
  submitted = false;
  questions: any[] = []; // Array to hold submitted questions
  currentScreenshot: string | ArrayBuffer | null = null;
  commentInput: string | undefined;
  constructor(private formBuilder: FormBuilder) {
    this.faqForm = this.formBuilder.group({
      type: ['', Validators.required],
      question: ['', [Validators.required, Validators.minLength(10)]],
      details: ['', [Validators.required, Validators.minLength(20)]],
      screenshot: [null]
    });
  }

  // Getter for form controls
  get f() { return this.faqForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.faqForm.invalid) {
      return;
    }

    // Collect form data
    const formData = {
      type: this.faqForm.get('type')?.value || '',
      question: this.faqForm.get('question')?.value || '',
      details: this.faqForm.get('details')?.value || '',
      screenshot: this.faqForm.get('screenshot')?.value
    };

    

    // Add the form data to the questions array
    this.questions.push(formData);

    // Reset the form
    this.faqForm.reset();
    this.submitted = false;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Create a file reader to read the file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      // Store the file data in your form control
      reader.onload = () => {
        this.faqForm.patchValue({
          screenshot: reader.result
        });
      };
    }
  }
  

  // Methods for handling comments and replies
  addComment(questionIndex: number, commentText: string) {
    if (!commentText.trim()) return; // Do nothing if the comment is empty
  
    // Get the question
    const question = this.questions[questionIndex];
  
    // Initialize comments array if it doesn't exist
    if (!question.comments) {
      question.comments = [];
    }
  
    // Add the new comment
    question.comments.push({
      text: commentText,
      replies: [] // Initialize replies as an empty array
    });
  
    // Clear the input field after adding the comment
    this.commentInput = ''; 
  }
  

  replyToComment(questionIndex: number, commentIndex: number, reply: string) {
    if (reply.trim()) return; // Do not add empty replies
    this.questions[questionIndex].comments[commentIndex].replies.push(reply);
  }
}