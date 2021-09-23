import React from 'react';
import { Helmet } from 'react-helmet';

const lang = 'en';
const title = 'My Runs';
const description = '';

function SEO() {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${title}`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    />
  );
}

export default SEO;
