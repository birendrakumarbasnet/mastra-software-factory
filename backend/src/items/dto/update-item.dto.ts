import { IsString, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
