export const paginate = (items, pageNo, pageSize)=> {

    const data = items.slice((pageNo - 1) * pageSize, (pageNo - 1) * pageSize + pageSize); 
   // console.log(data, pageNo, (pageNo - 1) * pageSize, pageSize, (pageNo - 1) * pageSize + pageSize);
    return data;
}