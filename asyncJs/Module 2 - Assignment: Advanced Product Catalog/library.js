(function(window){
    function myLibrary(){

        // execute code here
        const catalogOut = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductByPrice: searchProductByPrice,
            searchProductByType: searchProductByType,
            searchAllProducts: searchAllProducts
        }

        // function definitions
        function createRandomProduct() {
            const typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
            const price = (Math.random()*500).toFixed(2);
            const type = typeArray[Math.floor(Math.random()*4)];

            return {price: price, type: type};
        }

        function createRandomCatalog(num) {
            const catalog = [];
            for(let i = 0; i < num; i++) {
                const obj= createRandomProduct();
                catalog.push({id:i, price:obj.price, type:obj.type});
            }
            return catalog;
        }

        function searchAllProducts() {
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(catalogOut);
                }, 1000);
            });
            return promise;
        }

        function searchProductById(id) {
            const promise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    let i = 0;
                    while (i < catalogOut.length) {
                        if (catalogOut[i].id === id) {
                            resolve({id:id, price:catalogOut[i].price, type:catalogOut[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });
            return promise;
        }

        function searchProductByPrice(price, difference) {
            const promise = new Promise((resolve, reject) => {
                let i = 0;
                let priceList = [];
                if(!isFinite(price)) {
                    reject("Invalid Price: " + price);
                }else {
                    setTimeout(() => {
                        while (i < catalogOut.length) {
                            if (Math.abs(catalogOut[i].price - price) < difference) {
                                priceList.push({id:catalogOut[i].id, price:catalogOut[i].price, type:catalogOut[i].type});
                            }
                            i++;
                        }
                        resolve(priceList);
                    },1000);
                }
            });
            return promise;
        }

        function searchProductByType(type) {
            const promise = new Promise((resolve, reject) => {
                let i = 0;
                let typeList = [];
                if(!['Electronics','Book','Clothing','Food'].includes(type)) {
                    reject("Invalid Type: " + type);
                }else {
                    setTimeout(() => {
                        while (i < catalogOut.length) {
                            if (catalogOut[i].type === type) {
                                typeList.push({id:catalogOut[i].id, price:catalogOut[i].price, type:catalogOut[i].type});
                            }
                            i++;
                        }
                        resolve(typeList);
                    },1000);
                }
            });
            return promise;
        }
    }

    if (typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window);