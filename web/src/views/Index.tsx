import HomeImage from '../assets/guy_with_virtual_reality_headset.svg'
import { useNavigate } from 'react-router-dom'
import { style } from '../style/Index.css'
import { theme } from '../theme/colors'
import Button from '../components/button'

const Index = () => {
    const navigate = useNavigate()

    return (
        <main style={style.main}>
            <div style={style.leftDiv} className="left">
                <div style={style.divContent} className="left-main">
                    <h1 style={style.title}>Hey, <span style={{ color: theme }}>Welcome</span> to<br/>
                    <span style={{ color: theme }}>F</span>ind<span style={{ color: theme }}>M</span>y<span style={{ color: theme }}>M</span>ates.</h1>

                    <p style={style.p}>Join ours community, find your mates,<br/>
                    join or create IRL or online events with people from around the world.</p>

                    <div>
                        <Button text="Sign In"onClick={() => navigate('/login')} style={{position: 'relative', zIndex: 2}} />
                        <Button text="Sign In"onClick={() => navigate('/register')} style={{backgroundColor: '#fff', color: theme, marginLeft: '-3rem', zIndex: 1,}} />
                    </div>
                </div>
            </div>
            <div style={style.rightDiv} className="right">
                <img src={HomeImage} alt="Home screen image" style={style.img}/>
            </div>
        </main>
    )
}

export default Index