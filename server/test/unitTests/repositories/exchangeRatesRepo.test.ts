import {
  ExchangeRateMap,
  NewExchangeRateData,
} from "../../../src/models/exchangeRatesModel";
import { ExchangeRatesRepo } from "../../../src/repositories/exchangeRatesRepo";

describe("ExchangeRateRepo", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockFile = "./currencies.json";

  it("check Calculate % Change", async () => {
    const repo = new ExchangeRatesRepo(mockFile);

    const prev = { Abc: 100 };
    const curr = { Abc: 110 };

    const res = repo.calculatePercentageChange(prev, curr);
    expect(res.length).toEqual(1);
    expect(res[0].percentChange - 10.0).toBeLessThan(1e-10);
  });

  it("take real mock data and tranform it", async () => {
    const mockData: ExchangeRateMap = {
      "2017-01-01": {
        timestamp: 1483315195,
        base: "USD",
        rates: {
          AED: 3.672896,
          AFN: 66.9585,
          ALL: 128.298385,
        },
      },
      "2017-01-02": {
        timestamp: 1483315195,
        base: "USD",
        rates: {
          AED: 3.672896,
          AFN: 66.9585,
          ALL: 128.298385,
        },
      },
    };

    const repo = new ExchangeRatesRepo(mockFile);
    const res: NewExchangeRateData[] = repo.transformExRateData(mockData);
    res.forEach((item) => {
      item.rates.forEach((rate) => {
        expect(rate.name).toBeDefined();
        expect(rate.price).toBeDefined();
        expect(rate.percentChange).toBeDefined();
      });
    });
  });
});
