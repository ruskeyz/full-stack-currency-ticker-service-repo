import { ExchangeRateService } from "../services/exchangeRateService";
import { Logger } from "../utils/logger";
import { Request, Response } from "express";

export class ExchangeRateHandler {
  service: ExchangeRateService;
  logger: Logger;

  constructor(service: ExchangeRateService, logger: Logger) {
    this.service = service;
    this.logger = logger;

    this.getExchangeDates = this.getExchangeDates.bind(this);
    this.getExchangeData = this.getExchangeData.bind(this);
  }

  async getExchangeDates(req: Request, res: Response): Promise<void> {
    try {
      const dates = await this.service.getAllDates();
      if (dates.length === 0) {
        res.status(404).json({ error: "Exchange data not found." });
        return;
      }
      res.status(200).json(dates);
    } catch (error) {
      this.logger.logError(`Error occurred: ${JSON.stringify(error)}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getExchangeData(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.params;
      const exchangeRateByDate = await this.service.getExchangeData(date);

      res.status(200).json(exchangeRateByDate);
    } catch (error) {
      this.logger.logError(`Error occurred: ${error}`);
      res.status(400).json({ error: "Data not found for the specified date" });
    }
  }
}
