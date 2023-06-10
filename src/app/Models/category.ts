export interface Category {
    id: number,
    name: string,
    type: number,
    approved: boolean,
    updatedAt: Date,
    parentCategoryId: number,
    parentSubCategoryId: number,
    parentCategoryName: string,
    parentSubCategoryName: string
}