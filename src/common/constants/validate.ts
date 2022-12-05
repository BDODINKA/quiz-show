import { validateSchema } from '../../utils/validationSchema'

import { maxValidate, minValidate, requiredValidate } from './card'

export const validateCardField = () =>
  validateSchema([
    { variant: 'Field', name: 'question', min: minValidate, max: maxValidate },
    { variant: 'Field', name: 'answer', min: minValidate, max: maxValidate },
  ])

export const validateCardImage = () =>
  validateSchema([
    { variant: 'Image', name: 'questionImage', required: requiredValidate },
    { variant: 'Image', name: 'answerImage', required: requiredValidate },
  ])

export const validatePack = () =>
  validateSchema([{ variant: 'Field', name: 'text', max: maxValidate, min: minValidate }])

export const validateField = () =>
  validateSchema([{ variant: 'Field', name: 'field', max: 20, min: 3 }])
