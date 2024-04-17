import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Movie } from "@prisma/client";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MovieService{
    constructor(private readonly prismaService: PrismaService){}

    async create(data: CreateMovieDto): Promise<void> {
        const movieExists = await this.findByTitle(data.title);
      
        if (movieExists) {
          throw new HttpException("The movie with the title '" + data.title + "' already exists", HttpStatus.CONFLICT);
        }
      
        await this.prismaService.movie.create({data});
    }

    async findAll(): Promise<Movie[]>{
        return await this.prismaService.movie.findMany({});
    }

    async findAllByTitle(title: string): Promise<Movie[]>{
        const movie = await this.prismaService.movie.findMany({
            where:{
                title:{
                    contains: title,
                },
            },
        });

        return movie;
    }

    async findById(id: string): Promise<Movie> {
        if (!this.isValidUuidFormat(id)) {
            throw new HttpException("Invalid movie ID format", HttpStatus.BAD_REQUEST);
        }

        const movie = await this.prismaService.movie.findFirst({
            where: {
                id: id,
            },
        });

        if (movie) {
            return movie;
        } else {
            throw new HttpException(`Movie with ID '${id}' does not exist`, HttpStatus.NOT_FOUND);
        }
    }

    async findByTitle(title: string): Promise<Movie | null>{
        const movie = await this.prismaService.movie.findFirst({
            where:{
                title: title,
            },
        });
        return movie;
    }

    async update(id: string, data: UpdateMovieDto): Promise<void>{
        await this.findById(id);

        await this.prismaService.movie.update({
            where: { id }, 
            data,
            });
    }

    async delete(id: string): Promise<void>{
        const movie = await this.findById(id);

        await this.prismaService.movie.delete({
            where: movie,
        });
    }

    private isValidUuidFormat(uuid: string): boolean {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
    }
}