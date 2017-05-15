import Link from 'next/link'
import React from 'react'
import Page from '../components/page'

export default class Index extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <Page>
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
            </Page>
        )
    }
}