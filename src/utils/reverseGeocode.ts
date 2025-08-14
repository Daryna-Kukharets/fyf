export const reverseGeocode = async (
  lat: number,
  lon: number
): Promise<{ address: string; district: string } | null> => {
  try {
    const key = "pk.510b8ed1b161bc57e3cc77bce453eb3c";
    const url = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lon}&format=json&`

    const res = await fetch(url);
    if (!res.ok) {
      console.error("Nominatim fetch error", res.status);
      return null;
    }

    const data = await res.json();

    const address = data.display_name || "";

    const district =
      data.address.city_district ||
      data.address.suburb ||
      data.address.neighbourhood ||
      data.address.county ||
      "";

    return {
      address,
      district,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
};
