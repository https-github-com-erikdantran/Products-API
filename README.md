# Project Catwalk Products API

A RESTful API for Project Catwalk, a shopping application.

## Installation

Install the API dependencies with npm

```bash
  cd api
  npm install
```

To start

```bash
  npm start
```

Study IO requires MySQL. To locally load mock data:

- Change the filepaths in schema.sql to where your locally stored .csv files are
- In your terminal, run mysql -u root < schema.sql


## API Reference

### TOPICS
#### Get first five products

```http
  GET /products
```

Response:
```javascript
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    ...
]
```
#### Get a specific product's details

```http
  GET /products/:product_id
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `product_id`| `integer` | **Required**. Id of a product to get details for |

Response:
```bash
{
    "id": "1",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": 140,
    "features": [
        {
            "feature": "Fabric",
            "value": "Canvas"
        },
        {
            "feature": "Buttons",
            "value": "Brass"
        }
    ]
}
```

#### Get a specific product's styles

```http
  GET /products/:product_id/styles
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `product_id`| `integer` | **Required**. Id of a product to get details for |

Response:
```bash
{
    "product_id": "1",
    "results": [
        {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": 0,
            "default": 1,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                },
                {
                    "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                    "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
                }
            ],
            ...
}
```

#### Get a list of product ids related to a specific product

```http
  GET /products/:product_id/related
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `product_id`| `integer` | **Required**. Id of a product to get details for |

Response:
```bash
[
    2,
    3,
    8,
    7
]
```
