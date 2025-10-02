import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseInitService } from './database-init.service';

@Global()
@Module({
  providers: [DatabaseService, DatabaseInitService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
