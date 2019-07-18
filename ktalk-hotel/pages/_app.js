import React from 'react'
import App from 'next/app'
import Meta from '../component/common/Meta'
import BaseLayout from '../component/layout/BaseLayout'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps && (await Component.getInitialProps(ctx))
        return {
            pageProps
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <BaseLayout>
                <Meta />
                <Component {...pageProps} />
            </BaseLayout>
        )
    }
}
export default MyApp
