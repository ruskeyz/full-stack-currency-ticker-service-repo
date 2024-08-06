import { ExchangeRatesHandlers } from "../../../src/handlers/exchangeRatesHandlers";
import { mock } from "jest-mock-extended";
import { ExchangeRatesManager } from "../../../src/managers/exchangeRatesManager";
import { Logger } from "../../../src/utils/logger";
import { createRequest, createResponse } from "node-mocks-http";

describe("ExchangeRatesHandlers", () => {
  const loggerMock = mock<Logger>();
  const managerMock = mock<ExchangeRatesManager>();
  let request = createRequest();
  let response = createResponse();

  beforeEach(() => {
    jest.resetAllMocks();
    request = createRequest();
    response = createResponse();
  });

  it("should should log error and return 500 on error", async () => {
    managerMock.getDates.mockImplementation(() => {
      throw new Error();
    });

    const handlers = new ExchangeRatesHandlers(managerMock, loggerMock);
    await handlers.getExchangeDates(request, response);
    expect(loggerMock.logError).toBeCalledTimes(1);
    expect(response.statusCode).toBe(500);
  });

  it("should return 404 if no dates available", async () => {
    managerMock.getDates.mockResolvedValueOnce([]);

    const handlers = new ExchangeRatesHandlers(managerMock, loggerMock);
    await handlers.getExchangeDates(request, response);
    expect(response.statusCode).toBe(404);
  });

  it("should return 200 if dates are available", async () => {
    managerMock.getDates.mockResolvedValueOnce(["01-01-2017", "02-01-2017"]);

    const handlers = new ExchangeRatesHandlers(managerMock, loggerMock);
    await handlers.getExchangeDates(request, response);
    expect(response.statusCode).toBe(200);
  });
});
