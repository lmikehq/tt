import apiService, { extApiService } from "@lib/extensions/hook/apiService";

export async function getIpDetails() {
  return await extApiService("https://get.geojs.io/v1/ip/geo.json");
}

export async function validatePromoCode(code: string) {
  const response = await apiService("visa/verify-promo-code", "POST", {
    code,
  });
  return response;
}
