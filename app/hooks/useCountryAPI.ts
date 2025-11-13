import { useEffect, useState } from 'react';

export default function useCountryAPI(country: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [countryData, setCountryData] = useState<any>(null)

    const VERCEL_SERVER_URL = "https://countries-api-orpin-rho.vercel.app/api/countries";

    const fetchCountry = async () => {
        try {

            setLoading(true);

            const url = `${VERCEL_SERVER_URL}?country=${country}`;

            const res = await fetch(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: "GET",

                }
            );
            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const countryData = await res.json();
            setCountryData(countryData);

        } catch (e) {
            //return new Error(`Unexpected error : ${e.message}`);
            setError(e instanceof Error ? e.message : 'Unexpected error');

            setCountryData(null);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCountry();
    }, [country]);

    return { loading, error, countryData };

}