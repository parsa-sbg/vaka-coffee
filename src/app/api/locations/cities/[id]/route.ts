import { NextRequest } from "next/server";

const cities: {
    "id": 1,
    "name": "اسکو",
    "slug": "اسکو",
    "popular": false,
    "province_id": 1
}[] = require('../../data/cities.json')


export const GET = async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {

    const provinceId = (await params).id
    const targetCities = cities.filter(city => city.province_id == +provinceId)
    return Response.json(targetCities)
}