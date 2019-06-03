import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {isEmpty} from "@nestjs/common/utils/shared.utils";



@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }
}
