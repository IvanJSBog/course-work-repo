import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get(':id')
  async getStoreById(@Param('id') id: string, @Req() req: any){
    return this.storeService.getById(id, req.user.id);
  }
}
