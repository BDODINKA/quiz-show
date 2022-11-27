import * as Yup from 'yup'

export const modalCardSchema = Yup.object({
  question: Yup.string().max(20, 'Max length should be max 20 Symbols').required('Field Required'),
  answer: Yup.string().max(20, 'Max length should be max 20 Symbols').required('Field Required'),
})

export const modalCardImg = Yup.object({
  questionImage: Yup.string().required('Image Required'),
  answerImage: Yup.string().required('Image Required'),
})

export const modalPackSchema = Yup.object({
  text: Yup.string().max(20, 'Max length should be max 20 Symbols').required('Field Required'),
})

export const profileField = Yup.object({
  field: Yup.string()
    .max(20, 'Max length should be max 20 Symbols')
    .min(3, 'Max length should be min 3 Symbols')
    .required('Field Required'),
})
