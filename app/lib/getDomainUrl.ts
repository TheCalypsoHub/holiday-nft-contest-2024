// copied from (https://github.com/kentcdodds/kentcdodds.com/blob/ebb36d82009685e14da3d4b5d0ce4d577ed09c63/app/utils/misc.tsx#L229-L237)
export default function getDomainUrl(request: Request) {
    const host =
        request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
    if (!host) {
        throw new Error("Could not determine domain URL.");
    }
    const protocol = host.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
}