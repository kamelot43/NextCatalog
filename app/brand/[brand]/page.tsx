const brandLabels: Record<string, string> = {
    alpha: 'Alpha Motors',
    beta: 'Beta Auto',
};

export default async function BrandHomePage({
    params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;
    const title = brandLabels[brand] ?? brand;

    return (
        <section>
            <h1>Welcome</h1>
            <p>
                Current brand: <strong>{title}</strong>
            </p>
        </section>
    );
}
