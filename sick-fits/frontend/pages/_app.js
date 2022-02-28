import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function myApp({ Component, pageProps, apollo }) {
  // console.log('apollo', apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} /> {/* Globally rendering all children Components inside Page Component via next.js (Component + pageProp) props */}
      </Page>
    </ApolloProvider>
  );
}
// getInitialProps is in Next.js.
// If any of the pages in the app have a getInitialProps function, it will be called before the page is rendered.
myApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(myApp);
