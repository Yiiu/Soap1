import Input from '../../components/Input'

export default () => (
    <div className="main">
        <Input/>
        <Input/>
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