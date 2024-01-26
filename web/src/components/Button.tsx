import { theme } from '../theme/colors'

const baseStyle: any = {
    fontSize: '1.4rem',
    color: '#FFF',
    backgroundColor: theme,
    border: `1px solid ${theme}`,
    borderRadius: '2rem',
    padding: '1rem 5rem',
    cursor: 'pointer',
}

interface Props {
    text: string
    onClick: () => void
    style?: React.CSSProperties // add a property which is a CSS property
}

const Button: React.FC<Props> = ({ text, onClick, style }) => {
    return <button onClick={onClick} style={{...baseStyle, ...style}}>{text}</button>
}

export default Button