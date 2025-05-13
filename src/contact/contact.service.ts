import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './schemas/Contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { UpdateContactDto } from './DTOs/update-contact.dto';
import { SearchContactsDto } from './DTOs/search-contact.dto';

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

        if(!contact) {
            throw new NotFoundException('User not found')
        }
        return contact
    }

    /*  Create Contact  */
    createContact(contactInformation: CreateContactDto) {
        const newContact = new this.contactModel(contactInformation)
        return newContact.save()
    }

    /* Update Specific Contact */
    async updateContact(id: string, contactInformation: UpdateContactDto) {
        const updateContact = await this.contactModel.findByIdAndUpdate(id, contactInformation, {new: true})

        if(!updateContact) {
            throw new HttpException('User not found', 404)
        }
        return updateContact
    }

    /* Deletion of Contact */
    deleteContact(id: string) {
        const deleteContact = this.contactModel.findByIdAndDelete(id)
        return deleteContact
    }

    /* Search Contact*/
    async searchContacts(query: SearchContactsDto) {
        const {
            name,
            city,
            email,
            sortBy,
            sortOrder = 'asc',
            page = 1,
            limit = 10,
            createdAfter,
        } = query;

        const filter: any = {};
        const or: any[] = [];

        if (name) or.push({ name: { $regex: name, $options: 'i' } });
        if (email) or.push({ email: { $regex: email, $options: 'i' } });
        if (city) or.push({ city: { $regex: `^${city}$`, $options: 'i' } });
        if (or.length) filter.$or = or;

        if (createdAfter) {
            const date = new Date(createdAfter);
            filter.createdAt = {
                $gte: new Date(date.setHours(0, 0, 0, 0)),
                $lte: new Date(date.setHours(23, 59, 59, 999)),
            };
        }

        const validSortFields = ['name', 'email', 'city', 'createdAt'];
        const sort: { [key: string]: SortOrder } = validSortFields.includes(sortBy)
            ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
            : {};

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.contactModel.find(filter).sort(sort).skip(skip).limit(limit),
            this.contactModel.countDocuments(filter),
        ]);

        return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

}
