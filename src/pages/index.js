/* eslint-disable react/forbid-prop-types */
import React from 'react';
import SEO from '../components/seo';
import Table from '../components/table';
import UpdatedAt from '../components/updatedAt';

export default function MyRun() {
  return (
    <div>
      <SEO />
      <Table />
      <UpdatedAt />
    </div>
  );
}
