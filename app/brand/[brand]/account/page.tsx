export default function AccountPage({
    params,
}: {
    params: { brand: string };
}) {
    return (
        <>
            <h1>Account</h1>
            <p>Brand: {params.brand}</p>
        </>
    );
}
