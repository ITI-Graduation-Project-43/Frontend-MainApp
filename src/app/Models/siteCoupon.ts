export interface SiteCoupon {
    id: number,
    code: string,
    discount: number,
    expiresAt: Date,
    createdAt: Date,
    isDeleted: boolean
}