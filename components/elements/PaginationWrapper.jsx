"use client";

import { Suspense } from 'react';
import PaginationClient from './PaginationClient';

// Loading component for pagination
function PaginationLoading() {
  return (
    <div className="pagination-wrapper">
      <div className="pagination-loading">Loading pagination...</div>
    </div>
  );
}

export default function Pagination(props) {
  return (
    <Suspense fallback={<PaginationLoading />}>
      <PaginationClient {...props} />
    </Suspense>
  );
}