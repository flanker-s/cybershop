import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICategory {
    parentId: number,
    path: string,
    name: string,
    icon: string,
    categoryBanners: Types.DocumentArray<ICategoryBanner>,
    features: Types.DocumentArray<ICategoryFeature>
}

export interface ICategoryBanner extends Document {
    name: string,
    img: string,
    url: string
}

export interface ICategoryFeature extends Document {
    name: string,
    attributes: Types.DocumentArray<ICategoryAttribute>
}

export interface ICategoryAttribute extends Document {
    name: string,
    type: string,
    valueListId: Types.ObjectId | null
}

export interface ICategoryModel extends ICategory, Document { }

const CategorySchema: Schema = new Schema(
    {
        parentId: { type: Types.ObjectId, ref: "Category" },
        path: { type: String },
        name: { type: String, required: true },
        icon: { type: String },
        categoryBanners: [{
            name: { type: String, required: true },
            img: { type: String, required: true },
            url: { type: String }
        }],
        features: [{
            name: { type: String, unique: true, required: true },
            attributes: [{
                name: { type: String, required: true },
                type: { type: String, required: true },
                valueListId: { type: Types.ObjectId, ref: "ValueList" }
            }]
        }]
    },
    {
        collection: "categories", versionKey: false, timestamps: true
    });

CategorySchema.pre('save', function (next) {
    if (this.parentId) {
        Category.findById(this.parentId, (err: Error, parent: ICategoryModel) => {
            if (err) {
                return next(err);
            }
            this.path = `${parent.path}.${this._id}`;
            next();
        });
    } else {
        this.path = `${this._id}`;
        next();
    }
});

const Category = mongoose.model<ICategoryModel>('Category', CategorySchema);
export default Category;