import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";

const limiter = new RateLimiterMemory({
  keyPrefix: "ratelimit",
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError("Too many requests.", 429);
  }
}

export default rateLimiter;
