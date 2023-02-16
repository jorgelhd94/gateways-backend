import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/schemas/user.schema';

@ApiTags('Gateways')
@ApiBearerAuth()
@Auth()
@Controller('gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @ApiResponse({
    status: 201,
    description: 'The gateway has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Serial number is already register.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Post()
  create(@Body() createGatewayDto: CreateGatewayDto, @GetUser() user: User) {
    return this.gatewaysService.create(createGatewayDto, user);
  }

  @ApiResponse({
    status: 201,
    description: 'Find all gateways by user.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Get()
  findAll(@GetUser() user: User) {
    return this.gatewaysService.findAll(user);
  }

  @ApiResponse({
    status: 201,
    description: 'Find one gateway by user.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.gatewaysService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'The gateway has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Serial number is already register.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateGatewayDto: UpdateGatewayDto,
  ) {
    return this.gatewaysService.update(id, updateGatewayDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete one gateway and their devices.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.gatewaysService.remove(id);
  }
}
