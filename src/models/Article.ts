import mongoose, { Model } from "mongoose";

export interface ArticleInterface {
	_id: mongoose.Types.ObjectId;
	title: string;
	shortName: string;
	image: string | null;
	description: string;
	content: string;
	createdAt: Date;
}
export interface ArticleDocument extends Document, ArticleInterface { }

export interface ArticleModelInterface extends Model<ArticleDocument> { }

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		shortName: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			default: null
		},

		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const ArticleModel: ArticleModelInterface =
	mongoose.models.Article || mongoose.model("Article", articleSchema);
