
# TODO

## Contract

- Batch transaction to mint NFT collection
- Batchtransaction to create account and buy NFT 
  - [[CHECK]](https://github.com/near/near-sdk-js/tree/d1ca261feac5c38768ab30e0b24cf7263d80aaf2/tests/src)
  - 
## Pitch

- Prepare Canva Presentation

## CF worker 
- Save Top Buyers Sellers last 30 days KV
- Images resize and store

## Cryptoracle 

- Whales , Whales Profile, Trusted projects
- Create Wallet form 
  - Use this API to know if the user owns a Premium NFT [https://api-v2-mainnet](https://api-v2-mainnet.paras.id/owned-collections?accountId=pulsarforge.near)
  - 
- Landing Page
- Add more collections to TC ranking
- Add #ranking
- Add Featured Top Collections
  
## NFTS web 
- socials twitter 
  


### PARAS API CALL 'nft_create_series'
```
{
  "creator_id": "274accb6a4bf214a746ca0c08374c4c304410f3ea5f51e165476f67ad4f8613a",
  "token_metadata": {
    "title": "space",
    "media": "bafybeid5ol4ixeyrre2wg7jognndoibazxcmywbk25kjfl3zxx3g4tsrvm",
    "reference": "bafybeia3n7i6rn6pkogifpepmfd2jemc4i53yo766m2co3vamrsqc6kzg4",
    "copies": 1
  },
  "royalty": {
    "274accb6a4bf214a746ca0c08374c4c304410f3ea5f51e165476f67ad4f8613a": 3000
  },
  "price": "10000000000000000000000"
}
```

### nft_mint

```
{
  "token_series_id": "493826",
  "receiver_id": "601a526d5ba16564b760729233c338df4ec6f440e401a6eace9ee7649177d2f7"
}
```

### nft_approve (set NFT to sale)
```
{
  "token_id": "493825:1",
  "account_id": "marketplace.paras.near",
  "msg": "{\"price\":\"10000000000000000000000\",\"market_type\":\"sale\",\"ft_token_id\":\"near\"}"
}
```

### buy
```
{
  "token_id": "493825:1",
  "nft_contract_id": "x.paras.near",
  "ft_token_id": "near",
  "price": "10000000000000000000000"
}
```


<!-- Headings -->
<h1 className="mb-3">h1. Bootstrap heading <small className="text-muted">Semibold 2.03125rem (32.5px)</small></h1>

<h2 className="mb-3">h2. Bootstrap heading <small className="text-muted">Semibold 1.625rem (26px)</small></h2>

<h3 className="mb-3">h3. Bootstrap heading <small className="text-muted">Semibold 1.42188rem (22.8px)</small></h3>

<h4 className="mb-3">h4. Bootstrap heading <small className="text-muted">Semibold 1.21875rem (19.5px)</small></h4>

<h5 className="mb-3">h5. Bootstrap heading <small className="text-muted">Semibold 1.01563rem (16.25px)</small></h5>

<h6 className="mb-1">h6. Bootstrap heading <small className="text-muted">Semibold 0.8125rem (13px)</small></h6>