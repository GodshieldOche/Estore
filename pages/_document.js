import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="../img/favicon.svg" />
                </Head>
                <body className="font-Poppins bg-[#060404] text-white space-y-20">
                    <Main />
                    <NextScript />

                    
                    {/* <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script> */}
                </body>
            </Html>
        )
    }
}

export default MyDocument