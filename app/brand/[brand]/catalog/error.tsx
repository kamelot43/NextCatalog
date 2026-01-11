'use client';

export default function CatalogError({
 error,
 reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <section style={{ padding: 24 }}>
            <h1 style={{ marginTop: 0 }}>Catalog error</h1>
            <p style={{ opacity: 0.8 }}>{error.message}</p>
            <button type="button" onClick={reset}>
                Retry
            </button>
        </section>
    );
}
