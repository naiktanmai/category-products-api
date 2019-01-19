neo4j-admin import \
    --mode=csv \
    --database=products_category.db \
    --nodes category.csv \
    --nodes products.csv \
    --relationships:HAS_PRODUCT hasproduct.csv \
    --relationships:HAS_SUBCATEGORY has_subcategory.csv \
    --ignore-missing-nodes=true \
    --multiline-fields=true