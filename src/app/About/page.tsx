import { Suspense } from 'react';
import AboutPage from '../client/about/page'

export default function About() {
     return(
          <Suspense fallback={<div>loading....</div>}>
          <AboutPage></AboutPage>
          </Suspense>
     )
}
