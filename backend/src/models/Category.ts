import mongoose, { Document, Schema } from "mongoose";

export interface ICategory {
    parentId: number,
    path: string,
    name: string,
    icon: string,
    categoryBanners: [{
        name: string,
        img: string,
        url: string
    }],
    features: [{
        name: string,
        attributes: [{
            _id: Schema.Types.ObjectId,
            name: string,
            type: string,
            valueListId: Schema.Types.ObjectId | null
        }]
    }]
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
{
    parentId: { type: Schema.Types.ObjectId, ref: "Category" },
    path: { type: String },
    name: { type: String, required: true },
    icon: { type: String },
    categoryBanners: [{
        name: { type: String, required: true },
        img: { type: String, required: true },
        url: { type: String }
    }],
    features: [{
        name: { type: String, required: true },
        attributes: [{
            _id: { type: Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            type: { type: String, required: true },
            valueListId: { type: Schema.Types.ObjectId, ref: "ValueList" }
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