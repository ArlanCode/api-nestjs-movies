import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Controller("api/movies")
export class MovieController{
    constructor(private readonly movieService: MovieService){}

    @Post()
    async create(@Body() data: CreateMovieDto){
        await this.movieService.create(data);
    }

    @Get()
    async findAll(){
        return await this.movieService.findAll();
    }

    @Get("title/:title") 
    async findAllByTitle(@Param('title') title: string){
        return await this.movieService.findAllByTitle(title);
    }

    @Get(':id')
    async findById(@Param('id') id: string){
        return await this.movieService.findById(id);
    }

    @Put(":id")
    async update(@Param('id') id: string, @Body() data: UpdateMovieDto){
        await this.movieService.update(id, data);
    }

    @Delete(":id")
    async delete(@Param('id') id: string){
        await this.movieService.delete(id);
    }
}