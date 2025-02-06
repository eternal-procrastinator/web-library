import { registerDecorator, ValidationOptions, isString, isNotEmpty, ValidationArguments } from 'class-validator';

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return function isNotEmptyStringImpl(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmptyString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isString(value) && isNotEmpty(value.trim());
        },
        defaultMessage: (validationArguments?: ValidationArguments): string => `${validationArguments?.property} should not be an empty string`,
      },
    });
  };
}
