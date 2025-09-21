"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({ totalPages, basePath = '', query = {} }) {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    if (totalPages <= 1) return null;

    // Helper to build query string
    const buildQuery = (page) => {
        const params = new URLSearchParams({ ...query, page });
        return `${basePath}?${params.toString()}`;
    };

    const delta = 2;
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="post-pagination mt-50">
            <ul className="pagination-list">
                {start > 1 && (
                    <li>
                        <Link href={buildQuery(1)}>1</Link>
                        {start > 2 && <span>...</span>}
                    </li>
                )}
                {pages.map((page) => (
                    <li key={page} className={page === currentPage ? "active" : ""}>
                        <Link href={buildQuery(page)}>{page}</Link>
                    </li>
                ))}
                {end < totalPages && (
                    <li>
                        {end < totalPages - 1 && <span>...</span>}
                        <Link href={buildQuery(totalPages)}>{totalPages}</Link>
                    </li>
                )}
            </ul>
            {currentPage < totalPages && (
                <div className="pagination-right">
                    <Link href={buildQuery(currentPage + 1)}>
                        <i className="las la-angle-right" />
                    </Link>
                </div>
            )}
        </div>
    );
}
