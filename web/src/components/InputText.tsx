import { col2 } from '../theme/colors'

const baseStyle: React.CSSProperties = {
    padding: '0.2rem 0rem',
    height: '1.5rem',
    width: '15rem',
    border: 'none',
    borderBottom: `0.12rem solid ${col2}`,
}

interface Props {
    value?: string
    style?: React.CSSProperties
    password?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: React.FC<Props> = ({style, password, onChange }) => {
    return <input type={password ? 'password' : 'text'} style={{...baseStyle, ...style}} onChange={onChange} />
}

export default InputText