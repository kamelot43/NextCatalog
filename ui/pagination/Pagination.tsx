import Link from 'next/link';
import styles from './Pagination.module.css';

type SearchParamsRecord = Record<string, string | string[] | undefined>;
type UrlParamValue = string | string[] | undefined;

type Props = {
  pathname: string;
  searchParams: SearchParamsRecord;
  page: number;
  totalPages: number;
};

function getFirst(value: UrlParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function buildHref(pathname: string, searchParams: SearchParamsRecord, nextPage: number) {
  const params = new URLSearchParams();

  // сохраняем все текущие params
  for (const [key, value] of Object.entries(searchParams)) {
    const first = getFirst(value);
    if (first != null && first !== '') params.set(key, first);
  }

  // меняем только page
  params.set('page', String(nextPage));

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function Pagination({ pathname, searchParams, page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Link
        className={`${styles.link} ${isFirst ? styles.disabled : ''}`}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
        href={buildHref(pathname, searchParams, prevPage)}
      >
        ← Prev
      </Link>

      <span className={styles.info}>
        Page <b>{page}</b> / {totalPages}
      </span>

      <Link
        className={`${styles.link} ${isLast ? styles.disabled : ''}`}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : 0}
        href={buildHref(pathname, searchParams, nextPage)}
      >
        Next →
      </Link>
    </nav>
  );
}
