import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get(':id')
  async getStoreById(@Param('id') id: string, @Req() req: any){
    return this.storeService.getById(id, req.user.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Post()
  async createStore(@Body() dto: CreateStoreDto, @Req() req: any){
    return this.storeService.createStore(req.user.id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Patch(':id')
  async updateStore(@Body() dto: UpdateStoreDto, @Req() req: any, @Param('id') storeId: string) {
    return this.storeService.updateStore(storeId, req.user.id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Delete(':id')
  async deleteStore(@Req() req: any, @Param('id') storeId: string) {
    return this.storeService.deleteStore(storeId, req.user.id);
  }
}
