import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
            // Useful for wrapping the whole react tree
            enhanceApp: (App) => App,
            // Useful for wrapping in a per-page basis
            enhanceComponent: (Component) => Component,
            })

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="robots" content="index, follow" />
                    <meta name="description" content="Create beautiful and customizable DeSo Posts images for Instagram Post, Story, Tweet and more." />
                    <meta name="title" content="Shot WithDeso" />
                    <link rel="icon" href="/favicon.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://shot.withdeso.com" />
                    <meta property="og:title" content="Convert DeSo Posts to Image, Tweet, Instagram Post, Story and more | Shot WithDeso" />
                    <meta property="og:description" content="Create beautiful and customizable DeSo Posts images for Instagram Post, Story, Tweet and more."/>
                    <meta property="og:image" content="https://shot.withdeso.com/og-image.png"/>
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://shot.withdeso.com" />
                    <meta property="twitter:title" content="Convert DeSo Posts to Image, Tweet, Instagram Post, Story and more | Shot WithDeso" />
                    <meta property="twitter:description" content="Create beautiful and customizable DeSo Posts images for Instagram Post, Story, Tweet and more."/>
                    <meta property="twitter:image" content="https://shot.withdeso.com/og-image.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@jsonpreet" />
                    <meta name="twitter:creator" content="@jsonpreet" />
                    <meta property="og:image:alt" content="Convert DeSo Posts to Image, Tweet, Instagram Post, Story and more | Shot WithDeso" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="675" />
                    <meta property="og:site_name" content="Shot WithDeso" />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="en_US" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" /> 
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument;