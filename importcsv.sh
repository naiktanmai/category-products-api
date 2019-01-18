neo4j-admin import \
    --mode=csv \
    --database=products_category.db \
    --nodes category.csv \
    --nodes products.csv \
    --relationships:HAS_PRODUCT hasproduct.csv \
    --relationships:SUBCATEGORY_OF subcategory_of.csv \
    --ignore-missing-nodes=true \
    --multiline-fields=true