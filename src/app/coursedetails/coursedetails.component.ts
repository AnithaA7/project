import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl ,ValidatorFn  } from '@angular/forms';
import { CoursedetailsService } from '../coursedetails.service';

function nonWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value.trim().length > 0;
    return isValid ? null : { 'whitespace': true };
  };
}

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent {

  allValues :any[] =[];
  
  courseForm: FormGroup;
  statusOptions = ['In Progress', 'Completed', 'Yet to Start'];
  htmlProgress: number = 0;
  cssProgress: number = 0;
  bootstrapProgress: number = 0;
  javascriptProgress: number = 0;
  angularProgress: number = 0;
  nodejsProgress: number = 0;
  expressjsProgress: number = 0;
  mongodbProgress: number = 0;

  constructor(private formService:CoursedetailsService) {
    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required, nonWhitespaceValidator()]),
      batchNo: new FormControl('', [Validators.required, nonWhitespaceValidator()]),
      courseName: new FormControl('', [Validators.required, nonWhitespaceValidator()]),
      stackOptions: new FormControl ('',Validators.required),
      htmlStatus: new FormControl('', Validators.required),
      htmlPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      cssStatus: new FormControl('', Validators.required),
      cssPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      bootstrapStatus: new FormControl('', Validators.required),
      bootstrapPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      javascriptStatus: new FormControl('', Validators.required),
      javascriptPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      angularStatus: new FormControl('', Validators.required),
      angularPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      nodejsStatus: new FormControl('', Validators.required),
      nodejsPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      expressjsStatus: new FormControl('', Validators.required),
      expressjsPercentage: new FormControl('', [Validators.min(0), Validators.max(100)]),
      mongodbStatus: new FormControl('', Validators.required),
      mongodbPercentage: new FormControl('', [Validators.min(0), Validators.max(100)])
    });
  }


  isInProgress(controlName: string): boolean {
    return this.courseForm.get(controlName)?.value === 'In Progress';
  }

  getPercentage(controlName: string): number {
    const value = this.courseForm.get(controlName)?.value;
    return value ? Math.min(100, Math.max(0, value)) : 0;
  }

  isValidPercentage(controlName: string): boolean {
    const value = this.courseForm.get(controlName)?.value;
    // Check if value is a valid number and is 10 or higher (at least two digits)
    return value !== null && value !== '' && !isNaN(value) && value >= 10 && value <= 100;
  }
  
  updateProgress(controlName: string) {
    const percentageControl = this.courseForm.get(controlName);
    if (percentageControl) {
      let value = percentageControl.value;
      
      // Ensure value is between 0 and 100 but allow user to finish typing
      if (value !== '' && value !== null && !isNaN(value)) {
        value = Math.max(0, Math.min(100, value));
        percentageControl.setValue(value, { emitEvent: false });
      }
    }
  }
  
  
  getProgressBarColor(controlName: string): string {
    const percentage = this.getPercentage(controlName);
    if (percentage < 30) 
      return 'yellow';
    if (percentage < 60)
       return 'orange';
    if (percentage < 90)
       return 'lightgreen';
    return 'darkgreen';
  }
  showFullStackOptions = false;

  // Function to handle change in Course selection
  onCourseChange(event: any) {
    const selectedCourse = event.target.value;
    // Show stack options only if "Full Stack Development" is selected
    this.showFullStackOptions = selectedCourse === 'Full Stack Development';

    // Optionally clear the stack selection when changing course
    if (!this.showFullStackOptions) {
      this.courseForm.get('stackOptions')?.reset();
    }
  }
  

  ngOnInit(): void {
    this.getFormData(); // Fetch data on component load
  }
  
  getFormData() {
    this.formService.getFormData().subscribe(
      (data) => {
        console.log('Data retrieved successfully', data);
        this.allValues = data; // Assign fetched data to the table
      },
      (error) => {
        console.error('Error retrieving data', error);
      }
    );
  }
  
  selectedRecordId: number | null = null;
  

  
  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;

      if (this.selectedRecordId !== null) {
        // Update existing record
        this.formService.updateForm(this.selectedRecordId, formData).subscribe(
          (response) => {
            alert("Form updated successfully");
            console.log('Form updated successfully', response);
            
            this.getFormData(); // Refresh the data
            this.resetForm();
          },
          (error) => {
            console.error('Error updating form', error);
            alert("error updating form")
          }
        );
      } else {
        // Submit new record
        this.formService.submitForm(formData).subscribe(
          (response) => {
            alert("Form submitted successfully");
            console.log('Form submitted successfully', response);
            this.getFormData(); // Refresh the data
            this.resetForm();
          },
          (error) => {
            console.error('Error submitting form', error);
          }
        );
      }
    }
  }


  selectedUser: any; 
  editUser(user: any) {
    this.selectedRecordId = user.id; // Set the ID of the record to be updated
    this.courseForm.patchValue(user); // Populate the form with the existing data
  }

  resetForm() {
    this.courseForm.reset({
      name: '',
      batchNo: '',
      courseName: '',
      stackOptions: '',
      htmlStatus: '',
      htmlPercentage: '',
      
      cssStatus: '',
      cssPercentage: '',
      bootstrapStatus: '',
      bootstrapPercentage: '',
      javascriptStatus: '',
      javascriptPercentage: '',
      angularStatus: '',
      angularPercentage: '',
      nodejsStatus: '',
      nodejsPercentage: '',
      expressjsStatus: '',
      expressjsPercentage: '',
      mongodbStatus: '',
      mongodbPercentage: ''
    });

    this.selectedRecordId = null; // Clear selected ID after operation
  }

  
 
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.formService.deleteRecord(id).subscribe(
        (response) => {
          alert('Record deleted successfully');
          console.log(response);
          // Refresh the data
          this.getFormData();
        },
        (error) => {
          console.error('Error deleting record', error);
        }
      );
    }
  }




  
}