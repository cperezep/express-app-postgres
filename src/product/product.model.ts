import { randomUUID } from 'node:crypto';
import { type Model, model, Schema } from 'mongoose';

import type { ProductEntity } from '../entities/product.entity';

export interface IProductDocument extends Omit<ProductEntity, 'id'>, Document {
  _id: string;
}

const productSchema = new Schema<IProductDocument>(
  {
    _id: {
      type: Schema.Types.String,
      default: () => randomUUID(),
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
  },
  {
    collection: 'products',
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
    },
  },
);

export const Product: Model<IProductDocument> = model<IProductDocument>('Product', productSchema);
