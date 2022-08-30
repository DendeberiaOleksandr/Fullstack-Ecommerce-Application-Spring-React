export function createFilterQuery(name: string,
                                  minPrice: string,
                                  maxPrice: string,
                                  createdFrom: Date,
                                  createdTo: Date,
                                  categoryId: string) {
    let query = "";

    if (name) {
        query += "name=ilike=" + name + ";";
    }

    if (minPrice){
        query += "price>=" + minPrice + ";";
    }

    if (maxPrice){
        query += "price<=" + maxPrice + ";";
    }

    if (createdFrom){
        query += "createdAt>=" + createdFrom.toISOString().split('T')[0] + ";";
    }

    if (createdTo){
        query += "createdAt<=" + createdTo.toISOString().split('T')[0] + ";";
    }

    if (categoryId){
        query += "category.id==" + categoryId;
    }

    if (query.endsWith(';')){
        query = query.slice(0, query.length - 1)
    }

    return query
}

export function createSortQuery(attribute: string, direction: string){
    const query = `${attribute},${direction}`
    return query
}