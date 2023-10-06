import { fetcher } from "../api/client";

export async function addressToCoordinates(address: string) {
  const data = await fetcher({
    url: `https://api.dataforsyningen.dk/adresser?q=${address}`,
  });
  return { lat: data[0].lat, lon: data[0].lon };
}
