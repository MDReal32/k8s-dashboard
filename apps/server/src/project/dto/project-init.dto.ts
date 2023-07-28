import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ProjectInitDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  repositoryUrl: string;

  @IsString()
  @IsOptional()
  ciDir?: string;

  @IsBoolean()
  @IsOptional()
  ssh?: boolean;

  @IsString()
  @IsOptional()
  branch?: string;
}
