import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps: true})
export class Contact {

    @Prop({required: true})
    name: string;
    
    @Prop()
    title: string;

    @Prop({required: true})
    email: string

    @Prop()
    phone: string

    @Prop()
    address: string;

    @Prop()
    city: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact)