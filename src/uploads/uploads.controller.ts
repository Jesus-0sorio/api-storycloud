import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('uploads')
@Public()
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  @Get(':path')
  findOne(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: `storage` });
  }
}
