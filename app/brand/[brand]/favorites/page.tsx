export default function FavoritesPage({
   params,
}: {
    params: { brand: string };
}) {
    return (
        <>
            <h1>Favorites</h1>
            <p>Brand: {params.brand}</p>
        </>
    );
}
