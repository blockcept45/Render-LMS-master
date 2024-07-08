import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get(':userId')
  async getUserCourses(@Param('userId') userId: string) {
    return this.courseService.findByUserId(userId);
  }

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
}
