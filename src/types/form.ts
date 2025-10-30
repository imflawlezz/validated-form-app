export type FieldType = 'text' | 'number';

export interface InputFieldProps {
    id?: string;
    children?: React.ReactNode;
    value: string | number;
    type?: FieldType;
    minChars?: number;
    maxChars?: number;
    minValue?: number;
    maxValue?: number;
    placeholder?: string;
    onValueChange: (value: string | number) => void;
    onValidationError?: (error: string | null) => void;
}
