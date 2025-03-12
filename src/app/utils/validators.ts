import { FormGroup } from '@angular/forms';

export const isRequiredV = (field: 'email' | 'password', form: FormGroup) => {
  const control = form.get(field);

  return control && control.touched && control.hasError('required');
};
