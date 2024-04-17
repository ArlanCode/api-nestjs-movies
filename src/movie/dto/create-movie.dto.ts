import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  year: number;

  @IsString()
  genre: string;

  @IsNumber()
  duration: number;
}
