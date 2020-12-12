export const required: FieldValidatorType = (value) =>
    value ? undefined : 'Field is required';

export const empty: EmptyType = (str: string): boolean => /^\s+$/.test(str);

export const shouldNotBeEmpty: FieldValidatorType = (value) =>
    empty(value) && value !== ''
        ? 'Field should not be empty'
        : undefined;

//=========================== TYPES =====================================
type EmptyType = (str: string) => boolean
export type FieldValidatorType = (value: string) => string | undefined