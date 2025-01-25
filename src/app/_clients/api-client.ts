export async function connect(data: FormData): Promise<{ m: string }> {
    return (
        await fetch('/api/connect', {
            method: 'POST',
            body: data,
        })
    ).json();
}
