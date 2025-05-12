import { Injectable } from '@nestjs/common';
import { Contact } from './schemas/Contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { UpdateContactDto } from './DTOs/update-contact.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact.name) private contactModel:Model<Contact>
    ) {}

    /* Finding all contacts */
    findAllContact() {
        const contacts = this.contactModel.find()
        return contacts
    }

    /*  Find specific contact  */
    findContact(id: string) {
        const contact = this.contactModel.findById(id)
        return contact
    }

    /*  Create Contact  */
    createContact(contactInformation: CreateContactDto) {
        const newContact = new this.contactModel(contactInformation)
        return newContact.save()
    }

    /* Update Specific Contact */
    updateContact(id: string, contactInformation: UpdateContactDto) {
        const updateContact = this.contactModel.findByIdAndUpdate(id, contactInformation, {new: true})
        return updateContact
    }

    /* Deletion of Contact */
    deleteContact(id: string) {
        const deleteContact = this.contactModel.findByIdAndDelete(id)
        return deleteContact
    }


}
