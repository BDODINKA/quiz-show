import * as Yup from 'yup'

type variantName =
  | 'email'
  | 'field'
  | 'password'
  | 'image'
  | 'profile'
  | 'question'
  | 'answer'
  | 'text'
  | 'questionImage'
  | 'answerImage'

type DataType = {
  variant: 'Field' | 'Image'
  name: variantName
  max: number
  min: number
}

export const validateSchema = (data: DataType[]) => {
  let obj = {}

  for (let i = 0; i < data.length; i++) {
    const max = data[i].max ? data[i].max : 1
    const min = data[i].min ? data[i].min : 0

    if (data[i].variant === 'Field') {
      obj = {
        [data[i].name]: Yup.string()
          .max(max, `Max length should be max ${max} Symbols`)
          .min(min, `Min length should be min ${min} Symbols`)
          .required(`${data[i].variant} Required`),
      }
    }
    if (data[i].variant === 'Image') {
      obj = {
        [data[i].name]: Yup.string().required(`${data[i].variant} Required`),
      }
    }
  }

  return Yup.object(obj)
}
