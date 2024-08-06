import { readFileSync } from "fs";
import { ExchangeRateMap } from "../models/exchangeRatesModel";

export class ExchangeRateRepo {
  jsonFilename: string;
  dataset: ExchangeRateMap;

  constructor(filename: string) {
    this.jsonFilename = filename;
    this.dataset = JSON.parse(readFileSync(this.jsonFilename, "utf-8"));
  }
}
