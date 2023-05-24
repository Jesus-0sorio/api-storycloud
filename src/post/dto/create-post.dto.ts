import { IsEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsEmpty()
  description: string;

  @IsString()
  @IsEmpty()
  fileName: string;

  @IsString()
  @IsEmpty()
  fileUrl: string;

  @IsEmpty()
  create_by: string;
}
