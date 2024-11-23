const provinces = require('../data/provinces.json')


export const GET = async () => {
    return Response.json(provinces)
}