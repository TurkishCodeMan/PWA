import { fetcher } from "../api/client";

export async function addressToCoordinates(address: string) {
  const data = await fetcher({
    url: `https://api.dataforsyningen.dk/adresser?q=${address}`,
  });

  return { lon: data[1].adgangsadresse.vejpunkt.koordinater[0], lat: data[1].adgangsadresse.vejpunkt.koordinater[1] };
}
