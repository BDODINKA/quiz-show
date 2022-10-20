import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    title?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({red, className, title, ...restProps}) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`

    return (
        <button className={finalClassName} {...restProps}>
            {title}
        </button>
    )
}

export default SuperButton
