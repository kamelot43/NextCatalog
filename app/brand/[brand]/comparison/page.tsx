export default function ComparisonPage({
    params,
}: {
    params: { brand: string };
}) {
    return (
        <>
            <h1>Comparison</h1>
            <p>Brand: {params.brand}</p>
        </>
    );
}
