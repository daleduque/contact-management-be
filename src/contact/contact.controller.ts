import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { UpdateContactDto } from './DTOs/update-contact.dto';
import { SearchContactsDto } from './DTOs/search-contact.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) {}

    /* Find all Contact */
    @Get()
    findAllContact() {
        return this.contactService.findAllContact()
    }

    @Get('search')
    async searchContacts(@Query() query: SearchContactsDto) {
      return this.contactService.searchContacts(query);
    }

    /* Find specific contact */
    @Get(":id")
    findContact(@Param('id') id: string) {
        return this.contactService.findContact(id)
    }

    /* Create contact */
    @Post()
    createContact(@Body() body: CreateContactDto) {
        return this.contactService.createContact(body);
    }

    /* Update contact */
    @Put(":id")
    updateContact(@Param('id') id: string, @Body() body: UpdateContactDto) {
        return this.contactService.updateContact(id, body)
    }

    /* Delete Contact */
    @Delete(":id")
    deleteContact(@Param('id') id: string) {
        return this.contactService.deleteContact(id);
    }
}
