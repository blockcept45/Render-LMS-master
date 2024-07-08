import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getUserCourses(userId: string): Promise<import("./schemas/course.schema").Course[]>;
    createCourse(createCourseDto: CreateCourseDto): Promise<import("./schemas/course.schema").Course>;
}
