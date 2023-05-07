import ConfigServiceInterface from './config.service.interface';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export default class ConfigService implements ConfigServiceInterface {
  private readonly config: DotenvParseOutput;
  constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('Reading of config file was failed');
    } else {
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get(key: string): string {
    return this.config[key];
  }
}
