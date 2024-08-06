import moment from "moment";
import {
  CurrencyRate,
  ExchangeRateData,
  ExchangeRateMap,
  NewExchangeRateData,
} from "../models/exchangeRatesModel";
import { ExchangeRateRepo } from "../repositories/exchangeRateRepo";

export class ExchangeRateService {
  dataset: ExchangeRateMap;
  transformedData: NewExchangeRateData[];

  constructor(repo: ExchangeRateRepo) {
    this.dataset = repo.dataset;
    this.getExchangeData = this.getExchangeData.bind(this);
    this.transformedData = this.transformExRateData(this.dataset);
  }

  async getAllDates(): Promise<string[]> {
    let dates: string[] = [];
    for (let i = 0; i < this.transformedData.length; i++) {
      dates.push(this.transformedData[i].date);
    }
    return dates;
  }

  async getExchangeData(date: string): Promise<NewExchangeRateData> {
    const data = this.transformedData;
    const exchangeRateByDate = data.find((item) => item.date === date);
    if (!exchangeRateByDate) {
      throw new Error("Incorrect date selected");
    }
    return exchangeRateByDate;
  }

  transformExRateData(data: ExchangeRateMap): NewExchangeRateData[] {
    // Make an arr of dates to loop
    const currencies = Object.keys(data);
    if (currencies.length === 0) {
      // Handle the case where there is no data in the ExchangeRateMap
      return [];
    }

    let transformed: NewExchangeRateData[] = [];
    for (let i = 0; i < currencies.length; i++) {
      const currentCurrency = currencies[i];
      const currentData = data[currentCurrency];
      let previousData: ExchangeRateData;
      // We cannot get % ch for the first day, 0
      if (i === 0) {
        previousData = currentData;
      } else {
        previousData = data[currencies[i - 1]];
      }

      // calculatePercentChange and then push to DS
      const percentChangeRates = this.calculatePercentageChange(
        previousData.rates,
        currentData.rates,
      );
      //format dates
      const formatDates = moment(currencies[i], "YYYY-MM-DD").format(
        "DD-MM-YYYY",
      );
      transformed.push({
        date: formatDates,
        timestamp: currentData.timestamp,
        base: currentData.base,
        rates: percentChangeRates,
      });
    }
    return transformed;
  }

  calculatePercentageChange(
    previousRates: Record<string, number>,
    currentRates: Record<string, number>,
  ): CurrencyRate[] {
    const result: CurrencyRate[] = [];

    for (const currency in currentRates) {
      if (previousRates[currency] !== undefined) {
        const currentPrice = currentRates[currency];
        const previousPrice = previousRates[currency];
        const percentChange = Number(
          (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(1),
        );

        result.push({
          name: currency,
          price: currentPrice,
          percentChange,
        });
      }
    }

    return result;
  }
}
