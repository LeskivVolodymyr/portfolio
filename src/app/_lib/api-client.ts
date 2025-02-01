export async function connect(data: FormData): Promise<Response> {
    return fetch('/api/connect', {
        method: 'POST',
        body: data,
    });
}
