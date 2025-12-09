export interface CountryResponse {
  success: boolean;
  data: Record<string, string[]>;
}

export interface CountryTimezone {
  country: string;
  timezones: string[];
}
