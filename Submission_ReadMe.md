## Dispensary Project

### Submission Details

For this project, I decided to focus on streamlining the process of parsing dispensary menus before visiting. The project conveniently includes a Menu attribute attached to each Document. However, wrapping a nested array of Product objects presented a challenge.
Determined to overcome this, I built a custom backend to parse the "[]" string arrays of nested Product documents. This backend provides several endpoints that easily parse the data for requested products. The endpoints for all the custom API logic can be found in the attached Postman collection.

After parsing the backend for nested menu items, I addressed the common question: what should shoppers look for when visiting a dispensary, and what aspects often confuse the average customer?

To answer this, I turned to Kaggle for datasets and discovered a cannabis dataset. Using part of a non-maintained API, I built my own custom version of the Cannabis API, featuring endpoints for Effects and Flavors. This allows customers to choose custom flavors and effects when deciding on a strain, reducing the overwhelming nature of the selection process.

Once the application's search form component is filled, it returns views of all available dispensaries and products within a view component. These components allow for browsing and viewing cannabis products and their dispensary ratings. The dispensary component also enables users to call dispensaries and view contact information to ask questions or visit their sites for custom orders.
I believe this approach helps users find what they're looking for in every strain, edible, or vape product, maximizing their taste preferences and satisfying their curiosity.
This project was enjoyable to work on. Thank you for reading, and I look forward to hearing back from the team.

### Installation and Running

**Starting the Backend**

```shell
# cd into `backend` from the root of the project
cd backend
# install dependencies
npm install
# run the backend express server
npm run server
```

**Start the application**

```shell
# from the backend change to the project root
cd ..

# change directory into the tast-buds project
cd tast-buds

# install dependencies
npm install

# run the angular application from within
# taste-buds
ng serve -o
```

I use Volta locally so it is possible there might be a pinned `package.json` that wasn't replaced when adding my files to this fork.

If you have any problems feel free to reach out.

### Video Demo

Attached to this project within the root are demo videos with 480p depth and 720 quality.

Let me know if these are not working and I can send a Google Drive link.
