import { FieldType } from '@/types/form';

export const PERSON_FORM_FIELDS = [
    { id: 'firstName', label: 'First Name', type: 'text' as FieldType, minChars: 3, maxChars: 30},
    { id: 'lastName', label: 'Last Name', type: 'text' as FieldType, minChars: 3, maxChars: 40},
    { id: 'age', label: 'Age', type: 'number' as FieldType, minValue: 0, maxValue: 130},
    { id: 'weight', label: 'Weight (kg)', type: 'number' as FieldType, minValue: 1, maxValue: 500},
    { id: 'city', label: 'City', type: 'text' as FieldType, minChars: 2, maxChars: 60},
];
