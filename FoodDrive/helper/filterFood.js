function filterFood(arr, filterfood){
    let arr1 = []
    arr.forEach(e => {
        arr1.push(e)
        let arr2 = []
        e.Food.forEach(e2 =>{
            if(e2.category === filterfood)
            arr2.push(e2)
        })
        if(arr2.length){
            arr1.push(arr2)
        }
    });
    return arr1
}

const arr = [{"id":2,"name":"KFC","address":"Karawang","createdAt":"2020-12-31T17:00:00.000Z","updatedAt":"2021-11-18T08:23:36.590Z","Food":[{"id":3,"name":"KANTENG","price":15000,"category":"Snack","berat":350,"StoreId":2,"createdAt":"2020-12-31T17:00:00.000Z","updatedAt":"2021-11-18T09:40:19.545Z"}]},{"id":1,"name":"McD","address":"Jakarta","createdAt":"2020-12-31T17:00:00.000Z","updatedAt":"2021-11-18T08:26:45.117Z","Food":[{"id":2,"name":"Ayam","price":13000,"category":"Chicken","berat":200,"StoreId":1,"createdAt":"2020-12-31T17:00:00.000Z","updatedAt":"2021-11-18T09:47:50.481Z"}]},{"id":5,"name":"BurgerKing","address":"jalanMelayu","createdAt":"2021-11-18T09:40:40.688Z","updatedAt":"2021-11-18T09:40:40.688Z","Food":[{"id":4,"name":"Burger","price":20000,"category":"Main Dish","berat":300,"StoreId":5,"createdAt":"2021-11-18T09:41:12.553Z","updatedAt":"2021-11-18T09:58:41.958Z"}]},{"id":4,"name":"KFCPremium","address":"JanalBatik","createdAt":"2021-11-18T09:18:28.413Z","updatedAt":"2021-11-18T09:18:28.413Z","Food":[{"id":1,"name":"Kentang","price":20000,"category":"Snack","berat":350,"StoreId":4,"createdAt":"2020-12-31T17:00:00.000Z","updatedAt":"2021-11-18T09:58:49.428Z"}]},{"id":3,"name":"Wendys","address":"JalanAbal","createdAt":"2021-11-18T09:18:11.128Z","updatedAt":"2021-11-18T09:18:11.128Z","Food":[]}]


console.log(filterFood(arr,"Snack"))