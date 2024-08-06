import express from "express";

import { ConsoleLogger } from "./utils/logger";
import { ExchangeRateRepo } from "./repositories/exchangeRateRepo";
import { ExchangeRateService } from "./services/exchangeRateService";
import { ExchangeRateHandler } from "./handlers/exchangeRateHandler";

const apiRouter = express.Router();

const consoleLogger = new ConsoleLogger();

const exchangeRatesRepo = new ExchangeRateRepo("./currencies.json"); // <-- data
const service = new ExchangeRateService(exchangeRatesRepo); // <-- business logic
const handlers = new ExchangeRateHandler(service, consoleLogger); // <--- handles http requests

//get EX dates
apiRouter.get("/exchange-rates/dates", handlers.getExchangeDates);
//get EX data
apiRouter.get("/exchange-rates/:date", handlers.getExchangeData);

export { apiRouter };
