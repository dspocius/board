import { ApiProperty } from '@nestjs/swagger';

export class CreateEntryDto {
  @ApiProperty()
	name: string
	
@ApiProperty() 
email: string;
  @ApiProperty() 
  is_project: number; 
  @ApiProperty() 
  description: string; 
  @ApiProperty() 
  board_id: number
  @ApiProperty() 
  position: number
}
