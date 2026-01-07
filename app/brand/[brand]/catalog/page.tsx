export default function CatalogPage({
  params,
}: {
    params: { brand: string };
}) {
    return (
        <>
            <h1>Catalog</h1>
            <p>Brand: {params.brand}</p>
        </>
    );
}
