import { col1 } from '../theme/colors'

const baseStyle: any = {
    fontSize: '1.4rem',
    color: '#FFF',
    backgroundColor: col1,
    border: `1px solid ${col1}`,
    borderRadius: '2rem',
    padding: '1rem 5rem',
    cursor: 'pointer',
}

interface Props {
    text: string
    type?: 'button' | 'submit' | 'reset',
    style?: React.CSSProperties
    onClick?: () => void
}

function Button({ text, type, style, onClick,}: Props) {
    return <button type={type} style={{...baseStyle, ...style}} onClick={onClick}>{text}</button>
}

export default Button