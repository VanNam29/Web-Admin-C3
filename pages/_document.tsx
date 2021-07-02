import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document";

export default class extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
      }
    render () {
      return (
        <Html>
          <Head />
          <body>
            <Main />
            {/* here we will mount our modal portal */}
            <div id="portal" ></div>
            <div id="portaldelete"></div>
            <NextScript />
          </body>
        </Html>
      )
    }
  }