HOW TO:
- add item to user using ur cli:
  - make sure the ur cli is installed
  - make sure required environment variables is set, or the run the command in directory that have `.env` file, this file will be automatically loaded
  - run ur command:
  ```sh
  ur inventory update --config=<path_to_csv>
  ```
  - path_to_csv: path to the csv config file
  - csv file requirements:
    -  include 4 fields: `address`, `addressType`, `itemType`, `amount`
      - address: email address or wallet address of user
      - addressType: should be `email` or `wallet`
      - itemType: item type
      - amount: positive amount of item
