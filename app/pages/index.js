import Link from 'next/link'
export default () => (
    <div className="main">
        Hello World. 
        <Link href='/about'><a>About</a></Link>
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