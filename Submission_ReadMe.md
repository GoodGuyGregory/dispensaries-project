## Dispensary Project

### Submission Details

For this project I decided to focus on the one thing I spend too much time doing before I even step foot into a dispensary. That's parsing each dispensary's webpages of menus. Luckily This project has `Menu` attribute attached to each of the Documents. Or is it that easy? As you're probably well aware wrapping a nested array of Product objects isn't an easy task.

I was still determined to complete this task. I built a custom backend to parse the "[]" string arrays of nested Product documents in order to provide several endpoints that will easily parse the data for the requested products. The endpoints for all the custom API logic can be found attached to this repo from `Postman`.

After deciding to parse the backend for nested menu items. I decided to answer the age old question of what should I be looking for when I shop a dispensary, or when even worse what does the average shopper get hung up on?

I turned to Kaggle for data sets and came across a dannabis data set and used part of a non-maintained API to build my own custom version of the **Cannabis API** which features end points for **Effects** and **Flavors** that way when a customer or even myself log into an application like this I can offer them custom flavors and effects to choose from as they decide which strain to purchase, just in case they're just like me and easily overwhelmed by choices.

Once the application's search form component is filled it will return views of all the available dispensaries and products, within a view component.

the view components all for browsing and viewing cannabis products and their dispenary's ratings. Thanks to the dispensary component it is also possible to call them and look over contact information in order ask questions or visit their sites to place a custom order.

I think this approach allows users to find what they're looking for in every strain or edible or vape product to maximize their taste and curiosities.

This was a blast to work on. I thank you for reading and hope to hear back from the team.

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
