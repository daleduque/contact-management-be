import { IsOptional, IsString, IsNumber, IsIn, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchContactsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsIn(['name', 'city', 'email', 'createdAt'])
  sortBy: string = 'name';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsDateString()
  createdAfter?: string;
}