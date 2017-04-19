import Input from '../../components/Input'
import axios from 'axios'

function get () {
    axios.post('/api/register', {
        username: 'Fred',
        password: 'Flintstone'
    })
        .then(e => {
            console.log(e)
        })
        .catch(e => {
            console.log(e)
        })
}

export default () => (
    <div className="main">
        <div>
            <Input/>
        </div>
        <div>
            <Input/>
        </div>
        <button onClick={get}></button>
        <style jsx>{`
        .main {
            padding: 100px;
        }
        .heading {
            font: 15px Monaco;
        }
        .username {
            color: blue;
        }
        `}</style>
    </div>
)