import validation from "./validate";

export default function validate(fieldName, value) {
  let formValue = {};
  formValue[fieldName] = value;

  let formField = {};
  formField[fieldName] = validation[field];

  const result = validatejs(formValue, formField);

  if (result) {
    return result[field][0];
  }

  return null;
}
