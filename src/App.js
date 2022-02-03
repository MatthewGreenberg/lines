import './App.css'
import Scene from './Scene'
import GlobalStyle from './styles/global'

function App() {
    return (
        <>
            <GlobalStyle styles={global} />
            <Scene />
        </>
    )
}

export default App
