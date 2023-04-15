import {Industry, IndustryData} from "../../Industry.js";
import {request} from "./API.js";

export function industries(): Promise<Industry[]> {
  return request<IndustryData[]>("get", "industries")
    .then((industriesData: IndustryData[]) => {
      return industriesData.map((industryData: IndustryData) => {
        return new Industry(industryData);
      });
    });
}
