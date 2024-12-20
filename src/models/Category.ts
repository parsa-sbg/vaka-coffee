import mongoose, {Model} from "mongoose"

// types and interfaces

export interface CategoryInterface {
  _id: mongoose.Types.ObjectId
  name: string
  shortName: string
  iconUrl: string
  showInHomePage: boolean
  createdAt: Date
  updatedAt: Date
}

export interface categoryDocument extends Document, CategoryInterface {}

export interface CategoryModelInterface extends Model<categoryDocument> {}

// the schema

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
    showInHomePage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// the model

const categoryModel: CategoryModelInterface =
  mongoose.models.category || mongoose.model("category", schema)

export default categoryModel
