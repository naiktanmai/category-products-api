# category-products-api

docker build . -t category-products-api

docker run -v /home/tanmai/Documents/category-products-api/logs:/usr/src/logs -v /usr/src/app/node_modules -v /home/tanmai/Documents/category-products-api/:/usr/src/app -p 8500:8500 category-products-api
