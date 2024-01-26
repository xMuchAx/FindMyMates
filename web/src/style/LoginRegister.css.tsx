import { col2 } from "../theme/colors"

export const style: any = {
    main: {
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',

    },
    contentDiv: {
        marginBottom: '7rem',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    logo:{
        width: '20rem',
    },
    desc:{
        color: col2,
        marginTop: '0',
    },
    formField: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '2rem',
        gap: '0.1rem',
    },
    form: {
        marginTop: '2.3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}