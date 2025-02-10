import { CarrierSignupField } from '@/constants/carrier-signup';

export function validateField(
  field: CarrierSignupField,
  value: string
): string | null {
  if (field.required && !value) {
    return 'This field is required';
  }

  if (!value) return null;

  if (field.validation) {
    for (const rule of field.validation) {
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
      if (rule.minLength && value.length < rule.minLength) {
        return rule.message;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return rule.message;
      }
    }
  }

  return null;
}
